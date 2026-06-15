import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationInfo,
} from "@/components/ui/pagination"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, DemoTableWrapper } from "./shared"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["pagination", slot, size].join("-")
}

function getDisplaySize(size: string): string {
  return size.toLowerCase()
}

// ============================================
// 自定义单元格渲染器
// ============================================

// 精简 Pagination 渲染器（完整分页器）
function PaginationCompactRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const totalPages = 3

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex items-center w-full h-full">
      <Pagination size={size}>
        <PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} />
        <PaginationInfo page={page} totalPages={totalPages} onPageChange={setPage} />
        <PaginationNext disabled={page === totalPages} onClick={() => setPage(page + 1)} />
      </Pagination>
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
        <TooltipContent side="top">
          <p>{copyText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// ============================================
// 表格数据生成
// ============================================

interface SlotConfig {
  name: string
  renderer: string
  props: Record<string, unknown>
}

const slotConfigs: SlotConfig[] = [
  { name: "compact", renderer: "paginationCompact", props: {} },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "compact", type: "paginationCompact" as const, title: "精简", width: 300 },
  ]

  const rows = sizeConfigs.map((size) => {
    const displaySize = getDisplaySize(size)
    return {
      id: `row-${size}`,
      cells: [
        { id: `c-size-${size}`, value: displaySize },
        ...slotConfigs.map((slot) => ({
          id: `c-${slot.name}-${size}`,
          value: ontoName(slot.name, size),
          type: slot.renderer as "paginationCompact",
          options: {
            size,
            ...slot.props,
          },
        })),
      ],
    }
  })

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function PaginationPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      paginationCompact: PaginationCompactRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="分页 Pagination" />
      <DemoTableWrapper>
        <DataTable
          data={tableData}
          variant="plain"
          cellRenderers={cellRenderers}
          readOnly
        />
      </DemoTableWrapper>
    </div>
  )
}