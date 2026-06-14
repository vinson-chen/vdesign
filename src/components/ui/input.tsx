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

// 带图标的 wrapper 样式：与 SelectTrigger 保持一致的结构
// padding + gap-1(4px) + 图标尺寸 = 总间距
// base: 8px + 4px + 16px = 28px
// sm: 6px + 4px + 14px = 24px
// lg: 12px + 4px + 18px = 34px
const inputWrapperVariants = cva(
  "flex items-center border bg-white-100 outline-none transition-all",
  {
    variants: {
      variant: {
        basic:
          "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
        invalid:
          "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
        disabled:
          "border-neutral-2 bg-neutral-1 cursor-not-allowed",
      },
      size: {
        base: "h-8 rounded-lg px-2 gap-1.5",
        sm: "h-6 rounded-md px-1.5 gap-1",
        lg: "h-10 rounded-xl px-3 gap-2",
      },
    },
    defaultVariants: {
      variant: "basic",
      size: "base",
    },
  }
)

interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
  leftIcon?: string
  rightIcon?: string
}

function Input({
  className,
  variant,
  size,
  noSpinner,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: InputProps) {
  const isDisabled = disabled || variant === "disabled"
  const hasIcon = leftIcon || rightIcon

  if (!hasIcon) {
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

  const iconSize = size === "sm" ? "14px" : size === "lg" ? "18px" : "16px"

  return (
    <div
      data-slot="input"
      className={cn(inputWrapperVariants({ variant, size, className }))}
    >
      {leftIcon && (
        <svg
          aria-hidden="true"
          className="shrink-0 text-black-55"
          style={{ fill: "currentColor", width: iconSize, height: iconSize }}
        >
          <use xlinkHref={`#${leftIcon}`} />
        </svg>
      )}
      <input
        disabled={isDisabled}
        className={cn(
          "w-full bg-transparent outline-none font-normal text-black-85 placeholder:text-black-25",
          size === "sm" && "text-xs leading-5",
          size === "lg" && "text-base leading-6",
          (size === "base" || !size) && "text-sm leading-6",
          variant === "disabled" && "text-neutral-3 placeholder:text-neutral-3 cursor-not-allowed"
        )}
        {...props}
      />
      {rightIcon && (
        <svg
          aria-hidden="true"
          className="shrink-0 text-black-55"
          style={{ fill: "currentColor", width: iconSize, height: iconSize }}
        >
          <use xlinkHref={`#${rightIcon}`} />
        </svg>
      )}
    </div>
  )
}

export { Input, inputVariants }
