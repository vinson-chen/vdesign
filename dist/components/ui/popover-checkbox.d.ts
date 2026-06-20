import * as React from "react";
declare const popoverCheckboxVariants: (props?: ({
    checked?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function PopoverCheckboxItem({ className, checked, disabled, onCheckedChange, children, slotId, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & {
    checked?: boolean;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { PopoverCheckboxItem, popoverCheckboxVariants };
