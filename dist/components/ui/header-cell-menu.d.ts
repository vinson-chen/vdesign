declare function HeaderCellMenuView({ columnId, isFirstDataColumn, groupColumnId, readOnly, onEdit, onHideManager, onDimension, }: {
    columnId?: string;
    isFirstDataColumn: boolean;
    groupColumnId: string | null;
    readOnly?: boolean;
    onEdit: () => void;
    onHideManager: () => void;
    onDimension: () => void;
}): import("react/jsx-runtime").JSX.Element;
export { HeaderCellMenuView };
