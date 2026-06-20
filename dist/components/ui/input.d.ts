import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const inputVariants: (props?: ({
    variant?: "disabled" | "basic" | "invalid" | null | undefined;
    size?: "sm" | "base" | "lg" | null | undefined;
    noSpinner?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
    leftIcon?: string;
    rightIcon?: string;
    slotId?: string;
}
declare function Input({ className, variant, size, noSpinner, disabled, leftIcon, rightIcon, slotId, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
export { Input, inputVariants };
