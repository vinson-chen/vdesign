import * as React from "react"
import { cva } from "class-variance-authority"
import { cn, sizeConfig, PopoverContext } from "./popover-shared"

const popoverCheckboxVariants = cva(
  "shrink-0 border transition-all flex items-center justify-center",
  {
    variants: {
      checked: {
        true: "border-brand-5 bg-brand-5 hover:border-brand-6 hover:bg-brand-6",
        false: "border-neutral-2 bg-white-100 hover:border-brand-5",
      },
    },
    defaultVariants: { checked: false },
  }
)

function PopoverCheckboxItem({
  className,
  checked = false,
  disabled = false,
  onCheckedChange,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> & {
  checked?: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}) {
  const { size } = React.useContext(PopoverContext)
  const config = sizeConfig[size]

  return (
    <div
      data-slot="popover-checkbox-item"
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
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      {...props}
    >
      <div className={cn(popoverCheckboxVariants({ checked }), config.rounded === "rounded" ? "rounded" : "rounded-md", config.icon)}>
        {checked && (
          <svg className={cn("shrink-0 text-white-100", config.icon)} style={{ fill: "currentColor" }}>
            <use xlinkHref="#icon-check-sm" />
          </svg>
        )}
      </div>
      {children}
    </div>
  )
}

export { PopoverCheckboxItem, popoverCheckboxVariants }