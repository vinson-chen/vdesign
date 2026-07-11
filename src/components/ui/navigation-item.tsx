import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const navigationItemVariants = cva(
  "flex items-center cursor-pointer transition-all text-left whitespace-nowrap",
  {
    variants: {
      variant: {
        basic: "bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-2",
        selected: "bg-neutral-1 text-black-85 active:bg-neutral-2",
      },
      size: {
        base: "h-8 px-2 text-sm leading-6 rounded-lg gap-1.5",
        lg: "h-10 px-3 text-base leading-6 rounded-xl gap-2",
      },
    },
    defaultVariants: { variant: "basic", size: "base" },
  }
)

function NavigationItem({
  className,
  variant,
  size,
  onClick,
  children,
  slotId,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof navigationItemVariants> & {
    onClick?: () => void
    slotId?: string
  }) {
  const id = React.useId()
  return (
    <div
      data-slot="navigation-item"
      data-slot-id={slotId ?? id}
      className={cn(navigationItemVariants({ variant, size }), className)}
      onClick={(e) => { e.stopPropagation(); onClick?.() }}
      {...props}
    >
      {children}
    </div>
  )
}

export { NavigationItem, navigationItemVariants }