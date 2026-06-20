import type { CellType, ColumnDef } from "@/types/table";
declare function HeaderCellEditView({ columnId, value, currentColumnType, currentColumnDef, onClose, }: {
    columnId?: string;
    value: string | boolean | number;
    currentColumnType: CellType;
    currentColumnDef?: ColumnDef;
    onClose: () => void;
}): import("react/jsx-runtime").JSX.Element;
export { HeaderCellEditView };
