import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-normal transition-all outline-none select-none cursor-pointer disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-5 text-white-90 hover:bg-brand-6 active:bg-brand-6 data-[state=open]:bg-brand-6",
        outline:
          "border-neutral-2 bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-1 data-[state=open]:bg-neutral-1",
        ghost:
          "bg-transparent text-black-85 hover:bg-black-5 active:bg-black-5 data-[state=open]:bg-black-5",
        cell:
          "bg-transparent text-black-85 rounded-none",
        destructive:
          "bg-error-1 text-error-5 hover:bg-error-2 active:bg-error-2 data-[state=open]:bg-error-2",
        link:
          "bg-transparent text-brand-5 hover:text-brand-6 active:text-brand-6",
        disabled:
          "border-neutral-2 bg-neutral-1 text-black-25 cursor-not-allowed",
      },
      size: {
        sm: "h-6 rounded-md px-1.5 text-xs leading-5 gap-1 [&_svg]:size-[14px]",
        base: "h-8 rounded-lg px-2 text-sm leading-6 gap-1.5 [&_svg]:size-4",
        lg: "h-10 rounded-xl px-3 text-base leading-6 gap-2 [&_svg]:size-[18px]",
        iconSm: "size-6 rounded-md gap-0 [&_svg]:size-[14px]",
        iconBase: "size-8 rounded-lg gap-0 [&_svg]:size-4",
        iconLg: "size-10 rounded-xl gap-0 [&_svg]:size-[18px]",
        cellSm: "px-0 h-5 text-xs leading-5 gap-1 [&_svg]:size-[14px]",
        cellBase: "px-0 h-6 text-sm leading-6 gap-1.5 [&_svg]:size-4",
        cellLg: "px-0 h-6 text-base leading-6 gap-2 [&_svg]:size-[18px]",
        cellIconSm: "p-0 size-4 gap-0 [&_svg]:size-[14px]",
        cellIconBase: "p-0 size-6 gap-0 [&_svg]:size-4",
        cellIconLg: "p-0 size-6 gap-0 [&_svg]:size-[18px]",
      },
      noShift: {
        true: "",
        false: "active:translate-y-px data-[state=open]:active:translate-y-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
      noShift: false,
    },
  }
)

function Button({
  className,
  variant,
  size,
  noShift,
  leftIcon,
  rightIcon,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: string
    rightIcon?: string
  }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, noShift, className }))}
      {...props}
    >
      {leftIcon && (
        <svg aria-hidden="true" style={{ fill: "currentColor" }}>
          <use xlinkHref={`#${leftIcon}`} />
        </svg>
      )}
      {children}
      {rightIcon && (
        <svg aria-hidden="true" style={{ fill: "currentColor" }}>
          <use xlinkHref={`#${rightIcon}`} />
        </svg>
      )}
    </button>
  )
}

export { Button, buttonVariants }