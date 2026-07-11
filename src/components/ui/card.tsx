import * as React from "react"
import { cn } from "@/lib/utils"

type CardSize = "sm" | "base" | "lg"

const CardContext = React.createContext<{ size: CardSize }>({ size: "base" })

const sizePadding: Record<CardSize, string> = {
  sm: "p-2",
  base: "p-3",
  lg: "p-4",
}

const sizeRadius: Record<CardSize, string> = {
  sm: "rounded-lg",
  base: "rounded-xl",
  lg: "rounded-2xl",
}

function Card({
  className,
  size = "base",
  ...props
}: React.ComponentProps<"div"> & { size?: CardSize }) {
  return (
    <CardContext.Provider value={{ size }}>
      <div
        data-slot="card"
        className={cn(
          "flex flex-col overflow-hidden border border-neutral-2 bg-white-100",
          sizeRadius[size],
          className
        )}
        {...props}
      />
    </CardContext.Provider>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(CardContext)
  return (
    <div
      data-slot="card-header"
      className={cn("border-b border-neutral-2", sizePadding[size], className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(CardContext)
  return (
    <div
      data-slot="card-content"
      className={cn(
        "flex flex-1 items-center justify-center bg-neutral-1 min-h-24",
        sizePadding[size],
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = React.useContext(CardContext)
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t border-neutral-2",
        sizePadding[size],
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardContent, CardFooter }
