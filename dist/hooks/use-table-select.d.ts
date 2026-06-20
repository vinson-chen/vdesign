import type { RowData } from "@/types/table";
interface UseTableSelectOptions {
    rows: RowData[];
    onSelectionChange?: (selectedRowIds: string[]) => void;
}
interface UseTableSelectReturn {
    selectedRows: Set<string>;
    selectAll: boolean;
    toggleSelectAll: () => void;
    toggleRowSelect: (rowId: string) => void;
    selectRows: (rowIds: string[]) => void;
    clearSelection: () => void;
    isSelected: (rowId: string) => boolean;
}
declare function useTableSelect({ rows, onSelectionChange }: UseTableSelectOptions): UseTableSelectReturn;
export { useTableSelect };
