import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { popoverItemVariants, popoverItemGapMap } from "./popover-shared"

const popoverRadioVariants = cva(
  "shrink-0 rounded-full border transition-all flex items-center justify-center cursor-pointer",
  {
    variants: {
      checked: {
        true: "border-brand-5 bg-brand-5",
        false: "border-neutral-2 bg-white-100 hover:border-brand-5",
      },
      size: {
        sm: "size-[14px]",
        base: "size-4",
        lg: "size-[18px]",
      },
    },
    defaultVariants: { checked: false, size: "base" },
  }
)

const popoverRadioIndicatorVariants = cva("rounded-full", {
  variants: {
    size: {
      sm: "size-1.5",
      base: "size-2",
      lg: "size-2.5",
    },
  },
  defaultVariants: { size: "base" },
})

function PopoverRadioGroup({
  className,
  value,
  onValueChange,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}) {
  return (
    <div data-slot="popover-radio-group" className={cn("", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === PopoverRadioItem) {
          return React.cloneElement(child as React.ReactElement<any>, {
            checked: value === (child.props as any).value,
            onValueChange: () => onValueChange((child.props as any).value),
          })
        }
        return child
      })}
    </div>
  )
}

function PopoverRadioItem({
  className,
  size,
  value,
  checked = false,
  disabled = false,
  onValueChange,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof popoverItemVariants> & {
    value: string
    checked?: boolean
    disabled?: boolean
    onValueChange?: () => void
  }) {
  const s = size ?? "base"

  return (
    <div
      data-slot="popover-radio-item"
      className={cn(
        popoverItemVariants({ size }),
        popoverItemGapMap[s],
        disabled && "cursor-not-allowed text-black-25",
        className
      )}
      onClick={() => !disabled && onValueChange?.()}
      {...props}
    >
      <div className={cn(popoverRadioVariants({ checked, size: s }))}>
        {checked && (
          <div className={cn(popoverRadioIndicatorVariants({ size: s }), "bg-white-100")} />
        )}
      </div>
      {children}
    </div>
  )
}

export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants, popoverRadioIndicatorVariants }