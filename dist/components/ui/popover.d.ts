import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { sizeConfig, PopoverContext } from "./popover-shared";
declare function Popover({ children, size, ...props }: React.ComponentProps<typeof PopoverPrimitive.Root> & {
    size?: "sm" | "base" | "lg";
}): import("react/jsx-runtime").JSX.Element;
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React.RefAttributes<HTMLDivElement>>;
declare const popoverContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare function PopoverContent({ className, sideOffset, align, slotId, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverItem({ className, disabled: _disabled, slotId, ...props }: React.ComponentProps<"div"> & {
    disabled?: boolean;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverMenuItem({ className, closeOnClick, onClick, children, size: _size, slotId, ...props }: React.ComponentProps<"div"> & {
    closeOnClick?: boolean;
    size?: string;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverLabel({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverSeparator({ className, slotId, ...props }: React.ComponentProps<"div"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Popover, PopoverTrigger, PopoverAnchor, PopoverContent, PopoverItem, PopoverMenuItem, PopoverLabel, PopoverSeparator, popoverContentVariants, PopoverContext, sizeConfig, };
export { PopoverCheckboxItem, popoverCheckboxVariants } from "./popover-checkbox";
export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants } from "./popover-radio";
export { PopoverSub, PopoverSubTrigger, PopoverSubContent, popoverSubContentVariants } from "./popover-sub";
