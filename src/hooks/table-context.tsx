import * as React from "react"
import type { TableContextValue, TableState, TableActions, TableData, ColumnDef, CellData, RowData, CellType, CellRendererRegistry } from "@/types/table"
import { defaultCellRenderers } from "@/components/ui/cell-renderers"

// 拆分为 3 个独立 Context，减少不相关状态变化引起的重渲染
const TableActionsContext = React.createContext<TableActions | null>(null)
const TableDataContext = React.createContext<TableData | null>(null)
const TableStateContext = React.createContext<TableState | null>(null)
const CellRenderersContext = React.createContext<CellRendererRegistry>(defaultCellRenderers)

// 独立 hooks：组件只订阅自己需要的 Context
function useTableActions() {
  const ctx = React.useContext(TableActionsContext)
  if (!ctx) throw new Error("useTableActions must be used within a TableProvider")
  return ctx
}

function useTableData() {
  const ctx = React.useContext(TableDataContext)
  if (!ctx) throw new Error("useTableData must be used within a TableProvider")
  return ctx
}

function useTableState() {
  const ctx = React.useContext(TableStateContext)
  if (!ctx) throw new Error("useTableState must be used within a TableProvider")
  return ctx
}

// 向后兼容的组合 hook
function useTable(): TableContextValue {
  return {
    state: useTableState(),
    actions: useTableActions(),
    data: useTableData(),
    cellRenderers: React.useContext(CellRenderersContext),
  }
}

interface TableProviderProps {
  data: TableData
  cellRenderers?: CellRendererRegistry
  readOnly?: boolean
  children: React.ReactNode
}

