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
}

function Table({ className, variant, radius, data, children, ...props }: TableProps) {
  return (
    <div
      data-slot="table"
      className={cn(tableVariants({ variant, radius, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

export { Table, tableVariants }