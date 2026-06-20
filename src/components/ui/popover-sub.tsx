import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva } from "class-variance-authority"
import { cn, sizeConfig, PopoverContext, PopoverSubContext } from "./popover-shared"

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

function PopoverSubTrigger({ className, children, slotId, ...props }: Omit<React.ComponentProps<"div">, "onChange"> & { slotId?: string }) {
  const { size } = React.useContext(PopoverContext)
  const { open, isOpen, scheduleClose } = React.useContext(PopoverSubContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <PopoverPrimitive.Trigger asChild>
      <div
        data-slot="popover-sub-trigger"
        data-slot-id={slotId ?? id}
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "relative flex cursor-pointer select-none items-center outline-none transition-colors justify-between",
          "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
          config.height,
          config.rounded,
          config.px,
          config.gap,
          config.text,
          className
        )}
        onMouseEnter={open}
        onMouseLeave={scheduleClose}
        onClick={(e) => e.preventDefault()}
        {...props}
      >
        {children}
        <svg className={cn("shrink-0 stroke-current stroke-2", config.icon)} viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </PopoverPrimitive.Trigger>
  )
}

const popoverSubContentVariants = cva(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
)

function PopoverSubContent({ className, sideOffset = 4, align = "start", slotId, ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & { slotId?: string }) {
  const { size } = React.useContext(PopoverContext)
  const { scheduleClose, cancelClose } = React.useContext(PopoverSubContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-sub-content"
        data-slot-id={slotId ?? id}
        sideOffset={sideOffset}
        align={align}
        side="right"
        className={cn(
          popoverSubContentVariants(),
          config.rounded === "rounded" ? "rounded-md" : (config.rounded as string) === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
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