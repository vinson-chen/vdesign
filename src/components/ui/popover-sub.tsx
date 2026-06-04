import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { popoverItemVariants, popoverItemGapMap, PopoverContext, PopoverSubContext } from "./popover-shared"

function PopoverSub({
  open,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const closeTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen
  const parentClose = React.useContext(PopoverContext).close

  const close = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsOpen(false)
    parentClose()
  }

  const openSub = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsOpen(true)
  }

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
      closeTimeoutRef.current = null
    }, 150)
  }

  const cancelClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
  }

  React.useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  return (
    <PopoverPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <PopoverSubContext.Provider value={{ isSub: true, close, open: openSub, isOpen, scheduleClose, cancelClose }}>
        {children}
      </PopoverSubContext.Provider>
    </PopoverPrimitive.Root>
  )
}

function PopoverSubTrigger({
  className,
  size,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof popoverItemVariants>) {
  const s = size ?? "base"
  const { open, isOpen, scheduleClose } = React.useContext(PopoverSubContext)

  return (
    <PopoverPrimitive.Trigger asChild>
      <div
        data-slot="popover-sub-trigger"
        data-state={isOpen ? "open" : "closed"}
        className={cn(popoverItemVariants({ size }), popoverItemGapMap[s], "justify-between", className)}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        onClick={(e) => e.preventDefault()}
        {...props}
      >
        {children}
        <svg className={cn("shrink-0 stroke-current stroke-2", s === "sm" ? "size-[14px]" : s === "lg" ? "size-[18px]" : "size-4")} viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </PopoverPrimitive.Trigger>
  )
}

const popoverSubContentVariants = cva(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1",
  {
    variants: {
      size: {
        sm: "rounded-md",
        base: "rounded-lg",
        lg: "rounded-xl",
      },
    },
    defaultVariants: { size: "base" },
  }
)

function PopoverSubContent({
  className,
  size,
  sideOffset = 4,
  align = "start",
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> &
  VariantProps<typeof popoverSubContentVariants>) {
  const { scheduleClose, cancelClose } = React.useContext(PopoverSubContext)

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-sub-content"
        sideOffset={sideOffset}
        align={align}
        side="right"
        className={cn(
          popoverSubContentVariants({ size }),
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export { PopoverSub, PopoverSubTrigger, PopoverSubContent, popoverSubContentVariants }