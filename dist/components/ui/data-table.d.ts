import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import type { TableData, CellRendererRegistry, DataTableHandle, CellEditEvent } from "@/types/table";
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
    /** 分组收起状态变更回调，业务层可用于持久化（如 localStorage） */
    onCollapsedGroupsChange?: (groups: string[]) => void;
    /** 单元格值变更回调，编辑完成时触发 */
    onCellValueChange?: (event: CellEditEvent) => void;
}
declare const DataTable: React.ForwardRefExoticComponent<DataTableProps & React.RefAttributes<DataTableHandle>>;
export { DataTable, tableVariants };
export type { DataTableHandle };
