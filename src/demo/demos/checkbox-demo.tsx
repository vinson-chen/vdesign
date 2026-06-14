import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, DemoTableWrapper } from "./shared"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["checkbox", slot, size].join("-")
}

function getDisplaySize(size: string): string {
  return size.toLowerCase()
}

// ============================================
// 自定义单元格渲染器
// ============================================

const sizeTextClass = {
  base: "text-sm text-black-85",
  sm: "text-xs text-black-85",
  lg: "text-base text-black-85",
}

// 横向组合 Checkbox 渲染器（3个选项横向排列）
function CheckboxHorizontalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [checked, setChecked] = React.useState({ opt1: false, opt2: true, opt3: false })
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
      <Checkbox
        size={size}
        checked={checked.opt1}
        onChange={(v) => setChecked({ ...checked, opt1: v })}
      >
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项一</span>
      </Checkbox>
      <Checkbox
        size={size}
        checked={checked.opt2}
        onChange={(v) => setChecked({ ...checked, opt2: v })}
      >
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项二</span>
      </Checkbox>
      <Checkbox
        size={size}
        checked={checked.opt3}
        disabled
        onChange={(v) => setChecked({ ...checked, opt3: v })}
      >
        <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项三</span>
      </Checkbox>
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

// 纵向组合 Checkbox 渲染器（3个选项纵向排列）
function CheckboxVerticalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [checked, setChecked] = React.useState({ opt1: false, opt2: true, opt3: false })
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
        <Checkbox
          size={size}
          checked={checked.opt1}
          onChange={(v) => setChecked({ ...checked, opt1: v })}
        >
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项一</span>
        </Checkbox>
        <Checkbox
          size={size}
          checked={checked.opt2}
          onChange={(v) => setChecked({ ...checked, opt2: v })}
        >
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项二</span>
        </Checkbox>
        <Checkbox
          size={size}
          checked={checked.opt3}
          disabled
          onChange={(v) => setChecked({ ...checked, opt3: v })}
        >
          <span className={cn(sizeTextClass[size], "whitespace-nowrap")}>选项三</span>
        </Checkbox>
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

interface SlotConfig {
  name: string
  renderer: string
  props: Record<string, unknown>
}

const slotConfigs: SlotConfig[] = [
  { name: "horizontal", renderer: "checkboxHorizontalGroup", props: {} },
  { name: "vertical", renderer: "checkboxVerticalGroup", props: {} },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "horizontal", type: "checkboxHorizontalGroup" as const, title: "横向组合", width: 350 },
    { id: "vertical", type: "checkboxVerticalGroup" as const, title: "纵向组合", width: 200 },
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
          type: slot.renderer as "checkboxHorizontalGroup" | "checkboxVerticalGroup",
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

export function CheckboxPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      checkboxHorizontalGroup: CheckboxHorizontalGroupRenderer,
      checkboxVerticalGroup: CheckboxVerticalGroupRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="多选 Checkbox" />
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