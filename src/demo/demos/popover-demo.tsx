import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverMenuItem,
  PopoverCheckboxItem,
  PopoverRadioGroup,
  PopoverRadioItem,
  PopoverLabel,
  PopoverSeparator,
  PopoverSub,
  PopoverSubTrigger,
  PopoverSubContent,
} from "@/components/ui/popover"
import { PopoverEditContent } from "@/components/ui/popover-edit-content"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, DemoTableWrapper, getDisplaySize } from "./shared"
import type { SlotConfig } from "./shared"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["popover", slot, size].join("-")
}
// ============================================
// 自定义单元格渲染器
// ============================================

// 基础菜单渲染器
function PopoverBasicRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
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

  return (
    <div className="flex items-center w-full h-full">
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} noShift>
            打开菜单
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverMenuItem closeOnClick>选项一</PopoverMenuItem>
          <PopoverMenuItem closeOnClick>选项二</PopoverMenuItem>
          <PopoverMenuItem closeOnClick>选项三</PopoverMenuItem>
        </PopoverContent>
      </Popover>
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

// 带图标菜单渲染器
function PopoverIconRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
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

  const widthClass = size === "sm" ? "w-[140px]" : size === "lg" ? "w-[180px]" : "w-[160px]"

  return (
    <div className="flex items-center w-full h-full">
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} rightIcon="icon-chevron-down" noShift>
            更多操作
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <PopoverMenuItem closeOnClick className="gap-2">
            <svg className="size-4" style={{ fill: "currentColor" }}><use xlinkHref="#icon-edit" /></svg>
            编辑
          </PopoverMenuItem>
          <PopoverMenuItem closeOnClick className="gap-2">
            <svg className="size-4" style={{ fill: "currentColor" }}><use xlinkHref="#icon-copy" /></svg>
            复制
          </PopoverMenuItem>
          <PopoverMenuItem closeOnClick className="gap-2">
            <svg className="size-4" style={{ fill: "currentColor" }}><use xlinkHref="#icon-delete" /></svg>
            删除
          </PopoverMenuItem>
        </PopoverContent>
      </Popover>
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

// 多选菜单渲染器
function PopoverCheckboxRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [checkboxItems, setCheckboxItems] = React.useState({ option1: true, option2: false, option3: false })
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const widthClass = size === "sm" ? "w-[140px]" : size === "lg" ? "w-[180px]" : "w-[160px]"

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
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} noShift>
            多选选项
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <PopoverCheckboxItem checked={checkboxItems.option1} onCheckedChange={(c: boolean) => setCheckboxItems({ ...checkboxItems, option1: c })}>
            显示名称
          </PopoverCheckboxItem>
          <PopoverCheckboxItem checked={checkboxItems.option2} onCheckedChange={(c: boolean) => setCheckboxItems({ ...checkboxItems, option2: c })}>
            显示图标
          </PopoverCheckboxItem>
          <PopoverCheckboxItem checked={checkboxItems.option3} onCheckedChange={(c: boolean) => setCheckboxItems({ ...checkboxItems, option3: c })}>
            显示描述
          </PopoverCheckboxItem>
        </PopoverContent>
      </Popover>
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

// 单选菜单渲染器
function PopoverRadioRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [radioValue, setRadioValue] = React.useState("option1")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const widthClass = size === "sm" ? "w-[140px]" : size === "lg" ? "w-[180px]" : "w-[160px]"

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
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} noShift>
            单选选项
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <PopoverRadioGroup value={radioValue} onValueChange={setRadioValue}>
            <PopoverRadioItem value="option1">选项一</PopoverRadioItem>
            <PopoverRadioItem value="option2">选项二</PopoverRadioItem>
            <PopoverRadioItem value="option3">选项三</PopoverRadioItem>
          </PopoverRadioGroup>
        </PopoverContent>
      </Popover>
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

// 子菜单渲染器
function PopoverSubmenuRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [editView, setEditView] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const widthClass = size === "sm" ? "w-[140px]" : size === "lg" ? "w-[180px]" : "w-[160px]"
  const editFields = [
    { label: "姓名", type: "input" as const, defaultValue: "张三", placeholder: "请输入姓名" },
    { label: "用户名", type: "input" as const, defaultValue: "@zhangsan", placeholder: "请输入用户名" },
    { label: "邮箱", type: "input" as const, defaultValue: "zhangsan@example.com", placeholder: "请输入邮箱" },
  ]

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
      <Popover size={size} onOpenChange={(open) => !open && setEditView(false)}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} noShift>
            更多选项
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <div className={editView ? "hidden" : ""}>
            <PopoverMenuItem onClick={() => setEditView(true)}>
              选项一
            </PopoverMenuItem>
            <PopoverSub>
              <PopoverSubTrigger>更多操作</PopoverSubTrigger>
              <PopoverSubContent>
                <PopoverMenuItem closeOnClick>保存</PopoverMenuItem>
                <PopoverMenuItem closeOnClick>另存为</PopoverMenuItem>
                <PopoverSeparator />
                <PopoverMenuItem closeOnClick>导出</PopoverMenuItem>
              </PopoverSubContent>
            </PopoverSub>
          </div>
          <div className={editView ? "" : "hidden"}>
            <PopoverEditContent fields={editFields} />
            <PopoverSeparator />
            <div className="flex gap-2 py-1.5 px-2">
              <Button variant="outline" size={size} className="flex-1">取消</Button>
              <Button variant="primary" size={size} className="flex-1">保存</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
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

