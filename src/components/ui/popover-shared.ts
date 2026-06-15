import * as React from "react"
import { cn } from "@/lib/utils"

// 尺寸配置
const sizeConfig = {
  sm: { height: "h-6", rounded: "rounded", px: "px-1.5", gap: "gap-1", text: "text-xs", icon: "size-[14px]", indicator: "size-1.5 rounded-full" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm", icon: "size-4", indicator: "size-2 rounded-full" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base", icon: "size-[18px]", indicator: "size-2.5 rounded-full" },
} as const

// 主菜单 Context
const PopoverContext = React.createContext<{
  size: "sm" | "base" | "lg"
  close: () => void
  isOpen: boolean
}>({ size: "base", close: () => {}, isOpen: false })

// 子菜单 Context
const PopoverSubContext = React.createContext<{
  isSub: boolean
  close: () => void
  open: () => void
  isOpen: boolean
  scheduleClose: () => void
  cancelClose: () => void
}>({ isSub: false, close: () => {}, open: () => {}, isOpen: false, scheduleClose: () => {}, cancelClose: () => {} })

export { sizeConfig, cn, PopoverContext, PopoverSubContext }