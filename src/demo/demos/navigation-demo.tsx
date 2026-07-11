import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, getDisplaySize } from "./shared"
import type { SlotConfig } from "./shared"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["navigationitem", slot, size].join("-")
}
// ============================================
// 自定义单元格渲染器
// ============================================

// 横向组合 NavigationItem 渲染器（3个选项横向排列）
function NavItemHorizontalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [selected, setSelected] = React.useState(0)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"

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
    <div className="flex items-center w-full h-full gap-2">
      <NavigationItem
        variant={selected === 0 ? "selected" : "basic"}
        size={size}
        onClick={() => setSelected(0)}
      >
        选项一
      </NavigationItem>
      <NavigationItem
        variant={selected === 1 ? "selected" : "basic"}
        size={size}
        onClick={() => setSelected(1)}
      >
        选项二
      </NavigationItem>
      <NavigationItem
        variant={selected === 2 ? "selected" : "basic"}
        size={size}
        onClick={() => setSelected(2)}
      >
        选项三
      </NavigationItem>
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

// 纵向组合 NavigationItem 渲染器（3个选项纵向排列）
function NavItemVerticalGroupRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const [selected, setSelected] = React.useState(0)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"

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
      <div className="flex flex-col flex-1 gap-1 py-2">
        <NavigationItem
          variant={selected === 0 ? "selected" : "basic"}
          size={size}
          onClick={() => setSelected(0)}
        >
          选项一
        </NavigationItem>
        <NavigationItem
          variant={selected === 1 ? "selected" : "basic"}
          size={size}
          onClick={() => setSelected(1)}
        >
          选项二
        </NavigationItem>
        <NavigationItem
          variant={selected === 2 ? "selected" : "basic"}
          size={size}
          onClick={() => setSelected(2)}
        >
          选项三
        </NavigationItem>
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

// 可编辑组合 NavigationItem 渲染器（支持添加/删除选项）
function NavItemEditableGroupRenderer({ value, options }: CellRendererProps) {
  const [navItems, setNavItems] = React.useState(['选项一', '选项二', '选项三'])
  const [selected, setSelected] = React.useState(0)
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
  const [editValue, setEditValue] = React.useState('')
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"
  const prClass = { base: "pr-1", lg: "pr-2" }[size]
  const addIconSize = { base: "iconBase", lg: "iconLg" }[size] as "iconBase" | "iconLg"
  const textClass = { base: "text-sm leading-6", lg: "text-base leading-6" }[size]

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

  // 聚焦并选中输入框文字
  React.useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingIndex])

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setNavItems((prev) => {
      const newIndex = prev.length
      setSelected(newIndex)
      setEditingIndex(newIndex)
      setEditValue('未命名选项')
      return [...prev, '未命名选项']
    })
  }

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setNavItems((prev) => {
      const next = prev.filter((_, i) => i !== index)
      if (index === selected) {
        setSelected(Math.min(index, next.length - 1))
      } else if (index < selected) {
        setSelected(selected - 1)
      }
      return next
    })
  }

  const handleDoubleClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setEditingIndex(index)
    setEditValue(navItems[index])
  }

  const commitEdit = () => {
    if (editingIndex === null) return
    setNavItems((prev) =>
      prev.map((item, i) => (i === editingIndex ? editValue || item : item))
    )
    setEditingIndex(null)
  }

  const cancelEdit = () => {
    setEditingIndex(null)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commitEdit()
    } else if (e.key === 'Escape') {
      cancelEdit()
    }
  }

  return (
    <div className="flex items-center w-full h-full gap-2">
      {/* 选项列表 */}
      {navItems.map((label, i) => (
        <NavigationItem
          key={i}
          variant={selected === i ? "selected" : "basic"}
          size={size}
          onClick={() => setSelected(i)}
          onDoubleClick={(e) => handleDoubleClick(e, i)}
          className={cn("shrink-0 group", prClass)}
        >
          {editingIndex === i ? (
            <span className="relative inline-flex items-center">
              <span className={cn("invisible", textClass)}>
                {editValue || ' '}
              </span>
              <Input
                ref={inputRef}
                size={size}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleEditKeyDown}
                onBlur={commitEdit}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "absolute inset-0 border-0 bg-transparent p-0 h-auto rounded-none shadow-none focus:shadow-none",
                  textClass
                )}
              />
            </span>
          ) : (
            label
          )}
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-close"
            onClick={(e) => handleRemove(e, i)}
            className={cn(
              "shrink-0 text-black-55",
              selected !== i && "invisible group-hover:visible"
            )}
          />
        </NavigationItem>
      ))}
      {/* 添加按钮（始终显示在末尾） */}
      <Button
        variant="ghost"
        size={addIconSize}
        leftIcon="icon-add"
        onClick={handleAdd}
        className="shrink-0 text-black-55"
      />
      {/* 复制按钮 */}
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
  { name: "horizontal", renderer: "navItemHorizontalGroup", props: {} },
  { name: "vertical", renderer: "navItemVerticalGroup", props: {} },
  { name: "editable", renderer: "navItemEditableGroup", props: {} },
]

const sizeConfigs = ["base", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "horizontal", type: "text" as const, title: "横向组合", width: 300 },
    { id: "vertical", type: "text" as const, title: "纵向组合", width: 200 },
    { id: "editable", type: "text" as const, title: "可编辑组合", width: 340 },
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
          type: slot.renderer as "navItemHorizontalGroup" | "navItemVerticalGroup" | "navItemEditableGroup",
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

export function NavigationPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      navItemHorizontalGroup: NavItemHorizontalGroupRenderer,
      navItemVerticalGroup: NavItemVerticalGroupRenderer,
      navItemEditableGroup: NavItemEditableGroupRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="导航 NavigationItem" />
              <DataTable
          data={tableData}
          variant="base" contained
          cellRenderers={cellRenderers}
          readOnly
        />
          </div>
  )
}