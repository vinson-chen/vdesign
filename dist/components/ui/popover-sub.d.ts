import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
declare function PopoverSub({ open, onOpenChange, children, }: {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function PopoverSubTrigger({ className, children, slotId, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const popoverSubContentVariants: (props?: import("class-variance-authority/types").ClassProp | undefined) => string;
declare function PopoverSubContent({ className, sideOffset, align, slotId, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { PopoverSub, PopoverSubTrigger, PopoverSubContent, popoverSubContentVariants };
