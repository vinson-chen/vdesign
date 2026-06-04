import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const radioVariants = cva(
  "shrink-0 rounded-full border transition-all flex items-center justify-center",
  {
    variants: {
      checked: {
        false: "border-neutral-2 bg-white-100 hover:border-brand-5",
        true: "border-brand-5 bg-brand-5",
      },
      disabled: {
        true: "",
        false: "",
      },
      size: {
        sm: "size-[14px]",
        base: "size-4",
        lg: "size-[18px]",
      },
    },
    compoundVariants: [
      {
        checked: false,
        disabled: true,
        class: "border-neutral-2 bg-neutral-1 hover:border-neutral-2",
      },
      {
        checked: true,
        disabled: true,
        class: "border-neutral-2 bg-neutral-1 hover:border-neutral-2",
      },
    ],
    defaultVariants: {
      checked: false,
      disabled: false,
      size: "base",
    },
  }
)

const indicatorVariants = cva("rounded-full bg-brand-5", {
  variants: {
    size: {
      sm: "size-1.5",
      base: "size-2",
      lg: "size-2.5",
    },
  },
  defaultVariants: { size: "base" },
})

interface RadioProps extends Omit<React.ComponentProps<"div">, "checked" | "disabled" | "onChange" | "size"> {
  checked?: boolean
  disabled?: boolean
  size?: "sm" | "base" | "lg"
  onChange?: (checked: boolean) => void
  children?: React.ReactNode
}

const gapMap = {
  sm: "gap-1",
  base: "gap-1.5",
  lg: "gap-2",
} as const

function Radio({
  className,
  checked = false,
  disabled = false,
  size = "base",
  onChange,
  children,
  ...props
}: RadioProps) {
  const isDisabled = disabled

  return (
    <div
      data-slot="radio"
      className={cn("flex items-center cursor-pointer", gapMap[size ?? "base"], isDisabled && "cursor-not-allowed", className)}
      onClick={() => !isDisabled && onChange?.(!checked)}
      {...props}
    >
      <div className={cn(radioVariants({ checked: checked ?? false, disabled: disabled ?? false, size: size ?? "base" }))}>
        {checked && (
          <div className={cn(indicatorVariants({ size }), isDisabled ? "bg-neutral-3" : "bg-white-100")} />
        )}
      </div>
      {children}
    </div>
  )
}

export { Radio, radioVariants }