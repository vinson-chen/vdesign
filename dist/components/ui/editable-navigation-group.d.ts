import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const editableNavigationGroupVariants: (props?: ({
    size?: "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function EditableNavigationGroup({ className, size, defaultItems, onItemsChange, ...props }: React.ComponentProps<"div"> & VariantProps<typeof editableNavigationGroupVariants> & {
    defaultItems?: string[];
    onItemsChange?: (items: string[]) => void;
}): import("react/jsx-runtime").JSX.Element;
export { EditableNavigationGroup, editableNavigationGroupVariants };
