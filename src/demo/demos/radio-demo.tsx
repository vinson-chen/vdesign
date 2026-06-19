import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Radio } from "@/components/ui/radio"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, DemoTableWrapper, getDisplaySize } from "./shared"
import type { SlotConfig } from "./shared"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["radio", slot, size].join("-")
}
// ============================================
// 自定义单元格渲染器
// ============================================

const sizeTextClass = {
  base: "text-sm text-black-85",
  sm: "text-xs text-black-85",
  lg: "text-base text-black-85",
}

// 横向组合 Radio 渲染器（3个选项横向排列）
function RadioHorizontalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [selected, setSelected] = React.useState(1)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"

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

  const gapClass = size === "sm" ? "gap-3" : size === "lg" ? "gap-5" : "gap-4"

  return (
    <div className={cn("flex items-center w-full h-full", gapClass)}>
      <Radio size={size} checked={selected === 0} onChange={() => setSelected(0)}>
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项一</span>
      </Radio>
      <Radio size={size} checked={selected === 1} onChange={() => setSelected(1)}>
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项二</span>
      </Radio>
      <Radio size={size} checked={selected === 2} disabled>
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项三</span>
      </Radio>
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

// 纵向组合 Radio 渲染器（3个选项纵向排列）
function RadioVerticalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [selected, setSelected] = React.useState(1)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"

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

  const gapClass = size === "sm" ? "gap-2" : size === "lg" ? "gap-4" : "gap-3"

  return (
    <div className="flex items-center w-full h-full">
      <div className={cn("flex flex-col flex-1", gapClass)}>
        <Radio size={size} checked={selected === 0} onChange={() => setSelected(0)}>
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项一</span>
        </Radio>
        <Radio size={size} checked={selected === 1} onChange={() => setSelected(1)}>
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项二</span>
        </Radio>
        <Radio size={size} checked={selected === 2} disabled>
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项三</span>
        </Radio>
      </div>
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


const slotConfigs: SlotConfig[] = [
  { name: "horizontal", renderer: "radioHorizontalGroup", props: {} },
  { name: "vertical", renderer: "radioVerticalGroup", props: {} },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "horizontal", type: "reference" as const, title: "横向组合", width: 350 },
    { id: "vertical", type: "reference" as const, title: "纵向组合", width: 200 },
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
          type: slot.renderer as "radioHorizontalGroup" | "radioVerticalGroup",
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

export function RadioPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      radioHorizontalGroup: RadioHorizontalGroupRenderer,
      radioVerticalGroup: RadioVerticalGroupRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="单选 Radio" />
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