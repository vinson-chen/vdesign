import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Context 自动传递 size
const DrawerContext = React.createContext<{ size: "base" | "lg" | "wide" }>({ size: "base" })

// 尺寸配置
const sizeConfig = {
  base: {
    content: "w-[400px] rounded-l-xl",
    header: "p-4 mb-4 gap-2",
    body: "px-4 gap-4",
    field: "gap-2",
    footer: "h-16 px-4 gap-2 rounded-bl-xl",
    title: "text-base",
    description: "text-sm",
  },
  lg: {
    content: "w-[480px] rounded-l-2xl",
    header: "p-5 mb-5 gap-3",
    body: "px-5 gap-5",
    field: "gap-3",
    footer: "h-16 px-5 gap-3 rounded-bl-2xl",
    title: "text-lg",
    description: "text-base",
  },
  wide: {
    content: "w-[560px] rounded-l-xl",
    header: "p-4 mb-4 gap-2",
    body: "px-4 gap-4",
    field: "gap-2",
    footer: "h-16 px-4 gap-2 rounded-bl-xl",
    title: "text-base",
    description: "text-sm",
  },
} as const

// 默认从右边滑入
const Drawer = ({ ...props }) => (
  <DrawerPrimitive.Root direction="right" {...props} />
)
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const drawerContentVariants = cva(
  "fixed right-0 top-0 z-50 h-full flex flex-col bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)] select-text"
)

function DrawerContent({ className, size = "base", children, slotId, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content> & { size?: "base" | "lg" | "wide", slotId?: string }) {
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <DrawerContext.Provider value={{ size }}>
      <DrawerPortal>
        <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/25" />
        <DrawerPrimitive.Content
          data-slot="drawer-content"
          data-slot-id={slotId ?? id}
          className={cn(drawerContentVariants(), config.content, className)}
          onPointerDownCapture={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </DrawerPrimitive.Content>
      </DrawerPortal>
    </DrawerContext.Provider>
  )
}

function DrawerHeader({ className, slotId, ...props }: React.ComponentProps<"div"> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return <div data-slot="drawer-header" data-slot-id={slotId ?? id} className={cn("flex flex-col select-text", config.header, className)} {...props} />
}

function DrawerBody({ className, slotId, ...props }: React.ComponentProps<"div"> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return <div data-slot="drawer-body" data-slot-id={slotId ?? id} className={cn("flex flex-col flex-1 overflow-auto select-text", config.body, className)} {...props} />
}

function DrawerField({ className, slotId, ...props }: React.ComponentProps<"div"> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return <div data-slot="drawer-field" data-slot-id={slotId ?? id} className={cn("flex flex-col", config.field, className)} {...props} />
}

function DrawerFooter({ className, slotId, ...props }: React.ComponentProps<"div"> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return <div data-slot="drawer-footer" data-slot-id={slotId ?? id} className={cn("flex flex-row items-center bg-white-100", config.footer, className)} {...props} />
}

function DrawerTitle({ className, slotId, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      data-slot-id={slotId ?? id}
      className={cn("font-medium text-black-85", config.title, className)}
      {...props}
    />
  )
}

function DrawerDescription({ className, slotId, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description> & { slotId?: string }) {
  const { size } = React.useContext(DrawerContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      data-slot-id={slotId ?? id}
      className={cn("text-black-55", config.description, className)}
      {...props}
    />
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerField,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  drawerContentVariants,
  DrawerContext,
}