import * as React from "react"
import type { RowData } from "@/types/table"

interface UseTableSelectOptions {
  rows: RowData[]
  onSelectionChange?: (selectedRowIds: string[]) => void
}

interface UseTableSelectReturn {
  selectedRows: Set<string>
  selectAll: boolean
  toggleSelectAll: () => void
  toggleRowSelect: (rowId: string) => void
  selectRows: (rowIds: string[]) => void
  clearSelection: () => void
  isSelected: (rowId: string) => boolean
}

function useTableSelect({ rows, onSelectionChange }: UseTableSelectOptions): UseTableSelectReturn {
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set())

  const selectAll = selectedRows.size === rows.length && rows.length > 0

  const toggleSelectAll = React.useCallback(() => {
    const newSelection = selectAll ? new Set<string>() : new Set(rows.map((r) => r.id))
    setSelectedRows(newSelection)
    onSelectionChange?.(Array.from(newSelection))
  }, [selectAll, rows, onSelectionChange])

  const toggleRowSelect = React.useCallback((rowId: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(rowId)) {
        next.delete(rowId)
      } else {
        next.add(rowId)
      }
      onSelectionChange?.(Array.from(next))
      return next
    })
  }, [onSelectionChange])

  const selectRows = React.useCallback((rowIds: string[]) => {
    setSelectedRows(new Set(rowIds))
    onSelectionChange?.(rowIds)
  }, [onSelectionChange])

  const clearSelection = React.useCallback(() => {
    setSelectedRows(new Set())
    onSelectionChange?.([])
  }, [onSelectionChange])

  const isSelected = React.useCallback(
    (rowId: string) => selectedRows.has(rowId),
    [selectedRows]
  )

  return {
    selectedRows,
    selectAll,
    toggleSelectAll,
    toggleRowSelect,
    selectRows,
    clearSelection,
    isSelected,
  }
}

export { useTableSelect }