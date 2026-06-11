import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const selectTriggerVariants = cva(
  "border bg-white-100 outline-none transition-all font-normal flex items-center justify-between gap-2 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        basic:
          "border-neutral-2 hover:border-brand-5 hover:cursor-pointer focus-visible:border-brand-6 focus-visible:shadow-[0_0_0_3px_var(--brand-2)] text-black-85 placeholder:text-black-25 [&>svg]:text-black-55",
        invalid:
          "border-error-5 hover:border-error-5 hover:cursor-pointer focus-visible:border-brand-6 focus-visible:shadow-[0_0_0_3px_var(--brand-2)] text-black-85 placeholder:text-black-25 [&>svg]:text-black-55",
        disabled:
          "border-neutral-2 bg-neutral-1 text-black-25 cursor-not-allowed placeholder:text-black-25 [&>svg]:text-black-25",
      },
      size: {
        base: "h-8 rounded-lg px-2 text-sm leading-6 [&>svg]:size-4",
        sm: "h-6 rounded-md px-1.5 text-xs leading-5 [&>svg]:size-[14px]",
        lg: "h-10 rounded-xl px-3 text-base leading-6 [&>svg]:size-[18px]",
      },
    },
    defaultVariants: {
      variant: "basic",
      size: "base",
    },
  }
)

function Select({
  children,
  disabled,
  variant,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> &
  VariantProps<typeof selectTriggerVariants>) {
  const isDisabled = disabled || variant === "disabled"
  return (
    <SelectPrimitive.Root disabled={isDisabled} modal={false} {...props}>
      {children}
    </SelectPrimitive.Root>
  )
}

function SelectTrigger({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants>) {
  const iconSize = size === "sm" ? "size-[14px]" : size === "lg" ? "size-[18px]" : "size-4"
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(selectTriggerVariants({ variant, size, className }))}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <svg aria-hidden="true" className={cn("shrink-0", iconSize)} style={{ fill: "currentColor" }}>
          <use xlinkHref="#icon-chevron-down" />
        </svg>
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

const selectContentVariants = cva(
  "relative z-50 max-h-96 overflow-hidden border border-neutral-2 bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]",
  {
    variants: {
      size: {
        base: "rounded-lg",
        sm: "rounded-md",
        lg: "rounded-xl",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

function SelectContent({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> &
  VariantProps<typeof selectContentVariants>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          selectContentVariants({ size, className }),
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2"
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="flex flex-col p-1 group/options">
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

const selectItemVariants = cva(
  "relative flex cursor-pointer select-none items-center outline-none transition-all text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2 data-[state=checked]:bg-neutral-1 group-hover/options:data-[state=checked]:bg-transparent hover:data-[state=checked]:bg-neutral-1 data-[state=checked]:text-black-85",
  {
    variants: {
      size: {
        base: "h-8 rounded-md px-2 text-sm leading-6",
        sm: "h-6 rounded px-1 text-xs leading-5",
        lg: "h-10 rounded-[10px] px-3 text-base leading-6",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

function SelectItem({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> &
  VariantProps<typeof selectItemVariants>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants({ size }), className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("", className)}
      {...props}
    />
  )
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, selectTriggerVariants, selectItemVariants, selectContentVariants }