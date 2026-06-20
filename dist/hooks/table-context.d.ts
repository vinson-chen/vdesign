import * as React from "react";
import type { TableContextValue, TableState, TableActions, TableData, CellRendererRegistry } from "@/types/table";
declare const CellRenderersContext: React.Context<CellRendererRegistry>;
declare function useTableActions(): TableActions;
declare function useTableData(): TableData;
declare function useTableState(): TableState;
declare function useTable(): TableContextValue;
interface TableProviderProps {
    data: TableData;
    cellRenderers?: CellRendererRegistry;
    readOnly?: boolean;
    children: React.ReactNode;
}
declare function TableProvider({ data, cellRenderers, readOnly, children }: TableProviderProps): import("react/jsx-runtime").JSX.Element;
export { TableProvider, useTable, useTableActions, useTableData, useTableState, CellRenderersContext };
