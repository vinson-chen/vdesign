import * as React from "react";
declare const popoverRadioVariants: (props?: ({
    checked?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function PopoverRadioGroup({ className, value, onValueChange, children, slotId, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverRadioItem({ className, value, checked, disabled, onValueChange, children, slotId, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & {
    value: string;
    checked?: boolean;
    disabled?: boolean;
    onValueChange?: () => void;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants };
