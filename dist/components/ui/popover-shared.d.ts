import * as React from "react";
import { cn } from "@/lib/utils";
declare const sizeConfig: {
    readonly sm: {
        readonly height: "h-6";
        readonly rounded: "rounded";
        readonly px: "px-1.5";
        readonly gap: "gap-1";
        readonly text: "text-xs";
        readonly icon: "size-[14px]";
        readonly indicator: "size-1.5 rounded-full";
    };
    readonly base: {
        readonly height: "h-8";
        readonly rounded: "rounded-lg";
        readonly px: "px-2";
        readonly gap: "gap-1.5";
        readonly text: "text-sm";
        readonly icon: "size-4";
        readonly indicator: "size-2 rounded-full";
    };
    readonly lg: {
        readonly height: "h-10";
        readonly rounded: "rounded-xl";
        readonly px: "px-3";
        readonly gap: "gap-2";
        readonly text: "text-base";
        readonly icon: "size-[18px]";
        readonly indicator: "size-2.5 rounded-full";
    };
};
declare const PopoverContext: React.Context<{
    size: "sm" | "base" | "lg";
    close: () => void;
    isOpen: boolean;
}>;
declare const PopoverSubContext: React.Context<{
    isSub: boolean;
    close: () => void;
    open: () => void;
    isOpen: boolean;
    scheduleClose: () => void;
    cancelClose: () => void;
}>;
export { sizeConfig, cn, PopoverContext, PopoverSubContext };
