import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import type { TableData, CellRendererRegistry } from "@/types/table";
declare const tableVariants: (props?: ({
    variant?: "base" | "plain" | null | undefined;
    radius?: "sm" | "base" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface DataTableProps extends React.ComponentProps<"div">, VariantProps<typeof tableVariants> {
    data: TableData;
    cellRenderers?: CellRendererRegistry;
    readOnly?: boolean;
    /** 是否自带滚动容器（含边框+圆角），默认 false */
    contained?: boolean;
}
declare function DataTable({ className, variant, radius, data, cellRenderers, readOnly, contained, ...props }: DataTableProps): import("react/jsx-runtime").JSX.Element;
export { DataTable, tableVariants };
