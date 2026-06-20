import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import type { TableData } from "@/types/table";
declare const tableVariants: (props?: ({
    variant?: "base" | "plain" | null | undefined;
    radius?: "sm" | "base" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface TableProps extends React.ComponentProps<"div">, VariantProps<typeof tableVariants> {
    data?: TableData;
    children?: React.ReactNode;
    slotId?: string;
}
declare function Table({ className, variant, radius, data, children, slotId, ...props }: TableProps): import("react/jsx-runtime").JSX.Element;
export { Table, tableVariants };
