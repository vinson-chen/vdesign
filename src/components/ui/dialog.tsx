import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const dialogContentVariants = cva(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]",
  {
    variants: {
      size: {
        base: "max-w-[400px] rounded-xl p-4",
        lg: "max-w-[480px] rounded-2xl p-5",
      },
    },
    defaultVariants: { size: "base" },
  }
)

const dialogCloseSizeMap = {
  base: { buttonSize: "iconBase" as const, className: "right-2 top-2" },
  lg: { buttonSize: "iconLg" as const, className: "right-[10px] top-[10px]" },
}

function DialogContent({ className, size, children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & VariantProps<typeof dialogContentVariants>) {
  const closeConfig = dialogCloseSizeMap[size ?? "base"]

  return (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          dialogContentVariants({ size }),
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close asChild>
          <Button variant="ghost" size={closeConfig.buttonSize} className={cn("absolute", closeConfig.className)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </Button>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

const dialogHeaderVariants = cva("flex flex-col", {
  variants: {
    size: {
      base: "mb-4 gap-2",
      lg: "mb-5 gap-3",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogHeader({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof dialogHeaderVariants>) {
  return <div data-slot="dialog-header" className={cn(dialogHeaderVariants({ size }), className)} {...props} />
}

const dialogBodyVariants = cva("flex flex-col", {
  variants: {
    size: {
      base: "gap-3",
      lg: "gap-5",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogBody({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof dialogBodyVariants>) {
  return <div data-slot="dialog-body" className={cn(dialogBodyVariants({ size }), className)} {...props} />
}

const dialogFieldVariants = cva("flex flex-col", {
  variants: {
    size: {
      base: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogField({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof dialogFieldVariants>) {
  return <div data-slot="dialog-field" className={cn(dialogFieldVariants({ size }), className)} {...props} />
}

const dialogFooterVariants = cva("flex flex-row justify-end", {
  variants: {
    size: {
      base: "mt-4 gap-2",
      lg: "mt-5 gap-3",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogFooter({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof dialogFooterVariants>) {
  return <div data-slot="dialog-footer" className={cn(dialogFooterVariants({ size }), className)} {...props} />
}

const dialogTitleVariants = cva("font-medium text-black-85", {
  variants: {
    size: {
      base: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogTitle({ className, size, ...props }: React.ComponentProps<typeof DialogPrimitive.Title> & VariantProps<typeof dialogTitleVariants>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(dialogTitleVariants({ size }), className)}
      {...props}
    />
  )
}

const dialogDescriptionVariants = cva("text-black-55", {
  variants: {
    size: {
      base: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: { size: "base" },
})

function DialogDescription({ className, size, ...props }: React.ComponentProps<typeof DialogPrimitive.Description> & VariantProps<typeof dialogDescriptionVariants>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(dialogDescriptionVariants({ size }), className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogField,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
  dialogHeaderVariants,
  dialogBodyVariants,
  dialogFieldVariants,
  dialogFooterVariants,
  dialogTitleVariants,
  dialogDescriptionVariants,
}