import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import type { TableData, CellRendererRegistry, DataTableHandle } from "@/types/table";
declare const tableVariants: (props?: ({
    variant?: "base" | "plain" | null | undefined;
    radius?: "sm" | "base" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface DataTableProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tableVariants> {
    data: TableData;
    cellRenderers?: CellRendererRegistry;
    readOnly?: boolean;
    /** 是否自带滚动容器（含边框+圆角），默认 false */
    contained?: boolean;
}
declare const DataTable: React.ForwardRefExoticComponent<DataTableProps & React.RefAttributes<DataTableHandle>>;
export { DataTable, tableVariants };
export type { DataTableHandle };
