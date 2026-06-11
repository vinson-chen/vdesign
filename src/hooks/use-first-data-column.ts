import * as React from "react"
import { useTable } from "./table-context"

/**
 * 计算首列相关信息的 hook
 * - isFirstDataColumn: 当前列是否为首列（checkbox 列右侧第一列或无 checkbox 时第一列）
 * - firstDataColumnId: 首列 ID（基于 allColumns，用于隐藏列管理面板排除首列）
 */
function useFirstDataColumn(columnId?: string) {
  const { data, state } = useTable()

  // 判断当前列是否为首列（基于可见列）
  const isFirstDataColumn = React.useMemo(() => {
    if (!columnId) return false
    const checkboxColumnId = data.columns.find(col => col.type === "checkbox")?.id
    if (checkboxColumnId) {
      const checkboxIndex = data.columns.findIndex(col => col.id === checkboxColumnId)
      const firstDataColumnId = data.columns[checkboxIndex + 1]?.id
      return columnId === firstDataColumnId
    } else {
      return columnId === data.columns[0]?.id
    }
  }, [columnId, data.columns])

  // 计算首列 ID（基于全部列，用于隐藏列管理面板）
  const firstDataColumnId = React.useMemo(() => {
    const allCols = state.allColumns
    const checkboxId = allCols.find(col => col.type === "checkbox")?.id
    if (checkboxId) {
      const checkboxIndex = allCols.findIndex(col => col.id === checkboxId)
      return allCols[checkboxIndex + 1]?.id
    } else {
      return allCols[0]?.id
    }
  }, [state.allColumns])

  return { isFirstDataColumn, firstDataColumnId }
}

export { useFirstDataColumn }