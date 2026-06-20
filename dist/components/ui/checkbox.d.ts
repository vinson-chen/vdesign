import * as React from "react";
declare const checkboxVariants: (props?: ({
    checked?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
    size?: "sm" | "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React.ComponentProps<"div">, "checked" | "disabled" | "onChange" | "size"> {
    checked?: boolean;
    disabled?: boolean;
    size?: "sm" | "base" | "lg";
    onChange?: (checked: boolean) => void;
    children?: React.ReactNode;
    slotId?: string;
}
declare function Checkbox({ className, checked, disabled, size, onChange, children, slotId, ...props }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
export { Checkbox, checkboxVariants };
