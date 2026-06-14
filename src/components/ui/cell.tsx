import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cellVariants = cva(
  "relative flex items-stretch overflow-hidden transition-colors",
  {
    variants: {
      variant: {
        default: "bg-white-100",
        defaultHover: "bg-neutral-1",
        selected: "bg-brand-1",
        locked: "bg-brand-1",
        editing: "bg-brand-2",
        header: "bg-neutral-1 hover:bg-neutral-2 font-medium has-[[data-state=open]]:bg-neutral-2",
        headerSelected: "bg-neutral-2 font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const slotVariants = cva(
  "relative flex items-center w-full min-h-6 min-w-[24px] p-2 rounded-sm text-sm text-black-85",
  {
    variants: {
      size: {
        sm: "text-xs leading-5",
        base: "text-sm leading-6",
        lg: "text-base leading-6",
      },
    },
    defaultVariants: {
      size: "base",
    },
  }
)

interface CellProps extends React.ComponentProps<"div">, VariantProps<typeof cellVariants> {
  width?: number
  children?: React.ReactNode
  isLastCell?: boolean
  resizable?: boolean
  onResizeStart?: (startWidth: number, startX: number) => void
  onHoverEdge?: (hovering: boolean) => void
  slotClassName?: string
  onClick?: (e: React.MouseEvent) => void
}

// Cell 是纯展示组件，用 React.memo 避免父组件状态变化时重渲染
const Cell = React.memo(function Cell({ className, variant, width, children, isLastCell, resizable, onResizeStart, onHoverEdge, slotClassName, style, ...props }: CellProps) {
  const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onResizeStart) {
      onResizeStart(width ?? 80, e.clientX)
    }
  }, [onResizeStart, width])

  const handleMouseEnterEdge = React.useCallback(() => {
    onHoverEdge?.(true)
  }, [onHoverEdge])

  const handleMouseLeaveEdge = React.useCallback(() => {
    onHoverEdge?.(false)
  }, [onHoverEdge])

  const showResizeEdge = resizable && !isLastCell

  // 合并传入的 style 和宽度 style
  const mergedStyle = React.useMemo(() => ({
    ...style,
    ...(width ? { width: `${width}px`, minWidth: `${width}px` } : {}),
  }), [style, width])

  return (
    <div
      data-slot="cell"
      className={cn(
        cellVariants({ variant, className }),
        !isLastCell && "border-r border-neutral-2"
      )}
      style={mergedStyle}
      {...props}
    >
      <div className={cn(slotVariants({ size: "base" }), slotClassName)}>
        {children ?? <span className="text-black-85">文本单元格</span>}
      </div>
      {showResizeEdge && (
        <div
          className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize z-10"
          onMouseEnter={handleMouseEnterEdge}
          onMouseLeave={handleMouseLeaveEdge}
          onMouseDown={handleMouseDown}
        />
      )}
    </div>
  )
})

const CellSlot = React.memo(function CellSlot({
  className,
  size,
  children,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof slotVariants>) {
  return (
    <div
      data-slot="cell-slot"
      className={cn(slotVariants({ size, className }))}
      {...props}
    >
      {children}
    </div>
  )
})

export { Cell, CellSlot, cellVariants, slotVariants }