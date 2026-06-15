import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, sizeConfig, PopoverContext, PopoverSubContext } from "./popover-shared"

function Popover({ children, size = "base", ...props }: React.ComponentProps<typeof PopoverPrimitive.Root> & { size?: "sm" | "base" | "lg" }) {
  const [open, setOpen] = React.useState(props.open ?? false)
  const close = () => handleOpenChange(false)

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    props.onOpenChange?.(newOpen)
  }

  // 滚动时自动关闭（排除 Popover 内部滚动）
  React.useEffect(() => {
    if (!open) return
    const handleScroll = (e: Event) => {
      // 排除 Popover 内容区域的滚动
      const target = e.target as HTMLElement
      if (target.closest('[data-slot="popover-content"], [data-slot="header-cell-edit"]')) {
        return
      }
      close()
    }
    window.addEventListener('scroll', handleScroll, { capture: true })
    return () => window.removeEventListener('scroll', handleScroll, { capture: true })
  }, [open])

  return (
    <PopoverPrimitive.Root {...props} open={props.open ?? open} onOpenChange={handleOpenChange}>
      <PopoverContext.Provider value={{ size, close, isOpen: props.open ?? open }}>{children}</PopoverContext.Provider>
    </PopoverPrimitive.Root>
  )
}

const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverAnchor = PopoverPrimitive.Anchor

const popoverContentVariants = cva(
  "z-50 min-w-32 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)] p-1"
)

function PopoverContent({ className, sideOffset = 4, align = "start", ...props }: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const { size } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          popoverContentVariants(),
          config.rounded === "rounded" ? "rounded-md" : config.rounded === "rounded-[10px]" ? "rounded-xl" : "rounded-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverItem({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <div
      data-slot="popover-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        config.height,
        config.rounded,
        config.px,
        config.gap,
        config.text,
        className
      )}
      {...props}
    />
  )
}

function PopoverMenuItem({ className, closeOnClick = false, onClick, children, ...props }: React.ComponentProps<"div"> & { closeOnClick?: boolean }) {
  const { size } = React.useContext(PopoverContext)
  const { isSub, close: subClose } = React.useContext(PopoverSubContext)
  const { close: mainClose } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <div
      data-slot="popover-menu-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        config.height,
        config.rounded,
        config.px,
        config.gap,
        config.text,
        className
      )}
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

function PopoverLabel({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <div
      data-slot="popover-label"
      className={cn("py-1.5 text-black-55", config.px, config.text, className)}
      {...props}
    />
  )
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
  PopoverContext,
  sizeConfig,
}

// Re-export from sub-components
export { PopoverCheckboxItem, popoverCheckboxVariants } from "./popover-checkbox"
export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants } from "./popover-radio"
export { PopoverSub, PopoverSubTrigger, PopoverSubContent, popoverSubContentVariants } from "./popover-sub"