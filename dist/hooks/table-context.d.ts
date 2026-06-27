import * as React from "react";
import type { TableContextValue, TableState, TableActions, TableData, CellRendererRegistry, CellEditEvent } from "@/types/table";
declare const CellRenderersContext: React.Context<CellRendererRegistry>;
declare function useTableActions(): TableActions;
declare function useTableData(): TableData;
declare function useTableState(): TableState;
declare function useTable(): TableContextValue;
interface TableProviderProps {
    data: TableData;
    cellRenderers?: CellRendererRegistry;
    readOnly?: boolean;
    /** 单元格值变更回调，编辑完成时触发 */
    onCellValueChange?: (event: CellEditEvent) => void;
    children: React.ReactNode;
}
declare function TableProvider({ data, cellRenderers, readOnly, onCellValueChange, children }: TableProviderProps): import("react/jsx-runtime").JSX.Element;
export { TableProvider, useTable, useTableActions, useTableData, useTableState, CellRenderersContext };
