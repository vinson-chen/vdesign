import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Context 自动传递 size
const DialogContext = React.createContext<{ size: "base" | "lg" }>({ size: "base" })

// 尺寸配置
const sizeConfig = {
  base: {
    content: "max-w-[400px] rounded-xl p-4",
    close: { buttonSize: "iconBase", position: "right-2 top-2" },
    header: "mb-4 gap-2",
    body: "gap-3",
    field: "gap-2",
    footer: "mt-4 gap-2",
    title: "text-base",
    description: "text-sm",
  },
  lg: {
    content: "max-w-[480px] rounded-2xl p-5",
    close: { buttonSize: "iconLg", position: "right-[10px] top-[10px]" },
    header: "mb-5 gap-3",
    body: "gap-5",
    field: "gap-3",
    footer: "mt-5 gap-3",
    title: "text-lg",
    description: "text-base",
  },
} as const

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const dialogContentVariants = cva(
  "fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]"
)

function DialogContent({ className, size = "base", children, ...props }: React.ComponentProps<typeof DialogPrimitive.Content> & { size?: "base" | "lg" }) {
  const config = sizeConfig[size]

  return (
    <DialogContext.Provider value={{ size }}>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/25 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={cn(
            dialogContentVariants(),
            config.content,
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className
          )}
          {...props}
        >
          {children}
          <DialogPrimitive.Close asChild>
            <Button variant="ghost" size={config.close.buttonSize} className={cn("absolute", config.close.position)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPortal>
    </DialogContext.Provider>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return <div data-slot="dialog-header" className={cn("flex flex-col", config.header, className)} {...props} />
}

function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return <div data-slot="dialog-body" className={cn("flex flex-col", config.body, className)} {...props} />
}

function DialogField({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return <div data-slot="dialog-field" className={cn("flex flex-col", config.field, className)} {...props} />
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return <div data-slot="dialog-footer" className={cn("flex flex-row justify-end", config.footer, className)} {...props} />
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("font-medium text-black-85", config.title, className)}
      {...props}
    />
  )
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]

  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-black-55", config.description, className)}
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
  DialogContext,
}