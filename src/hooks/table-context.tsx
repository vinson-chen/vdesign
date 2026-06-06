import * as React from "react"
import type { TableContextValue, TableState, TableActions, TableData, ColumnDef, CellData, RowData, CellType } from "@/types/table"

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
  // 选中列
  const [selectedColumnId, setSelectedColumnId] = React.useState<string | null>(null)

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
        cells: row.cells.filter((_, i) => i !== index),
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
    selectedColumnId,
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
  const toggleGroupSelect = React.useCallback((_groupValue: string, groupRows: RowData[]) => {
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

  // 在分组内插入新行
  const insertRowInGroup = React.useCallback((groupValue: string, groupColumnId: string) => {
    const groupRowIndex = columns.findIndex(col => col.id === groupColumnId)
    if (groupRowIndex === -1) return

    const newRowId = generateId()
    const newCells: CellData[] = columns.map((col) => ({
      id: `${newRowId}-${col.id}`,
      type: col.type === "checkbox" ? "checkbox" : "text",
      value: col.id === groupColumnId ? groupValue : (col.type === "checkbox" ? false : ""),
      width: col.width === "auto" ? 40 : col.width ?? 200,
    }))

    // 找到该组最后一个行的索引，插入到其后
    let insertIndex = rows.length
    for (let i = rows.length - 1; i >= 0; i--) {
      const row = rows[i]
      const cell = row?.cells[groupRowIndex]
      const rowGroupValue = cell ? String(cell.value ?? "") : ""
      if (rowGroupValue === groupValue) {
        insertIndex = i + 1
        break
      }
    }

    setRows((prev) => {
      const newRows = [...prev]
      newRows.splice(insertIndex, 0, { id: newRowId, cells: newCells })
      return newRows
    })
  }, [columns, rows])

  // 更新分组标题（同步更新该组所有行的分组列单元格）
  const updateGroupValues = React.useCallback((oldGroupValue: string, newGroupValue: string, groupColumnId: string) => {
    const groupRowIndex = columns.findIndex(col => col.id === groupColumnId)
    if (groupRowIndex === -1) return

    setRows((prev) =>
      prev.map((row) => {
        const cell = row.cells[groupRowIndex]
        const cellValue = cell ? String(cell.value ?? "") : ""
        if (cellValue === oldGroupValue && cell) {
          const newCells = [...row.cells]
          newCells[groupRowIndex] = { ...cell, value: newGroupValue }
          return { ...row, cells: newCells }
        }
        return row
      })
    )
  }, [columns])

  // 选中列
  const selectColumn = React.useCallback((columnId: string | null) => {
    setSelectedColumnId(columnId)
    // 选中列时清空选中行（互斥）
    if (columnId) {
      setSelectedRows(new Set())
    }
  }, [])

  // 移动列顺序
  const moveColumnOrder = React.useCallback((sourceColumnId: string, targetColumnId: string, insertPosition: 'left' | 'right') => {
    const sourceIndex = columns.findIndex(col => col.id === sourceColumnId)
    const targetIndex = columns.findIndex(col => col.id === targetColumnId)
    if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) return

    // 计算最终插入位置
    const toIndex = insertPosition === 'right' ? targetIndex + 1 : targetIndex
    // 向右拖：toIndex - 1（因为移除源列后索引会位移）
    // 向左拖：toIndex 保持
    const finalToIndex = toIndex > sourceIndex ? toIndex - 1 : toIndex
    // 相邻且方向一致时不操作
    if (finalToIndex === sourceIndex) return

    const sIdx = sourceIndex

    // 移动列
    setColumns((prev) => {
      const newColumns = [...prev]
      const removed = newColumns[sIdx]
      if (!removed) return prev
      newColumns.splice(sIdx, 1)
      newColumns.splice(finalToIndex, 0, removed)
      return newColumns
    })

    // 移动所有行中对应的单元格
    setRows((prev) =>
      prev.map((row) => {
        const newCells = [...row.cells]
        const removed = newCells[sIdx]
        if (!removed) return row
        newCells.splice(sIdx, 1)
        newCells.splice(finalToIndex, 0, removed)
        return { ...row, cells: newCells }
      })
    )

    // 保持选中列（跟随移动）
    setSelectedColumnId(sourceColumnId)
  }, [columns])

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
    insertRowInGroup,
    updateGroupValues,
    selectColumn,
    moveColumnOrder,
  }

  // 过滤隐藏列后的数据
  const visibleData: TableData = {
    columns: columns.filter((col) => !hiddenColumns.has(col.id)),
    rows: rows.map((row) => ({
      ...row,
      cells: row.cells.filter((_, i) => !hiddenColumns.has(columns[i]?.id ?? "")),
    })),
  }

  return (
    <TableContext.Provider value={{ state, actions, data: visibleData }}>
      {children}
    </TableContext.Provider>
  )
}

export { TableContext, TableProvider, useTable }