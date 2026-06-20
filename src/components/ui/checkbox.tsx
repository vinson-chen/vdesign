import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const checkboxVariants = cva(
  "flex shrink-0 items-center justify-center border transition-all",
  {
    variants: {
      checked: {
        false:
          "border-neutral-2 bg-white-100 hover:border-brand-5 hover:bg-white-100",
        true: "border-brand-5 bg-brand-5 hover:border-brand-6 hover:bg-brand-6",
      },
      disabled: {
        true: "",
        false: "",
      },
      size: {
        sm: "size-[14px] rounded",
        base: "size-4 rounded-md",
        lg: "size-[18px] rounded-md",
      },
    },
    compoundVariants: [
      {
        checked: false,
        disabled: true,
        class:
          "border-neutral-2 bg-neutral-1 hover:border-neutral-2 hover:bg-neutral-1",
      },
      {
        checked: true,
        disabled: true,
        class:
          "border-neutral-2 bg-neutral-1 hover:border-neutral-2 hover:bg-neutral-1",
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
      size: "base",
    },
  }
)

const checkIconVariants = cva("shrink-0", {
  variants: {
    size: {
      sm: "size-[14px]",
      base: "size-4",
      lg: "size-[18px]",
    },
  },
  defaultVariants: { size: "base" },
})

interface CheckboxProps extends Omit<
  React.ComponentProps<"div">,
  "checked" | "disabled" | "onChange" | "size"
> {
  checked?: boolean
  disabled?: boolean
  size?: "sm" | "base" | "lg"
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
  slotId?: string
}

const gapMap = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2",
} as const

function Checkbox({
  className,
  checked = false,
  disabled = false,
  size = "base",
  onChange,
  children,
  slotId,
  ...props
}: CheckboxProps) {
  const isDisabled = disabled
  const id = React.useId()

  return (
    <div
      data-slot="checkbox"
      data-slot-id={slotId ?? id}
      role="checkbox"
      aria-checked={checked}
      tabIndex={isDisabled ? undefined : 0}
      className={cn(
        "flex items-center",
        gapMap[size ?? "base"],
        !isDisabled && "cursor-pointer",
        isDisabled && "cursor-not-allowed",
        className
      )}
      onClick={() => !isDisabled && onChange?.(!checked)}
      {...props}
    >
      <div
        className={cn(
          checkboxVariants({
            checked: checked ?? false,
            disabled: disabled ?? false,
            size: size ?? "base",
          })
        )}
      >
        {checked && (
          <svg
            aria-hidden="true"
            className={cn(
              checkIconVariants({ size }),
              isDisabled ? "text-black-25" : "text-white-100"
            )}
            style={{ fill: "currentColor" }}
          >
            <use xlinkHref="#icon-check-sm" />
          </svg>
        )}
      </div>
      {children}
    </div>
  )
}

export { Checkbox, checkboxVariants }
