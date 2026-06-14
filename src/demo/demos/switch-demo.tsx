import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionTitle, DemoTableWrapper } from "./shared"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["switch", slot, size].join("-")
}

function getDisplaySize(size: string): string {
  return size.toLowerCase()
}

// ============================================
// 自定义单元格渲染器
// ============================================

// Switch 渲染器
function SwitchCellRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [checked, setChecked] = React.useState((options?.checked as boolean) ?? false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const disabled = (options?.disabled as boolean) ?? false

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
      <Switch size={size} checked={checked} disabled={disabled} onChange={setChecked} />
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
  { name: "unchecked", renderer: "switchCell", props: { checked: false } },
  { name: "checked", renderer: "switchCell", props: { checked: true } },
  { name: "disabledUnchecked", renderer: "switchCell", props: { checked: false, disabled: true } },
  { name: "disabledChecked", renderer: "switchCell", props: { checked: true, disabled: true } },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "unchecked", type: "switchCell" as const, title: "unchecked", width: 200 },
    { id: "checked", type: "switchCell" as const, title: "checked", width: 200 },
    { id: "disabledUnchecked", type: "switchCell" as const, title: "disabled unchecked", width: 200 },
    { id: "disabledChecked", type: "switchCell" as const, title: "disabled checked", width: 200 },
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
          type: slot.renderer as "switchCell",
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

export function SwitchPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      switchCell: SwitchCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="开关 Switch" />
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