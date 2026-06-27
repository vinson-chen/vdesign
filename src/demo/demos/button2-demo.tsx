import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { defaultCellRenderers } from "@/components/ui/cell-renderers"
import type { CellRendererProps, TableData } from "@/types/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionTitle } from "./shared"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(variant: string, size: string): string {
  const sizeParts = size
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .split("-")
    .filter(Boolean)
  return ["button", variant, ...sizeParts].join("-")
}

function getDisplaySize(size: string): string {
  return size.replace(/^icon/, "").toLowerCase()
}

// ============================================
// 自定义单元格渲染器：演示按钮，悬停显示复制按钮
// ============================================

function DemoButtonCellRenderer({ value, options, isCellHovering }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const variant = (options?.variant as string) || "primary"
  const size = (options?.size as string) || "base"
  const leftIcon = (options?.leftIcon as string) || undefined
  const rightIcon = (options?.rightIcon as string) || undefined
  const label = (options?.label as string) || undefined
  const disabled = (options?.disabled as boolean) || false

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
      <Button
        variant={variant}
        size={size}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        disabled={disabled}
        className={cn(disabled && leftIcon === "icon-load" && "[&_svg:first-child]:animate-spin")}
      >
        {label}
      </Button>
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
  name: string
  sizes: string[]
  iconSizes: string[]
}

const variantConfigs: VariantConfig[] = [
  { name: "primary", sizes: ["base", "sm", "lg"], iconSizes: ["iconBase", "iconSm", "iconLg"] },
  { name: "outline", sizes: ["base", "sm", "lg"], iconSizes: ["iconBase", "iconSm", "iconLg"] },
  { name: "ghost", sizes: ["base", "sm", "lg"], iconSizes: ["iconBase", "iconSm", "iconLg"] },
  { name: "destructive", sizes: ["base", "sm", "lg"], iconSizes: ["iconBase", "iconSm", "iconLg"] },
  { name: "link", sizes: ["base", "sm", "lg"], iconSizes: ["iconBase", "iconSm", "iconLg"] },
]

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "text", type: "text" as const, title: "text", width: 200 },
    { id: "leftIcon", type: "text" as const, title: "leftIcon", width: 200 },
    { id: "rightIcon", type: "text" as const, title: "rightIcon", width: 200 },
    { id: "icon", type: "text" as const, title: "icon", width: 200 },
    { id: "disabled", type: "text" as const, title: "disabled", width: 200 },
  ]

  const rows = variantConfigs.flatMap((v) =>
    v.sizes.map((size, i) => {
      const iconSize = v.iconSizes[i]
      const displaySize = getDisplaySize(size)
      const baseName = ontoName(v.name, size)
      const iconName = ontoName(v.name, iconSize)

      return {
        id: `row-${v.name}-${size}`,
        cells: [
          { id: `cb-${v.name}-${size}`, value: false },
          { id: `c-size-${v.name}-${size}`, value: displaySize },
          {
            id: `c-text-${v.name}-${size}`,
            value: baseName,
            type: "link" as const,
            options: { variant: v.name, size, label: "按钮" },
          },
          {
            id: `c-left-${v.name}-${size}`,
            value: `${baseName}-left-icon`,
            type: "link" as const,
            options: { variant: v.name, size, leftIcon: "icon-link", label: "按钮" },
          },
          {
            id: `c-right-${v.name}-${size}`,
            value: `${baseName}-right-icon`,
            type: "link" as const,
            options: { variant: v.name, size, rightIcon: "icon-chevron-down", label: "按钮" },
          },
          {
            id: `c-icon-${v.name}-${size}`,
            value: iconName,
            type: "link" as const,
            options: { variant: v.name, size: iconSize, leftIcon: "icon-link" },
          },
          {
            id: `c-disabled-${v.name}-${size}`,
            value: `${baseName}-disabled`,
            type: "link" as const,
            options: { variant: v.name, size, label: "按钮", disabled: true, leftIcon: "icon-load" },
          },
        ],
      }
    })
  )

  // 按"尺寸"分组
  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function ButtonPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      ...defaultCellRenderers,
      link: DemoButtonCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="按钮 Button" />
              <DataTable
          data={tableData}
          variant="base" contained
          cellRenderers={cellRenderers}
          readOnly
        />
          </div>
  )
}
