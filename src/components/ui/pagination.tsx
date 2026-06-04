import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const paginationVariants = cva("flex items-center", {
  variants: {
    size: { sm: "gap-1", base: "gap-1.5", lg: "gap-2" },
  },
  defaultVariants: { size: "base" },
})

function Pagination({ className, size, ...props }: React.ComponentProps<"nav"> & VariantProps<typeof paginationVariants>) {
  return <nav data-slot="pagination" role="navigation" aria-label="pagination" className={cn(paginationVariants({ size }), className)} {...props} />
}

function PaginationButton({ className, disabled, children, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="pagination-button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-transparent bg-clip-padding font-normal transition-all outline-none select-none cursor-pointer",
        disabled
          ? "bg-white-100 text-black-25 cursor-not-allowed"
          : "bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-1 active:translate-y-px",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function PaginationPrevious({ className, size, disabled, onClick, ...props }: React.ComponentProps<typeof PaginationButton> & { size?: "sm" | "base" | "lg" }) {
  const sizeClass = size === "sm" ? "size-6 rounded-md" : size === "lg" ? "size-10 rounded-xl" : "size-8 rounded-lg"
  const iconSize = size === "sm" ? "size-[14px]" : size === "lg" ? "size-[18px]" : "size-4"
  return (
    <PaginationButton disabled={disabled} aria-label="上一页" className={cn(sizeClass, className)} onClick={onClick} {...props}>
      <svg aria-hidden="true" className={iconSize} style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-left" /></svg>
    </PaginationButton>
  )
}

function PaginationNext({ className, size, disabled, onClick, ...props }: React.ComponentProps<typeof PaginationButton> & { size?: "sm" | "base" | "lg" }) {
  const sizeClass = size === "sm" ? "size-6 rounded-md" : size === "lg" ? "size-10 rounded-xl" : "size-8 rounded-lg"
  const iconSize = size === "sm" ? "size-[14px]" : size === "lg" ? "size-[18px]" : "size-4"
  return (
    <PaginationButton disabled={disabled} aria-label="下一页" className={cn(sizeClass, className)} onClick={onClick} {...props}>
      <svg aria-hidden="true" className={iconSize} style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-right" /></svg>
    </PaginationButton>
  )
}

function PaginationInfo({ className, size, page, totalPages, onPageChange }: React.ComponentProps<"div"> & { size?: "sm" | "base" | "lg"; page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState(String(page))

  React.useEffect(() => {
    setInputValue(String(page))
  }, [page])

  const handleBlur = () => {
    let value = parseInt(inputValue, 10)
    if (isNaN(value) || value < 1 || inputValue === "") {
      value = 1
    } else if (value > totalPages) {
      value = totalPages
    }
    setInputValue(String(value))
    onPageChange(value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const inputWidth = size === "sm" ? "w-12" : size === "lg" ? "w-16" : "w-14"
  const textSize = size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm"
  const inputSize = size === "sm" ? "sm" : size === "lg" ? "lg" : "base"
  const gap = size === "sm" ? "gap-1" : size === "lg" ? "gap-2" : "gap-1.5"

  return (
    <div data-slot="pagination-info" className={cn("flex items-center", gap, className)}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        size={inputSize}
        noSpinner
        className={cn(inputWidth, "text-center")}
      />
      <span className={cn(textSize, "text-black-85")}>/</span>
      <span className={cn(textSize, "text-black-85")}>{totalPages}</span>
    </div>
  )
}

export { Pagination, PaginationButton, PaginationPrevious, PaginationNext, PaginationInfo, paginationVariants }