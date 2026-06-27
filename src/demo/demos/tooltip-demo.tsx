import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle } from "./shared"

// ============================================
// 方向配置
// ============================================

type TooltipSide = "left" | "top" | "bottom" | "right"

const sides: { id: TooltipSide; label: string }[] = [
  { id: "left", label: "左侧" },
  { id: "top", label: "上方" },
  { id: "bottom", label: "下方" },
  { id: "right", label: "右侧" },
]

// ============================================
// 自定义单元格渲染器
// ============================================

function TooltipCellRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const size = (options?.size as "base" | "lg") || "base"
  const side = (options?.side as TooltipSide) || "top"
  const label = sides.find((s) => s.id === side)?.label || side
  const copyText = String(value)

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center w-full h-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size={size}>
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side} size={size}>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon={copied ? "icon-check" : "icon-copy"}
            onClick={handleCopy}
            className={cn("ml-auto", copied ? "text-success-5" : "text-black-55")}
          />
        </TooltipTrigger>
        <TooltipContent side="top" size="base">
          <p>{copyText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// ============================================
// 表格数据生成
// ============================================

const sizeConfigs = ["base", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 100 },
    ...sides.map((s) => ({
      id: s.id,
      type: "text" as const,
      title: s.label,
      width: 140,
    })),
  ]

  const rows = sizeConfigs.map((size) => ({
    id: `row-${size}`,
    cells: [
      { id: `cb-${size}`, value: false },
      { id: `c-size-${size}`, value: size },
      ...sides.map((s) => ({
        id: `c-${s.id}-${size}`,
        value: `tooltip-${s.id}-${size}`,
        type: "tooltipCell" as const,
        options: { size, side: s.id },
      })),
    ],
  }))

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function TooltipPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      tooltipCell: TooltipCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="提示 Tooltip" />
      <section className="mb-16">
                  <DataTable
            data={tableData}
            variant="base" contained
            cellRenderers={cellRenderers}
            readOnly
          />
              </section>
    </div>
  )
}
