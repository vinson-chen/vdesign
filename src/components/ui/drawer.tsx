import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 默认从右边滑入
const Drawer = ({ ...props }) => (
  <DrawerPrimitive.Root direction="right" {...props} />
)
const DrawerTrigger = DrawerPrimitive.Trigger
const DrawerPortal = DrawerPrimitive.Portal
const DrawerClose = DrawerPrimitive.Close

const drawerContentVariants = cva(
  "fixed right-0 top-0 z-50 h-full flex flex-col bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)] select-text",
  {
    variants: {
      size: {
        base: "w-[400px] rounded-l-xl",
        lg: "w-[480px] rounded-l-2xl",
        wide: "w-[560px] rounded-l-xl",
      },
    },
    defaultVariants: { size: "base" },
  }
)

function DrawerContent({ className, size, children, ...props }: React.ComponentProps<typeof DrawerPrimitive.Content> & VariantProps<typeof drawerContentVariants>) {
  return (
    <DrawerPortal>
      <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/25" />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={cn(drawerContentVariants({ size }), className)}
        onPointerDownCapture={(e) => e.stopPropagation()}
        {...props}
      >
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}

const drawerHeaderVariants = cva("flex flex-col select-text", {
  variants: {
    size: {
      base: "p-4 mb-4 gap-2",
      lg: "p-5 mb-5 gap-3",
      wide: "p-4 mb-4 gap-2",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerHeader({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof drawerHeaderVariants>) {
  return <div data-slot="drawer-header" className={cn(drawerHeaderVariants({ size }), className)} {...props} />
}

const drawerBodyVariants = cva("flex flex-col flex-1 overflow-auto select-text", {
  variants: {
    size: {
      base: "px-4 gap-4",
      lg: "px-5 gap-5",
      wide: "px-4 gap-4",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerBody({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof drawerBodyVariants>) {
  return <div data-slot="drawer-body" className={cn(drawerBodyVariants({ size }), className)} {...props} />
}

const drawerFieldVariants = cva("flex flex-col", {
  variants: {
    size: {
      base: "gap-2",
      lg: "gap-3",
      wide: "gap-2",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerField({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof drawerFieldVariants>) {
  return <div data-slot="drawer-field" className={cn(drawerFieldVariants({ size }), className)} {...props} />
}

const drawerFooterVariants = cva("flex flex-row items-center bg-white-100", {
  variants: {
    size: {
      base: "h-16 px-4 gap-2 rounded-bl-xl",
      lg: "h-16 px-5 gap-3 rounded-bl-2xl",
      wide: "h-16 px-4 gap-2 rounded-bl-xl",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerFooter({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof drawerFooterVariants>) {
  return <div data-slot="drawer-footer" className={cn(drawerFooterVariants({ size }), className)} {...props} />
}

const drawerTitleVariants = cva("font-medium text-black-85", {
  variants: {
    size: {
      base: "text-base",
      lg: "text-lg",
      wide: "text-base",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerTitle({ className, size, ...props }: React.ComponentProps<typeof DrawerPrimitive.Title> & VariantProps<typeof drawerTitleVariants>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn(drawerTitleVariants({ size }), className)}
      {...props}
    />
  )
}

const drawerDescriptionVariants = cva("text-black-55", {
  variants: {
    size: {
      base: "text-sm",
      lg: "text-base",
      wide: "text-sm",
    },
  },
  defaultVariants: { size: "base" },
})

function DrawerDescription({ className, size, ...props }: React.ComponentProps<typeof DrawerPrimitive.Description> & VariantProps<typeof drawerDescriptionVariants>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn(drawerDescriptionVariants({ size }), className)}
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
  drawerHeaderVariants,
  drawerBodyVariants,
  drawerFieldVariants,
  drawerFooterVariants,
  drawerTitleVariants,
  drawerDescriptionVariants,
}