import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps } from "class-variance-authority";
declare const SelectContext: React.Context<{
    size: "sm" | "base" | "lg";
}>;
declare const selectTriggerVariants: (props?: ({
    variant?: "disabled" | "basic" | "invalid" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Select({ children, disabled, variant, size, ...props }: React.ComponentProps<typeof SelectPrimitive.Root> & VariantProps<typeof selectTriggerVariants> & {
    size?: "sm" | "base" | "lg";
}): import("react/jsx-runtime").JSX.Element;
declare function SelectTrigger({ className, variant, leftIcon, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants> & {
    leftIcon?: string;
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectContent({ className, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Content> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectItem({ className, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Item> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare function SelectValue({ className, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Value> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, selectTriggerVariants, SelectContext };
