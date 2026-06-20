import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { TableData } from "@/types/table"

const tableVariants = cva("flex w-max min-w-full flex-col bg-white-100", {
  variants: {
    variant: {
      base: "border border-neutral-2",
      plain: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-md",
      base: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "base",
    radius: "none",
  },
})

interface TableProps extends React.ComponentProps<"div">, VariantProps<typeof tableVariants> {
  data?: TableData
  children?: React.ReactNode
  slotId?: string
}

function Table({ className, variant, radius, data, children, slotId, ...props }: TableProps) {
  const id = React.useId()
  return (
    <div
      data-slot="table"
      data-slot-id={slotId ?? id}
      className={cn(tableVariants({ variant, radius, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { Table, tableVariants }