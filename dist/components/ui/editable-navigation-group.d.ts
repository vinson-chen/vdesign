import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const editableNavigationGroupVariants: (props?: ({
    size?: "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function EditableNavigationGroup({ className, size, defaultItems, selectedIndex, onSelectedChange, onItemsChange, ...props }: React.ComponentProps<"div"> & VariantProps<typeof editableNavigationGroupVariants> & {
    defaultItems?: string[];
    selectedIndex?: number | null;
    onSelectedChange?: (index: number | null) => void;
    onItemsChange?: (items: string[]) => void;
}): import("react/jsx-runtime").JSX.Element;
export { EditableNavigationGroup, editableNavigationGroupVariants };