function TableProvider({ data, cellRenderers, readOnly, children }: TableProviderProps) {
  // 合并内置渲染器和自定义渲染器
  const mergedRenderers = React.useMemo(
    () => ({ ...defaultCellRenderers, ...cellRenderers }),
    [cellRenderers]
  )
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
  const [hiddenColumns, setHiddenColumns] = React.useState<Set<string>>(() => data.hiddenColumns ?? new Set())
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
  const [groupColumnId, setGroupColumnId] = React.useState<string | null>(() => data.groupColumnId ?? null)
  // 收起的分组
  const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set())

  // 选择状态
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())
  // 选中列
  const [selectedColumnId, setSelectedColumnId] = React.useState<string | null>(null)

  // 锁定状态（焦点单元格）
  const [lockedCellId, setLockedCellId] = React.useState<string | null>(null)

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
    // 选中行时清空锁定态
    setLockedCellId(null)
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

  // 单元格值更新（由渲染器通过 onChange 触发）
  // 优化：只更新目标行，跳过无关行
  const updateCellValue = React.useCallback((cellId: string, value: unknown) => {
    setRows((prev) => prev.map(row => {
      // 快速跳过不包含目标 cellId 的行
      const cellIndex = row.cells.findIndex(c => c.id === cellId)
      if (cellIndex === -1) return row
      const newCells = [...row.cells]
      newCells[cellIndex] = { ...row.cells[cellIndex], value: value as string | boolean | number }
      return { ...row, cells: newCells }
    }))
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
      width: 200,
    }

    setColumns((prev) => {
      const newColumns = [...prev]
      newColumns.splice(index, 0, newColumn)
      return newColumns
    })

    setColumnWidths((prev) => ({
      ...prev,
      [newColumnId]: 200,
    }))

    setRows((prev) =>
      prev.map((row) => {
        const newCell: CellData = {
          id: `${newColumnId}-${row.id}`,
          type: "text",
          value: "",
          width: 200,
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
      width: 200,
    }

    setColumns((prev) => {
      const newColumns = [...prev]
      newColumns.splice(index + 1, 0, newColumn)
      return newColumns
    })

    setColumnWidths((prev) => ({
      ...prev,
      [newColumnId]: 200,
    }))

    setRows((prev) =>
      prev.map((row) => {
        const newCell: CellData = {
          id: `${newColumnId}-${row.id}`,
          type: "text",
          value: "",
          width: 200,
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

  const toggleColumnVisibility = React.useCallback((columnId: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev)
      if (next.has(columnId)) {
        next.delete(columnId)
      } else {
        next.add(columnId)
      }
      return next
    })
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

  // 更新列配置（options）
  const updateColumnOptions = React.useCallback((columnId: string, options: Record<string, unknown>) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, options } : col
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
    lockedCellId,
    columnWidths,
    allColumns: columns,
    hiddenColumns,
    frozenColumns,
    groupColumnId,
    collapsedGroups,
    selectedColumnId,
    readOnly,
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

  // 根据列类型生成默认单元格值
  const getDefaultCellValue = (col: ColumnDef): string | boolean | number => {
    switch (col.type) {
      case "checkbox": return false
      case "button": return (col.options?.label as string) || ""
      case "icon": return (col.options?.iconName as string) || ""
      default: return ""
    }
  }

  // 根据列定义生成单元格
  const createCellFromColumn = (col: ColumnDef, rowId: string, extra?: Partial<CellData>): CellData => ({
    id: `${rowId}-${col.id}`,
    type: col.type,
    value: getDefaultCellValue(col),
    width: col.width === "auto" ? 40 : col.width ?? 200,
    ...extra,
  })

  // 在分组内插入新行
  const insertRowInGroup = React.useCallback((groupValue: string, groupColumnId: string) => {
    const groupRowIndex = columns.findIndex(col => col.id === groupColumnId)
    if (groupRowIndex === -1) return

    const newRowId = generateId()
    const newCells: CellData[] = columns.map((col) =>
      createCellFromColumn(col, newRowId, col.id === groupColumnId ? { value: groupValue } : undefined)
    )

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

  // 非分组情况下在表格底部插入新行
  const insertRow = React.useCallback(() => {
    const newRowId = generateId()
    const newCells: CellData[] = columns.map((col) =>
      createCellFromColumn(col, newRowId)
    )

    setRows((prev) => [...prev, { id: newRowId, cells: newCells }])
  }, [columns])

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

  // 锁定单元格（与选中态互斥）
  const lockCell = React.useCallback((cellId: string | null) => {
    setLockedCellId(cellId)
    // 进入锁定态时清空选中态
    if (cellId) {
      setSelectedRows(new Set())
      setSelectedColumnId(null)
    }
  }, [])

  // 选中列
  const selectColumn = React.useCallback((columnId: string | null) => {
    setSelectedColumnId(columnId)
    // 选中列时清空选中行（互斥）
    if (columnId) {
      setSelectedRows(new Set())
      setLockedCellId(null)
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

  // 行列数调整
  const setDimension = React.useCallback((targetRowCount: number, targetColumnCount: number) => {
    // 计算排除列数（仅 checkbox）
    const hasCheckbox = columns.some(col => col.type === "checkbox")
    const excludeColumnCount = hasCheckbox ? 1 : 0
    const currentDataColumnCount = columns.length - excludeColumnCount

    // 用局部变量追踪最新的列定义（React state 异步更新，闭包中还是旧值）
    let latestColumns = columns

    // 先处理列变化（先列后行，确保新行包含正确的列数）
    if (targetColumnCount > currentDataColumnCount) {
      const columnsToAdd = targetColumnCount - currentDataColumnCount
      const newColumns: ColumnDef[] = []
      const newColumnWidths: Record<string, number> = {}

      for (let i = 0; i < columnsToAdd; i++) {
        const newColumnId = generateId()
        const columnNumber = columns.length + i + 1 - excludeColumnCount
        newColumns.push({
          id: newColumnId,
          type: "text",
          title: `列${columnNumber}`,
          width: 200,
        })
        newColumnWidths[newColumnId] = 200
      }

      latestColumns = [...columns, ...newColumns]
      setColumns(latestColumns)
      setColumnWidths((prev) => ({ ...prev, ...newColumnWidths }))

      // 为所有现有行追加新单元格
      setRows((prev) =>
        prev.map((row) => {
          const newCells: CellData[] = newColumns.map((col) => ({
            id: `${col.id}-${row.id}`,
            type: "text",
            value: "",
            width: 200,
          }))
          return { ...row, cells: [...row.cells, ...newCells] }
        })
      )
    } else if (targetColumnCount < currentDataColumnCount) {
      const columnsToRemove = currentDataColumnCount - targetColumnCount
      const startIndex = columns.length - columnsToRemove
      const columnsToRemoveIds = columns.slice(startIndex).map(col => col.id)

      latestColumns = columns.slice(0, startIndex)
      setColumns(latestColumns)
      setColumnWidths((prev) => {
        const newWidths = { ...prev }
        columnsToRemoveIds.forEach(id => delete newWidths[id])
        return newWidths
      })
      setHiddenColumns((prev) => {
        const next = new Set(prev)
        columnsToRemoveIds.forEach(id => next.delete(id))
        return next
      })

      // 删除所有行中对应的单元格
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          cells: row.cells.slice(0, startIndex),
        }))
      )
    }

    // 处理行变化
    const currentRowCount = rows.length

    if (targetRowCount > currentRowCount) {
      const rowsToAdd = targetRowCount - currentRowCount
      const newRowList: RowData[] = []

      // 使用最新的列定义生成新行
      for (let i = 0; i < rowsToAdd; i++) {
        const newRowId = generateId()
        const newCells: CellData[] = latestColumns.map((col) =>
          createCellFromColumn(col, newRowId)
        )
        newRowList.push({ id: newRowId, cells: newCells })
      }

      setRows((prev) => [...prev, ...newRowList])
    } else if (targetRowCount < currentRowCount) {
      setRows((prev) => prev.slice(0, targetRowCount))
    }
  }, [columns, rows])

  const actions: TableActions = {
    toggleSelectAll,
    toggleRowSelect,
    clearSelection,
    startEdit,
    finishEdit,
    cancelEdit,
    updateEditingValue,
    lockCell,
    updateCellValue,
    updateColumnWidth,
    insertColumnLeft,
    insertColumnRight,
    hideColumn,
    toggleColumnVisibility,
    deleteColumn,
    updateColumnType,
    updateColumnTitle,
    updateColumnOptions,
    freezeColumns,
    setGroupColumn,
    toggleGroupCollapse,
    toggleGroupSelect,
    insertRowInGroup,
    insertRow,
    updateGroupValues,
    selectColumn,
    moveColumnOrder,
    setDimension,
  }

  // Memo 化：过滤隐藏列后的数据
  const visibleData: TableData = React.useMemo(() => ({
    columns: columns.filter((col) => !hiddenColumns.has(col.id)),
    rows: rows.map((row) => ({
      ...row,
      cells: row.cells.filter((_, i) => !hiddenColumns.has(columns[i]?.id ?? "")),
    })),
    allRows: rows,
  }), [columns, rows, hiddenColumns])

  // Memo 化：列 ID → ColumnDef 映射，替代 Array.find()
  const columnMap = React.useMemo(() => {
    const map = new Map<string, ColumnDef>()
    visibleData.columns.forEach(col => map.set(col.id, col))
    return map
  }, [visibleData.columns])

  // Memo 化每个 Context value
  const dataValue = React.useMemo<TableData>(() => ({ ...visibleData, columnMap }), [visibleData, columnMap])
  const stateValue = React.useMemo(() => state, [state])
  // actions 是稳定引用（所有回调都用 useCallback），不需要额外 memo

  return (
    <TableActionsContext.Provider value={actions}>
      <TableDataContext.Provider value={dataValue}>
        <TableStateContext.Provider value={stateValue}>
          <CellRenderersContext.Provider value={mergedRenderers}>
            {children}
          </CellRenderersContext.Provider>
        </TableStateContext.Provider>
      </TableDataContext.Provider>
    </TableActionsContext.Provider>
  )
}

export { TableProvider, useTable, useTableActions, useTableData, useTableState, CellRenderersContext }
