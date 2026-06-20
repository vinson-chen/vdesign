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
        destructive:
          "bg-error-1 text-error-5 hover:bg-error-2 active:bg-error-2 data-[state=open]:bg-error-2",
        link:
          "bg-transparent text-brand-5 hover:text-brand-6 active:text-brand-6 hover:underline underline-offset-4",
      },
      size: {
        sm: "h-6 rounded-md px-1.5 text-xs leading-5 gap-1 [&_svg]:size-[14px]",
        base: "h-8 rounded-lg px-2 text-sm leading-6 gap-1.5 [&_svg]:size-4",
        lg: "h-10 rounded-xl px-3 text-base leading-6 gap-2 [&_svg]:size-[18px]",
        iconSm: "size-6 rounded-md gap-0 [&_svg]:size-[14px]",
        iconBase: "size-8 rounded-lg gap-0 [&_svg]:size-4",
        iconLg: "size-10 rounded-xl gap-0 [&_svg]:size-[18px]",
      },
      noShift: {
        true: "",
        false: "active:translate-y-px data-[state=open]:active:translate-y-0",
      },
      disabled: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // primary / outline / destructive disabled: gray bg + gray border
      {
        variant: ["primary", "outline", "destructive"],
        disabled: true,
        class: "border-neutral-2 bg-neutral-1 text-black-25 hover:bg-neutral-1 hover:text-black-25 active:bg-neutral-1 active:text-black-25 active:translate-y-0",
      },
      // ghost disabled: gray text, keep space
      {
        variant: "ghost",
        disabled: true,
        class: "text-black-25 hover:text-black-25 hover:bg-transparent active:text-black-25 active:bg-transparent active:translate-y-0",
      },
      // link disabled: gray text, no interaction
      {
        variant: "link",
        disabled: true,
        class: "text-black-25 hover:text-black-25 hover:no-underline active:text-black-25 active:translate-y-0",
      },
      // link: remove padding for all sizes
      {
        variant: "link",
        size: ["sm", "base", "lg"],
        class: "px-0",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "base",
      noShift: false,
      disabled: false,
    },
  }
)

function Button({
  className,
  variant,
  size,
  noShift,
  disabled,
  leftIcon,
  rightIcon,
  children,
  slotId,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    leftIcon?: string
    rightIcon?: string
    slotId?: string
  }) {
  const id = React.useId()
  return (
    <button
      data-slot="button"
      data-slot-id={slotId ?? id}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, noShift, disabled, className }))}
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