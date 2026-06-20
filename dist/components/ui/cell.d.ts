import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const cellVariants: (props?: ({
    variant?: "header" | "default" | "defaultHover" | "selected" | "locked" | "editing" | "headerSelected" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const slotVariants: (props?: ({
    size?: "sm" | "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface CellProps extends React.ComponentProps<"div">, VariantProps<typeof cellVariants> {
    width?: number;
    columnId?: string;
    children?: React.ReactNode;
    isLastCell?: boolean;
    resizable?: boolean;
    onResizeStart?: (startWidth: number, startX: number) => void;
    onHoverEdge?: (hovering: boolean) => void;
    slotClassName?: string;
    onClick?: (e: React.MouseEvent) => void;
}
declare const Cell: React.NamedExoticComponent<CellProps>;
declare const CellSlot: React.NamedExoticComponent<React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement> & VariantProps<(props?: ({
    size?: "sm" | "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & {
    slotId?: string;
}>;
export { Cell, CellSlot, cellVariants, slotVariants };
