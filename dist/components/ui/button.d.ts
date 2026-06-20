import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const buttonVariants: (props?: ({
    variant?: "primary" | "outline" | "ghost" | "destructive" | "link" | null | undefined;
    size?: "sm" | "base" | "lg" | "iconSm" | "iconBase" | "iconLg" | null | undefined;
    noShift?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Button({ className, variant, size, noShift, disabled, leftIcon, rightIcon, children, slotId, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & {
    leftIcon?: string;
    rightIcon?: string;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Button, buttonVariants };
