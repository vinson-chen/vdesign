import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn, sizeConfig, PopoverContext } from "./popover-shared"

const popoverRadioVariants = cva(
  "shrink-0 rounded-full border transition-all flex items-center justify-center",
  {
    variants: {
      checked: {
        true: "border-brand-5 bg-brand-5",
        false: "border-neutral-2 bg-white-100 hover:border-brand-5",
      },
    },
    defaultVariants: { checked: false },
  }
)

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
  value,
  checked = false,
  disabled = false,
  onValueChange,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  value: string
  checked?: boolean
  disabled?: boolean
  onValueChange?: () => void
}) {
  const { size } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <div
      data-slot="popover-radio-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center outline-none transition-colors",
        "text-black-85 hover:bg-neutral-1 focus:bg-neutral-1 active:bg-neutral-2",
        config.height,
        config.rounded,
        config.px,
        config.gap,
        config.text,
        disabled && "cursor-not-allowed text-black-25 opacity-50",
        className
      )}
      onClick={() => !disabled && onValueChange?.()}
      {...props}
    >
      <div className={cn(popoverRadioVariants({ checked }), config.icon)}>
        {checked && <div className={cn("rounded-full bg-white-100", config.indicator)} />}
      </div>
      {children}
    </div>
  )
}

export { PopoverRadioGroup, PopoverRadioItem, popoverRadioVariants }