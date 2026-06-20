import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type VariantProps } from "class-variance-authority";
declare const tooltipContentVariants: (props?: ({
    size?: "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function TooltipProvider({ children, delayDuration, ...props }: React.ComponentProps<typeof TooltipPrimitive.Provider>): import("react/jsx-runtime").JSX.Element;
declare function Tooltip({ children, ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare function TooltipContent({ className, size, sideOffset, children, slotId, ...props }: React.ComponentProps<typeof TooltipPrimitive.Content> & VariantProps<typeof tooltipContentVariants> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, tooltipContentVariants, };
