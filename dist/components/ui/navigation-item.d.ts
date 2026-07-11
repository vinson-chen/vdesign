import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const navigationItemVariants: (props?: ({
    variant?: "basic" | "selected" | null | undefined;
    size?: "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function NavigationItem({ className, variant, size, onClick, children, slotId, ...props }: React.ComponentProps<"div"> & VariantProps<typeof navigationItemVariants> & {
    onClick?: () => void;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { NavigationItem, navigationItemVariants };
