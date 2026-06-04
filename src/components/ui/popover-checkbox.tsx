import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { popoverItemVariants, popoverItemGapMap } from "./popover-shared"

const popoverCheckboxVariants = cva(
  "shrink-0 border transition-all flex items-center justify-center cursor-pointer",
  {
    variants: {
      checked: {
        true: "border-brand-5 bg-brand-5",
        false: "border-neutral-2 bg-white-100 hover:border-brand-5",
      },
      size: {
        sm: "size-[14px] rounded",
        base: "size-4 rounded-md",
        lg: "size-[18px] rounded-md",
      },
    },
    defaultVariants: { checked: false, size: "base" },
  }
)

const popoverCheckIconVariants = cva("shrink-0 fill-current", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]",
    },
  },
  defaultVariants: { size: "base" },
})

function PopoverCheckboxItem({
  className,
  size,
  checked = false,
  disabled = false,
  onCheckedChange,
  children,
  ...props
}: Omit<React.ComponentProps<"div">, "onChange"> &
  VariantProps<typeof popoverItemVariants> & {
    checked?: boolean
    disabled?: boolean
    onCheckedChange?: (checked: boolean) => void
  }) {
  const s = size ?? "base"

  return (
    <div
      data-slot="popover-checkbox-item"
      className={cn(
        popoverItemVariants({ size }),
        popoverItemGapMap[s],
        disabled && "cursor-not-allowed text-black-25",
        className
      )}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      {...props}
    >
      <div className={cn(popoverCheckboxVariants({ checked, size: s }))}>
        {checked && (
          <svg className={cn(popoverCheckIconVariants({ size: s }), "text-white-100")}>
            <use xlinkHref="#icon-check-sm" />
          </svg>
        )}
      </div>
      {children}
    </div>
  )
}

export { PopoverCheckboxItem, popoverCheckboxVariants, popoverCheckIconVariants }