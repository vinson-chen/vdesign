import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const popoverItemVariants = cva(
  "relative flex cursor-pointer select-none items-center outline-none transition-colors text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
  { variants: { size: { sm: "h-6 gap-1 rounded px-1.5 text-xs", base: "h-8 gap-1.5 rounded-md px-2 text-sm", lg: "h-10 gap-2 rounded-[10px] px-3 text-base" } }, defaultVariants: { size: "base" } }
)

const popoverItemGapMap = { sm: "gap-1", base: "gap-1.5", lg: "gap-2" } as const

// 主菜单 Context
const PopoverContext = React.createContext<{ close: () => void; isOpen: boolean }>({ close: () => {}, isOpen: false })

// 子菜单 Context
const PopoverSubContext = React.createContext<{
  isSub: boolean
  close: () => void
  open: () => void
  isOpen: boolean
  scheduleClose: () => void
  cancelClose: () => void
}>({ isSub: false, close: () => {}, open: () => {}, isOpen: false, scheduleClose: () => {}, cancelClose: () => {} })

export { popoverItemVariants, popoverItemGapMap, cn, PopoverContext, PopoverSubContext }