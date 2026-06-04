import * as React from "react"

interface UseTableEditOptions {
  onEditComplete?: (cellId: string, newValue: string) => void
}

interface UseTableEditReturn {
  editingCellId: string | null
  editingValue: string
  startEdit: (cellId: string, currentValue: string) => void
  finishEdit: () => void
  cancelEdit: () => void
  updateEditingValue: (value: string) => void
  isEditing: (cellId: string) => boolean
}

function useTableEdit({ onEditComplete }: UseTableEditOptions = {}): UseTableEditReturn {
  const [editingCellId, setEditingCellId] = React.useState<string | null>(null)
  const [editingValue, setEditingValue] = React.useState<string>("")

  const startEdit = React.useCallback((cellId: string, currentValue: string) => {
    setEditingCellId(cellId)
    setEditingValue(currentValue)
  }, [])

  const finishEdit = React.useCallback(() => {
    if (editingCellId && editingValue) {
      onEditComplete?.(editingCellId, editingValue)
    }
    setEditingCellId(null)
    setEditingValue("")
  }, [editingCellId, editingValue, onEditComplete])

  const cancelEdit = React.useCallback(() => {
    setEditingCellId(null)
    setEditingValue("")
  }, [])

  const updateEditingValue = React.useCallback((value: string) => {
    setEditingValue(value)
  }, [])

  const isEditing = React.useCallback(
    (cellId: string) => editingCellId === cellId,
    [editingCellId]
  )

  return {
    editingCellId,
    editingValue,
    startEdit,
    finishEdit,
    cancelEdit,
    updateEditingValue,
    isEditing,
  }
}

export { useTableEdit }