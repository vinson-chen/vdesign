interface UseTableEditOptions {
    onEditComplete?: (cellId: string, newValue: string) => void;
}
interface UseTableEditReturn {
    editingCellId: string | null;
    editingValue: string;
    startEdit: (cellId: string, currentValue: string) => void;
    finishEdit: () => void;
    cancelEdit: () => void;
    updateEditingValue: (value: string) => void;
    isEditing: (cellId: string) => boolean;
}
declare function useTableEdit({ onEditComplete }?: UseTableEditOptions): UseTableEditReturn;
export { useTableEdit };
