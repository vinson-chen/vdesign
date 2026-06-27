import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, getDisplaySize } from "./shared"
import type { SlotConfig } from "./shared"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(variant: string, size: string): string {
  const sizeParts = size.replace(/([A-Z])/g, "-$1").toLowerCase().split("-").filter(Boolean)
  return ["input", variant, ...sizeParts].join("-")
}

// ============================================
// 自定义单元格渲染器：输入框，悬停显示复制按钮
// ============================================

function InputCellRenderer({ value, options, isCellHovering }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const variant = (options?.variant as "basic" | "invalid" | "disabled") || "basic"
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const leftIcon = (options?.leftIcon as string) || undefined
  const rightIcon = (options?.rightIcon as string) || undefined
  const placeholder = (options?.placeholder as string) || "请输入"

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

  const showCopy = true

  return (
    <div className="flex items-center w-full h-full">
      <Input
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        placeholder={placeholder}
        className="flex-1 min-w-0"
      />
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

interface VariantConfig {
  name: "basic" | "invalid" | "disabled"
}

const variantConfigs: VariantConfig[] = [
  { name: "basic" },
  { name: "invalid" },
  { name: "disabled" },
]

const slotConfigs: SlotConfig[] = [
  { name: "basic", props: {} },
  { name: "iconLeft", props: { variant: "basic", leftIcon: "icon-search" } },
  { name: "iconRight", props: { variant: "basic", rightIcon: "icon-link" } },
  { name: "invalid", props: {} },
  { name: "disabled", props: {} },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "basic", type: "text" as const, title: "basic", width: 200 },
    { id: "iconLeft", type: "text" as const, title: "iconLeft", width: 200 },
    { id: "iconRight", type: "text" as const, title: "iconRight", width: 200 },
    { id: "invalid", type: "text" as const, title: "invalid", width: 200 },
    { id: "disabled", type: "text" as const, title: "disabled", width: 200 },
  ]

  const rows = sizeConfigs.map((size) => {
    const displaySize = getDisplaySize(size)
    return {
      id: `row-${size}`,
      cells: [
        { id: `cb-${size}`, value: false },
        { id: `c-size-${size}`, value: displaySize },
        ...slotConfigs.map((slot) => ({
          id: `c-${slot.name}-${size}`,
          value: ontoName(slot.name, size),
          type: "input" as const,
          options: {
            variant: slot.name as "basic" | "invalid" | "disabled",
            size,
            ...slot.props,
          },
        })),
      ],
    }
  })

  // 按"尺寸"分组
  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function InputPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      input: InputCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="输入 Input" />
              <DataTable
          data={tableData}
          variant="base" contained
          cellRenderers={cellRenderers}
          readOnly
        />
          </div>
  )
}