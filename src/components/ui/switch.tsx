import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const switchVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-all p-0.5",
  {
    variants: {
      checked: {
        false: "bg-neutral-3 hover:bg-neutral-3",
        true: "bg-brand-5 hover:bg-brand-6",
      },
      disabled: { true: "cursor-not-allowed", false: "" },
      size: { base: "h-5 w-9", sm: "h-4 w-7", lg: "h-6 w-11" },
    },
    compoundVariants: [
      { checked: false, disabled: true, class: "bg-neutral-2 hover:bg-neutral-2" },
      { checked: true, disabled: true, class: "bg-brand-3 hover:bg-brand-3" },
    ],
    defaultVariants: { checked: false, disabled: false, size: "base" },
  }
)

const thumbMap = { base: "size-4 translate-x-4", sm: "size-3 translate-x-3", lg: "size-5 translate-x-5" } as const

function Switch({
  className,
  checked,
  disabled,
  size,
  onChange,
  ...props
}: Omit<React.ComponentProps<"button">, "onChange"> &
  VariantProps<typeof switchVariants> & {
    checked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
  }) {
  const s = size || "base"
  return (
    <button
      data-slot="switch"
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      className={cn(switchVariants({ checked, disabled, size }), className)}
      onClick={() => !disabled && onChange?.(!checked)}
      {...props}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block rounded-full bg-white-100 shadow-[0_1px_3px_var(--black-10)] transition-transform",
          thumbMap[s],
          checked ? "" : "translate-x-0"
        )}
      />
    </button>
  )
}

export { Switch, switchVariants }