import * as React from "react"
import type { TableContextValue, TableState, TableActions, TableData, ColumnDef, CellData, RowData, GroupedData } from "@/types/table"

const TableContext = React.createContext<TableContextValue | null>(null)

function useTable() {
  const context = React.useContext(TableContext)
  if (!context) {
    throw new Error("useTable must be used within a TableProvider")
  }
  return context
}

interface TableProviderProps {
  data: TableData
  children: React.ReactNode
}

function TableProvider({ data, children }: TableProviderProps) {
  // 初始化列宽
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {}
    data.columns.forEach((col) => {
      widths[col.id] = col.width === "auto" ? 40 : col.width ?? 200
    })
    return widths
  })

  // 动态列数据
  const [columns, setColumns] = React.useState<ColumnDef[]>(data.columns)
  const [rows, setRows] = React.useState<RowData[]>(data.rows)
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<string>>(new Set())
  // 默认冻结 checkbox 列和第一列
  const [frozenColumns, setFrozenColumns] = React.useState<Set<string>>(() => {
    const frozen = new Set<string>()
    // checkbox 列
    const checkboxColumn = data.columns.find(col => col.type === "checkbox")
    if (checkboxColumn) frozen.add(checkboxColumn.id)
    // 第一列（非 checkbox）
    const firstNonCheckbox = data.columns.find(col => col.type !== "checkbox")
    if (firstNonCheckbox) frozen.add(firstNonCheckbox.id)
    return frozen
  })

  // 分组列
  const [groupColumnId, setGroupColumnId] = React.useState<string | null>(null)
  // 收起的分组
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set())

  // 选择状态
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())

  // 编辑状态
  const [editingCellId, setEditingCellId] = React.useState<string | null>(null)
  const [editingValue, setEditingValue] = React.useState<string>("")

  // 计算全选状态
  const selectAll = selectedRows.size === rows.length && rows.length > 0

  // 选择操作
  const toggleSelectAll = React.useCallback(() => {
    if (selectAll) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(rows.map((row) => row.id)))
    }
  }, [selectAll, rows])

  const toggleRowSelect = React.useCallback((rowId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      return next
    })
  }, [])

  const clearSelection = React.useCallback(() => {
    setSelectedRows(new Set())
  }, [])

  // 编辑操作
  const startEdit = React.useCallback((cellId: string, value: string) => {
    setEditingCellId(cellId)
    setEditingValue(value)
  }, [])

  const finishEdit = React.useCallback(() => {
    if (!editingCellId) return

    // 判断是列标题还是单元格
    const isColumnHeader = columns.some((col) => col.id === editingCellId)

    if (isColumnHeader) {
      setColumns((prev) =>
        prev.map((col) =>
          col.id === editingCellId ? { ...col, title: editingValue } : col
        )
      )
    } else {
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          cells: row.cells.map((cell) =>
            cell.id === editingCellId ? { ...cell, value: editingValue } : cell
          ),
        }))
      )
    }

    setEditingCellId(null)
    setEditingValue("")
  }, [editingCellId, editingValue, columns])

  const cancelEdit = React.useCallback(() => {
    setEditingCellId(null)
    setEditingValue("")
  }, [])

  const updateEditingValue = React.useCallback((value: string) => {
    setEditingValue(value)
  }, [])

  // 列宽操作
  const updateColumnWidth = React.useCallback((columnId: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [columnId]: width,
    }))
  }, [])

  // 生成唯一ID
  const generateId = () => `col-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

  // 列操作
  const insertColumnLeft = React.useCallback((columnId: string) => {
    const index = columns.findIndex((col) => col.id === columnId)
    if (index === -1) return

    const newColumnId = generateId()
    const newColumn: ColumnDef = {
      id: newColumnId,
      type: "text",
      title: "新列",
      width: 80,
    }

    setColumns((prev) => {
      const newColumns = [...prev]
      newColumns.splice(index, 0, newColumn)
      return newColumns
    })

    setColumnWidths((prev) => ({
      ...prev,
      [newColumnId]: 80,
    }))

    setRows((prev) =>
      prev.map((row) => {
        const newCell: CellData = {
          id: `${newColumnId}-${row.id}`,
          type: "text",
          value: "",
          width: 80,
        }
        const newCells = [...row.cells]
        newCells.splice(index, 0, newCell)
        return { ...row, cells: newCells }
      })
    )
  }, [columns])

  const insertColumnRight = React.useCallback((columnId: string) => {
    const index = columns.findIndex((col) => col.id === columnId)
    if (index === -1) return

    const newColumnId = generateId()
    const newColumn: ColumnDef = {
      id: newColumnId,
      type: "text",
      title: "新列",
      width: 80,
    }

    setColumns((prev) => {
      const newColumns = [...prev]
      newColumns.splice(index + 1, 0, newColumn)
      return newColumns
    })

    setColumnWidths((prev) => ({
      ...prev,
      [newColumnId]: 80,
    }))

    setRows((prev) =>
      prev.map((row) => {
        const newCell: CellData = {
          id: `${newColumnId}-${row.id}`,
          type: "text",
          value: "",
          width: 80,
        }
        const newCells = [...row.cells]
        newCells.splice(index + 1, 0, newCell)
        return { ...row, cells: newCells }
      })
    )
  }, [columns])

  const hideColumn = React.useCallback((columnId: string) => {
    setHiddenColumns((prev) => new Set(prev).add(columnId))
  }, [])

  const deleteColumn = React.useCallback((columnId: string) => {
    const index = columns.findIndex((col) => col.id === columnId)
    if (index === -1) return

    setColumns((prev) => prev.filter((col) => col.id !== columnId))
    setColumnWidths((prev) => {
      const newWidths = { ...prev }
      delete newWidths[columnId]
      return newWidths
    })
    setHiddenColumns((prev) => {
      const next = new Set(prev)
      next.delete(columnId)
      return next
    })
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        cells: row.cells.filter((cell, i) => i !== index),
      }))
    )
  }, [columns])

  const updateColumnType = React.useCallback((columnId: string, type: CellType) => {
    const index = columns.findIndex((col) => col.id === columnId)
    if (index === -1) return

    // 更新列类型
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, type } : col
      )
    )

    // 更新该列所有单元格类型
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        cells: row.cells.map((cell, i) =>
          i === index ? { ...cell, type } : cell
        ),
      }))
    )
  }, [columns])

  // 直接更新列标题（不触发编辑状态）
  const updateColumnTitle = React.useCallback((columnId: string, title: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, title } : col
      )
    )
  }, [])

  // 冻结列（包含此列及左侧所有列）
  const freezeColumns = React.useCallback((columnId: string) => {
    const columnIndex = columns.findIndex((col) => col.id === columnId)
    if (columnIndex === -1) return

    // 获取此列及左侧所有列的 ID
    const columnsToFreeze = columns.slice(0, columnIndex + 1).map((col) => col.id)
    setFrozenColumns(new Set(columnsToFreeze))
  }, [columns])

  // 设置分组列
  const setGroupColumn = React.useCallback((columnId: string | null) => {
    setGroupColumnId(columnId)
  }, [])

  const state: TableState = {
    selectedRows,
    selectAll,
    editingCellId,
    editingValue,
    columnWidths,
    hiddenColumns,
    frozenColumns,
    groupColumnId,
    collapsedGroups,
  }

  // 切换分组展开/收起
  const toggleGroupCollapse = React.useCallback((groupValue: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(groupValue)) {
        next.delete(groupValue)
      } else {
        next.add(groupValue)
      }
      return next
    })
  }, [])

  // 全选/取消全选某个分组
  const toggleGroupSelect = React.useCallback((groupValue: string, groupRows: RowData[]) => {
    const groupRowIds = groupRows.map(row => row.id)
    const allSelected = groupRowIds.every(id => selectedRows.has(id))

    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        // 取消全选该组
        groupRowIds.forEach(id => next.delete(id))
      } else {
        // 全选该组
        groupRowIds.forEach(id => next.add(id))
      }
      return next
    })
  }, [selectedRows])

  const actions: TableActions = {
    toggleSelectAll,
    toggleRowSelect,
    clearSelection,
    startEdit,
    finishEdit,
    cancelEdit,
    updateEditingValue,
    updateColumnWidth,
    insertColumnLeft,
    insertColumnRight,
    hideColumn,
    deleteColumn,
    updateColumnType,
    updateColumnTitle,
    freezeColumns,
    setGroupColumn,
    toggleGroupCollapse,
    toggleGroupSelect,
  }

  // 过滤隐藏列后的数据
  const visibleData: TableData = {
    columns: columns.filter((col) => !hiddenColumns.has(col.id)),
    rows: rows.map((row) => ({
      ...row,
      cells: row.cells.filter((cell, i) => !hiddenColumns.has(columns[i]?.id)),
    })),
  }

  return (
    <TableContext.Provider value={{ state, actions, data: visibleData }}>
      {children}
    </TableContext.Provider>
  )
}

export { TableContext, TableProvider, useTable }