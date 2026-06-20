import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Context 自动传递 size
const SelectContext = React.createContext<{ size: "sm" | "base" | "lg" }>({ size: "base" })

// 尺寸配置
const sizeConfig = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "size-[14px]", itemHeight: "h-6", itemRounded: "rounded", itemPx: "px-1", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "size-4", itemHeight: "h-8", itemRounded: "rounded-md", itemPx: "px-2", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "size-[18px]", itemHeight: "h-10", itemRounded: "rounded-[10px]", itemPx: "px-3", text: "text-base leading-6" },
} as const

const selectTriggerVariants = cva(
  "border bg-white-100 outline-none transition-all flex items-center text-black-85 placeholder:text-black-25",
  {
    variants: {
      variant: {
        basic: "border-neutral-2 hover:border-brand-5 data-[state=open]:border-brand-6 data-[state=open]:shadow-[0_0_0_3px_var(--brand-2)] [&>svg]:text-black-55",
        invalid: "border-error-5 hover:border-error-5 data-[state=open]:border-brand-6 data-[state=open]:shadow-[0_0_0_3px_var(--brand-2)] [&>svg]:text-black-55",
        disabled: "border-neutral-2 bg-neutral-1 text-black-25 cursor-not-allowed placeholder:text-black-25 [&>svg]:text-black-25",
      },
    },
    defaultVariants: { variant: "basic" },
  }
)

function Select({ children, disabled, variant, size = "base", ...props }: React.ComponentProps<typeof SelectPrimitive.Root> & VariantProps<typeof selectTriggerVariants> & { size?: "sm" | "base" | "lg" }) {
  const isDisabled = disabled || variant === "disabled"
  return (
    <SelectContext.Provider value={{ size }}>
      <SelectPrimitive.Root disabled={isDisabled} {...props}>
        {children}
      </SelectPrimitive.Root>
    </SelectContext.Provider>
  )
}

function SelectTrigger({ className, variant, leftIcon, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Trigger> & VariantProps<typeof selectTriggerVariants> & { leftIcon?: string, slotId?: string }) {
  const { size } = React.useContext(SelectContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-slot-id={slotId ?? id}
      className={cn(selectTriggerVariants({ variant }), config.height, config.rounded, config.px, config.gap, config.text, className)}
      {...props}
    >
      <span className={cn("flex items-center flex-1 min-w-0", config.gap)}>
        {leftIcon && (
          <svg aria-hidden="true" className={cn("shrink-0 text-black-55", config.icon)} style={{ fill: "currentColor" }}>
            <use xlinkHref={`#${leftIcon}`} />
          </svg>
        )}
        {children}
      </span>
      <SelectPrimitive.Icon asChild>
        <svg aria-hidden="true" className={cn("shrink-0 ml-auto", config.icon)} style={{ fill: "currentColor" }}>
          <use xlinkHref="#icon-chevron-down" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({ className, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Content> & { slotId?: string }) {
  const { size } = React.useContext(SelectContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <SelectPrimitive.Content
      data-slot="select-content"
      data-slot-id={slotId ?? id}
      position="popper"
      sideOffset={4}
      className={cn(
        "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
        "w-[var(--radix-select-trigger-width)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        config.rounded,
        className
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="flex flex-col p-1 group/options">
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  )
}

function SelectItem({ className, children, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Item> & { slotId?: string }) {
  const { size } = React.useContext(SelectContext)
  const config = sizeConfig[size]
  const id = React.useId()

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      data-slot-id={slotId ?? id}
      className={cn(
        "relative flex cursor-pointer select-none items-center outline-none transition-all",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        "data-[state=checked]:bg-neutral-1 group-hover/options:data-[state=checked]:bg-transparent",
        "hover:data-[state=checked]:bg-neutral-1",
        config.itemHeight,
        config.itemRounded,
        config.itemPx,
        config.text,
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectValue({ className, slotId, ...props }: React.ComponentProps<typeof SelectPrimitive.Value> & { slotId?: string }) {
  const id = React.useId()
  return <SelectPrimitive.Value data-slot="select-value" data-slot-id={slotId ?? id} className={className} {...props} />
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, selectTriggerVariants, SelectContext }