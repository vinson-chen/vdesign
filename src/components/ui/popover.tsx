import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, popoverItemVariants, popoverItemGapMap, PopoverContext, PopoverSubContext } from "./popover-shared"

function Popover({ children, ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  const [open, setOpen] = React.useState(props.open ?? false)
  const close = () => handleOpenChange(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    props.onOpenChange?.(newOpen)
  }

  // 滚动时自动关闭
  React.useEffect(() => {
    if (!open) return
    const handleScroll = () => close()
    window.addEventListener('scroll', handleScroll, { capture: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [open])

  return (
    <PopoverPrimitive.Root {...props} open={props.open ?? open} onOpenChange={handleOpenChange}>
      <PopoverContext.Provider value={{ close, isOpen: props.open ?? open }}>{children}</PopoverContext.Provider>
    </PopoverPrimitive.Root>
  )
}

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const popoverContentVariants = cva(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1",
  { variants: { size: { sm: "rounded-md", base: "rounded-lg", lg: "rounded-xl" } }, defaultVariants: { size: "base" } }
)

function PopoverContent({ className, size, sideOffset = 4, align = "start", ...props }: React.ComponentProps<typeof PopoverPrimitive.Content> & VariantProps<typeof popoverContentVariants>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(popoverContentVariants({ size }), "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverItem({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof popoverItemVariants>) {
  return <div data-slot="popover-item" className={cn(popoverItemVariants({ size }), className)} {...props} />
}

function PopoverMenuItem({ className, size, closeOnClick = false, onClick, children, ...props }: React.ComponentProps<"div"> & VariantProps<typeof popoverItemVariants> & { closeOnClick?: boolean }) {
  const { isSub, close: subClose } = React.useContext(PopoverSubContext)
  const { close: mainClose } = React.useContext(PopoverContext)

  return (
    <div
      data-slot="popover-menu-item"
      className={cn(popoverItemVariants({ size }), className)}
      onClick={(e) => {
        if (closeOnClick) {
          // 先关闭 Popover，再延迟执行操作
          (isSub ? subClose : mainClose)()
          setTimeout(() => onClick?.(e), 150)
        } else {
          onClick?.(e)
        }
      }}
      {...props}
    >
      {children}
    </div>
  )
}

const popoverLabelVariants = cva("py-1.5 text-xs text-black-55", {
  variants: {
    size: {
      sm: "px-1.5",
      base: "px-2",
      lg: "px-3",
    },
  },
  defaultVariants: { size: "base" },
})

function PopoverLabel({ className, size, ...props }: React.ComponentProps<"div"> & VariantProps<typeof popoverLabelVariants>) {
  return <div data-slot="popover-label" className={cn(popoverLabelVariants({ size }), className)} {...props} />
}

function PopoverSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="popover-separator" className={cn("-mx-1 my-1 h-px bg-neutral-2", className)} {...props} />
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  PopoverItem,
  PopoverMenuItem,
  PopoverLabel,
  PopoverSeparator,
  popoverContentVariants,
  popoverItemVariants,
  popoverItemGapMap,
  popoverLabelVariants,
  PopoverContext,
}

// Re-export from sub-components
export { PopoverCheckboxItem, popoverCheckboxVariants, popoverCheckIconVariants } from "./popover-checkbox"
export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants, popoverRadioIndicatorVariants } from "./popover-radio"
export { PopoverSub, PopoverSubTrigger, PopoverSubContent, popoverSubContentVariants } from "./popover-sub"