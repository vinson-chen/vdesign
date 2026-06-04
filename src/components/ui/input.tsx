import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: {
        basic:
          "border-neutral-2 hover:border-brand-5 focus-visible:border-brand-6 focus-visible:shadow-[0_0_0_3px_var(--brand-2)]",
        invalid:
          "border-error-5 hover:border-error-5 focus-visible:border-brand-6 focus-visible:shadow-[0_0_0_3px_var(--brand-2)]",
        disabled:
          "border-neutral-2 bg-neutral-1 text-neutral-3 placeholder:text-neutral-3",
      },
      size: {
        base: "h-8 rounded-lg px-2 text-sm leading-6",
        sm: "h-6 rounded-md px-1.5 text-xs leading-5",
        lg: "h-10 rounded-xl px-3 text-base leading-6",
      },
      noSpinner: {
        true: "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      },
    },
    defaultVariants: {
      variant: "basic",
      size: "base",
      noSpinner: false,
    },
  }
)

function Input({
  className,
  variant,
  size,
  noSpinner,
  disabled,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> & VariantProps<typeof inputVariants>) {
  const isDisabled = disabled || variant === "disabled"
  return (
    <input
      data-slot="input"
      disabled={isDisabled}
      className={cn(
        inputVariants({ variant, size, noSpinner, className }),
        "font-normal",
        isDisabled && "cursor-not-allowed"
      )}
      {...props}
    />
  )
}

export { Input, inputVariants }