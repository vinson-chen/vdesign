import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

// Context 自动传递 size
const PaginationContext = React.createContext<{ size: "sm" | "base" | "lg" }>({ size: "base" })

// 尺寸配置
const sizeConfig = {
  sm: { gap: "gap-1", button: "size-6 rounded-md", icon: "size-[14px]", text: "text-xs", inputWidth: "w-12" },
  base: { gap: "gap-1.5", button: "size-8 rounded-lg", icon: "size-4", text: "text-sm", inputWidth: "w-14" },
  lg: { gap: "gap-2", button: "size-10 rounded-xl", icon: "size-[18px]", text: "text-base", inputWidth: "w-16" },
} as const

const paginationVariants = cva("flex items-center", {
  variants: { size: { sm: "gap-1", base: "gap-1.5", lg: "gap-2" } },
  defaultVariants: { size: "base" },
})

function Pagination({ className, size = "base", ...props }: React.ComponentProps<"nav"> & VariantProps<typeof paginationVariants>) {
  return (
    <PaginationContext.Provider value={{ size }}>
      <nav data-slot="pagination" role="navigation" aria-label="pagination" className={cn(paginationVariants({ size }), className)} {...props} />
    </PaginationContext.Provider>
  )
}

function PaginationButton({ className, disabled, children, ...props }: React.ComponentProps<"button">) {
  const { size } = React.useContext(PaginationContext)
  const config = sizeConfig[size]

  return (
    <button
      data-slot="pagination-button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center border border-transparent bg-clip-padding font-normal transition-all outline-none",
        disabled
          ? "bg-white-100 text-black-25 cursor-not-allowed"
          : "bg-white-100 text-black-85 hover:bg-neutral-1 active:bg-neutral-1 active:translate-y-px cursor-pointer",
        config.button,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

function PaginationPrevious({ className, disabled, onClick, ...props }: React.ComponentProps<typeof PaginationButton>) {
  const { size } = React.useContext(PaginationContext)
  const config = sizeConfig[size]

  return (
    <PaginationButton disabled={disabled} aria-label="上一页" className={className} onClick={onClick} {...props}>
      <svg aria-hidden="true" className={config.icon} style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-left" /></svg>
    </PaginationButton>
  )
}

function PaginationNext({ className, disabled, onClick, ...props }: React.ComponentProps<typeof PaginationButton>) {
  const { size } = React.useContext(PaginationContext)
  const config = sizeConfig[size]

  return (
    <PaginationButton disabled={disabled} aria-label="下一页" className={className} onClick={onClick} {...props}>
      <svg aria-hidden="true" className={config.icon} style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-right" /></svg>
    </PaginationButton>
  )
}

function PaginationInfo({ className, page, totalPages, onPageChange }: React.ComponentProps<"div"> & { page: number; totalPages: number; onPageChange: (page: number) => void }) {
  const { size } = React.useContext(PaginationContext)
  const config = sizeConfig[size]
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

  return (
    <div data-slot="pagination-info" className={cn("flex items-center", config.gap, className)}>
      <Input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        size={size}
        noSpinner
        className={cn(config.inputWidth, "text-center")}
      />
      <span className={cn(config.text, "text-black-85")}>/</span>
      <span className={cn(config.text, "text-black-85")}>{totalPages}</span>
    </div>
  )
}

export { Pagination, PaginationButton, PaginationPrevious, PaginationNext, PaginationInfo, paginationVariants, PaginationContext }