// 组合菜单渲染器
function PopoverCombinedRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [checkboxItems, setCheckboxItems] = React.useState({ option1: true, option2: false })
  const [radioValue, setRadioValue] = React.useState("option1")
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const widthClass = size === "sm" ? "w-[140px]" : size === "lg" ? "w-[180px]" : "w-[160px]"

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
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} rightIcon="icon-chevron-down" noShift>
            设置
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <PopoverLabel>显示设置</PopoverLabel>
          <PopoverCheckboxItem checked={checkboxItems.option1} onCheckedChange={(c: boolean) => setCheckboxItems({ ...checkboxItems, option1: c })}>
            显示工具栏
          </PopoverCheckboxItem>
          <PopoverCheckboxItem checked={checkboxItems.option2} onCheckedChange={(c: boolean) => setCheckboxItems({ ...checkboxItems, option2: c })}>
            显示状态栏
          </PopoverCheckboxItem>
          <PopoverSeparator />
          <PopoverLabel>主题</PopoverLabel>
          <PopoverRadioGroup value={radioValue} onValueChange={setRadioValue}>
            <PopoverRadioItem value="option1">浅色</PopoverRadioItem>
            <PopoverRadioItem value="option2">深色</PopoverRadioItem>
            <PopoverRadioItem value="option3">跟随系统</PopoverRadioItem>
          </PopoverRadioGroup>
        </PopoverContent>
      </Popover>
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

// 编辑菜单渲染器
function PopoverEditRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "sm" | "lg") || "base"
  const widthClass = size === "sm" ? "w-[180px]" : size === "lg" ? "w-[220px]" : "w-[200px]"
  const editFields = [
    { label: "姓名", type: "input" as const, defaultValue: "张三", placeholder: "请输入姓名" },
    { label: "用户名", type: "input" as const, defaultValue: "@zhangsan", placeholder: "请输入用户名" },
    { label: "邮箱", type: "input" as const, defaultValue: "zhangsan@example.com", placeholder: "请输入邮箱" },
  ]

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
      <Popover size={size}>
        <PopoverTrigger asChild>
          <Button variant="outline" size={size} rightIcon="icon-chevron-down" noShift>
            编辑资料
          </Button>
        </PopoverTrigger>
        <PopoverContent className={widthClass}>
          <PopoverEditContent fields={editFields} />
          <PopoverSeparator />
          <div className="flex gap-2 py-1.5 px-2">
            <Button variant="outline" size={size} className="flex-1">取消</Button>
            <Button variant="primary" size={size} className="flex-1">保存</Button>
          </div>
        </PopoverContent>
      </Popover>
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


const slotConfigs: SlotConfig[] = [
  { name: "basic", renderer: "popoverBasic", props: {} },
  { name: "icon", renderer: "popoverIcon", props: {} },
  { name: "popoverCheckbox", renderer: "popoverCheckbox", props: {} },
  { name: "radio", renderer: "popoverRadio", props: {} },
  { name: "submenu", renderer: "popoverSubmenu", props: {} },
  { name: "combined", renderer: "popoverCombined", props: {} },
  { name: "edit", renderer: "popoverEdit", props: {} },
]

const sizeConfigs = ["base", "sm", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "basic", type: "reference" as const, title: "基础", width: 200 },
    { id: "icon", type: "reference" as const, title: "带图标", width: 200 },
    { id: "popoverCheckbox", type: "reference" as const, title: "多选", width: 200 },
    { id: "radio", type: "reference" as const, title: "单选", width: 200 },
    { id: "submenu", type: "reference" as const, title: "子菜单", width: 200 },
    { id: "combined", type: "reference" as const, title: "组合", width: 200 },
    { id: "edit", type: "reference" as const, title: "编辑", width: 200 },
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
          type: slot.renderer as "popoverBasic" | "popoverIcon" | "popoverCheckbox" | "popoverRadio" | "popoverSubmenu" | "popoverCombined" | "popoverEdit",
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

export function PopoverPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      popoverBasic: PopoverBasicRenderer,
      popoverIcon: PopoverIconRenderer,
      popoverCheckbox: PopoverCheckboxRenderer,
      popoverRadio: PopoverRadioRenderer,
      popoverSubmenu: PopoverSubmenuRenderer,
      popoverCombined: PopoverCombinedRenderer,
      popoverEdit: PopoverEditRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="面板 Popover" />
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
