import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { defaultCellRenderers } from "@/components/ui/cell-renderers"
import type { CellRendererProps, TableData } from "@/types/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionTitle } from "./shared"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(size: string, composition: string): string {
  return `card-${size}-${composition}`
}

// ============================================
// 尺寸配置
// ============================================

interface SizeConfig {
  id: string
  label: string
  headerClass: string
  footerLabelClass: string
}

const sizeConfigs: SizeConfig[] = [
  {
    id: "base",
    label: "base",
    headerClass: "text-sm leading-6 font-medium",
    footerLabelClass: "text-sm leading-6",
  },
  {
    id: "sm",
    label: "sm",
    headerClass: "text-xs leading-5 font-medium",
    footerLabelClass: "text-xs leading-5",
  },
  {
    id: "lg",
    label: "lg",
    headerClass: "text-base leading-6 font-medium",
    footerLabelClass: "text-base leading-6",
  },
]

// ============================================
// 自定义单元格渲染器：渲染卡片，悬停显示复制按钮
// ============================================

function DemoCardCellRenderer({
  value,
  options,
}: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const composition = (options?.composition as string) || "content"
  const sizeId = (options?.sizeId as string) || "base"
  const config = sizeConfigs.find((s) => s.id === sizeId) || sizeConfigs[1]

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
    <div className="flex items-center w-full h-full gap-1">
      <Card className="flex-1 min-w-0" size={sizeId}>
        {(composition === "header-content" || composition === "full") && (
          <CardHeader>
            <p className={cn("text-black-85", config.headerClass)}>标题</p>
          </CardHeader>
        )}
        <CardContent>
          <div className="h-7 rounded flex items-center justify-center">
            <span className="text-[11px] text-neutral-4">示例内容</span>
          </div>
        </CardContent>
        {(composition === "content-footer" || composition === "full") && (
          <CardFooter>
            <span className={cn("text-black-85", config.footerLabelClass)}>
              card-label
            </span>
          </CardFooter>
        )}
      </Card>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon={copied ? "icon-check" : "icon-copy"}
            onClick={handleCopy}
            className={cn(
              "shrink-0",
              copied ? "text-success-5" : "text-black-55"
            )}
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

const compositions = [
  { id: "content", label: "仅内容" },
  { id: "header-content", label: "含 Header" },
  { id: "content-footer", label: "含 Footer" },
  { id: "full", label: "完整组合" },
]

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 80 },
    ...compositions.map((c) => ({
      id: c.id,
      type: "text" as const,
      title: c.label,
      width: c.id === "full" ? 260 : 220,
    })),
  ]

  const rows = sizeConfigs.map((size) => ({
    id: `row-${size.id}`,
    cells: [
      { id: `cb-${size.id}`, value: false },
      { id: `sz-${size.id}`, value: size.label },
      ...compositions.map((c) => ({
        id: `c-${size.id}-${c.id}`,
        value: ontoName(size.id, c.id),
        type: "link" as const,
        options: { sizeId: size.id, composition: c.id },
      })),
    ],
  }))

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function CardPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      ...defaultCellRenderers,
      link: DemoCardCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="卡片 Card" />
      <DataTable
        data={tableData}
        variant="base"
        contained
        cellRenderers={cellRenderers}
        readOnly
      />
    </div>
  )
}
