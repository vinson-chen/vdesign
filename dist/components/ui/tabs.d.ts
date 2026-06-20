import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps } from "class-variance-authority";
declare const TabsContext: React.Context<{
    size: "sm" | "base" | "lg";
}>;
declare function Tabs({ className, size, children, slotId, ...props }: React.ComponentProps<typeof TabsPrimitive.Root> & {
    size?: "sm" | "base" | "lg";
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const tabsListVariants: (props?: ({
    variant?: "line" | "basic" | null | undefined;
    size?: "sm" | "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function TabsList({ className, variant, slotId, ...props }: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
declare const tabsTriggerVariants: (props?: ({
    variant?: "line" | "basic" | null | undefined;
    size?: "sm" | "base" | "lg" | null | undefined;
    disabled?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function TabsTrigger({ className, variant, disabled, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>): import("react/jsx-runtime").JSX.Element;
declare const tabsContentVariants: (props?: ({
    size?: "sm" | "base" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function TabsContent({ className, slotId, ...props }: React.ComponentProps<typeof TabsPrimitive.Content> & {
    slotId?: string;
}): import("react/jsx-runtime").JSX.Element;
export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants, TabsContext };
