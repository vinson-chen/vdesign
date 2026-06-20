import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 边框状态样式
const borderStyles = {
  basic: "border-neutral-2 hover:border-brand-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus:border-brand-6 focus:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1",
}

// Wrapper 边框样式（使用 focus-within 检测子元素聚焦）
const wrapperBorderStyles = {
  basic: "border-neutral-2 hover:border-brand-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  invalid: "border-error-5 hover:border-error-5 focus-within:border-brand-6 focus-within:shadow-[0_0_0_3px_var(--brand-2)]",
  disabled: "border-neutral-2 bg-neutral-1",
}

const inputVariants = cva(
  "border bg-white-100 outline-none transition-all text-black-85 placeholder:text-black-25 font-normal",
  {
    variants: {
      variant: borderStyles,
      size: {
        base: "h-8 rounded-lg px-2 text-sm leading-6",
        sm: "h-6 rounded-md px-1.5 text-xs leading-5",
        lg: "h-10 rounded-xl px-3 text-base leading-6",
      },
      noSpinner: {
        true: "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      },
    },
    defaultVariants: { variant: "basic", size: "base", noSpinner: false },
  }
)

// 尺寸配置
const sizeConfig = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", icon: "14px", text: "text-xs leading-5" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", icon: "16px", text: "text-sm leading-6" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", icon: "18px", text: "text-base leading-6" },
} as const

interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {
  leftIcon?: string
  rightIcon?: string
  slotId?: string
}

function Input({ className, variant, size, noSpinner, disabled, leftIcon, rightIcon, slotId, ...props }: InputProps) {
  const isDisabled = disabled || variant === "disabled"
  const s = size ?? "base"
  const config = sizeConfig[s]
  const id = React.useId()

  // 无图标：直接渲染 input
  if (!leftIcon && !rightIcon) {
    return (
      <input
        data-slot="input"
        data-slot-id={slotId ?? id}
        disabled={isDisabled}
        className={cn(
          inputVariants({ variant, size, noSpinner }),
          isDisabled && "cursor-not-allowed text-neutral-3 placeholder:text-neutral-3",
          className
        )}
        {...props}
      />
    )
  }

  // 有图标：wrapper + input
  return (
    <div
      data-slot="input"
      data-slot-id={slotId ?? id}
      className={cn(
        "flex items-center border bg-white-100 outline-none transition-all",
        config.height,
        config.rounded,
        config.px,
        config.gap,
        wrapperBorderStyles[variant ?? "basic"],
        variant === "disabled" && "cursor-not-allowed",
        className
      )}
    >
      {leftIcon && (
        <svg aria-hidden="true" className="shrink-0 text-black-55" style={{ fill: "currentColor", width: config.icon, height: config.icon }}>
          <use xlinkHref={`#${leftIcon}`} />
        </svg>
      )}
      <input
        disabled={isDisabled}
        className={cn(
          "w-full bg-transparent outline-none text-black-85 placeholder:text-black-25",
          config.text,
          variant === "disabled" && "text-neutral-3 placeholder:text-neutral-3 cursor-not-allowed"
        )}
        {...props}
      />
      {rightIcon && (
        <svg aria-hidden="true" className="shrink-0 text-black-55" style={{ fill: "currentColor", width: config.icon, height: config.icon }}>
          <use xlinkHref={`#${rightIcon}`} />
        </svg>
      )}
    </div>
  )
}

export { Input, inputVariants }
