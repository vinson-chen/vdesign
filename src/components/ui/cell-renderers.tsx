import * as React from "react"
import type { CellRendererProps, SelectOptionItem } from "@/types/table"
import { Button } from "./button"
import { Input } from "./input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"
import { SelectEditable } from "./select-editable"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"

// 截断文本组件：检测文本是否被截断，若截断则悬停显示 Tooltip
function TruncatedText({ children, className, onDoubleClick }: { children: string; className?: string; onDoubleClick?: () => void }) {
  const textRef = React.useRef<HTMLSpanElement>(null)
  const [isTruncated, setIsTruncated] = React.useState(false)

  React.useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth)
    }
  }, [children])

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            ref={textRef}
            className={className}
            onDoubleClick={onDoubleClick}
          >
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent side="top" size="base">
          <p>{children}</p>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <span
      ref={textRef}
      className={className}
      onDoubleClick={onDoubleClick}
    >
      {children}
    </span>
  )
}

// 文本单元格渲染器
function TextCellRenderer({ value, cellId, isEditing, onStartEdit, editingValue, onUpdateEditingValue, onFinishEdit, onCancelEdit, readOnly }: CellRendererProps) {
  if (isEditing) {
    return (
      <input
        type="text"
        value={editingValue ?? ""}
        onChange={(e) => onUpdateEditingValue?.(e.target.value)}
        onBlur={() => onFinishEdit?.()}
        onKeyDown={(e) => {
          // Enter 和 Escape 由全局键盘监听器统一处理
          if (e.key === "Enter") e.preventDefault()
          if (e.key === "Escape") e.preventDefault()
        }}
        onFocus={(e) => e.target.select()}
        className="absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden"
        autoFocus
      />
    )
  }

  return (
    <TruncatedText
      className="flex-1 w-full min-h-6 cursor-pointer truncate"
      onDoubleClick={readOnly ? undefined : () => onStartEdit?.()}
    >
      {String(value) || " "}
    </TruncatedText>
  )
}

// 输入框单元格渲染器
function InputCellRenderer({ value, options, onChange, cellId, isCellHovering }: CellRendererProps) {
  const [localValue, setLocalValue] = React.useState(String(value))
  const placeholder = (options?.placeholder as string) || "请输入"
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
    onChange?.(e.target.value)
  }

  // 当单元格被锁定且用户按键时，外部会调用 inputRef.current.focus()
  // 这里我们暴露一个方法让外部能聚焦到 input
  React.useEffect(() => {
    if (isCellHovering && inputRef.current) {
      // 可以在这里添加额外的聚焦逻辑
    }
  }, [isCellHovering])

  return (
    <div className="min-w-0 flex-1" data-input-cell={cellId}>
      <Input
        ref={inputRef}
        className="w-full"
        placeholder={placeholder}
        variant="basic"
        size="base"
        value={localValue}
        onChange={handleChange}
      />
    </div>
  )
}

// 下拉选择单元格渲染器（旧版，保留兼容）
function SelectCellRenderer({ value, options }: CellRendererProps) {
  const items = (options?.items as SelectOptionItem[]) ?? []
  const placeholder = (options?.placeholder as string) || "请选择"

  return (
    <div className="min-w-0 flex-1">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={String(value) || placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

// 可编辑下拉选择单元格渲染器（新版，支持添加选项）
function SelectEditableCellRenderer({ value, options, onChange, onUpdateColumnOptions }: CellRendererProps) {
  const items = (options?.items as SelectOptionItem[]) ?? []
  const placeholder = (options?.placeholder as string) || "请选择"

  // 将 SelectOptionItem 转换为 SelectEditableItem 格式
  const editableItems = items.map(item => ({
    value: item.value,
    label: item.label,
    disabled: item.disabled,
  }))

  // 处理选项变更：同步更新列配置
  const handleItemsChange = (newItems: { value: string; label: string; disabled?: boolean }[]) => {
    const selectOptionItems: SelectOptionItem[] = newItems.map(item => ({
      value: item.value,
      label: item.label,
      disabled: item.disabled,
    }))
    onUpdateColumnOptions?.({ ...options, items: selectOptionItems })
  }

  return (
    <div className="min-w-0 flex-1">
      <SelectEditable
        value={String(value)}
        onValueChange={onChange}
        items={editableItems}
        onItemsChange={handleItemsChange}
        placeholder={placeholder}
      />
    </div>
  )
}

// 按钮单元格渲染器
function ButtonCellRenderer({ value, options }: CellRendererProps) {
  const variant = (options?.variant as "ghost" | "link" | "outline") ?? "outline"
  const label = (options?.label as string) || String(value) || "按钮"

  return (
    <Button variant={variant} size="base">
      {label}
    </Button>
  )
}

// 图标单元格渲染器
function IconCellRenderer({ value, options }: CellRendererProps) {
  const iconName = (options?.iconName as string) || String(value)

  return (
    <Button variant="ghost" size="iconBase" leftIcon={iconName} />
  )
}

// 默认渲染器注册表
const defaultCellRenderers: Record<string, React.ComponentType<CellRendererProps>> = {
  text: TextCellRenderer,
  input: InputCellRenderer,
  select: SelectEditableCellRenderer, // 使用新版可编辑渲染器
  button: ButtonCellRenderer,
  icon: IconCellRenderer,
}

export {
  TextCellRenderer,
  InputCellRenderer,
  SelectCellRenderer,
  SelectEditableCellRenderer,
  ButtonCellRenderer,
  IconCellRenderer,
  defaultCellRenderers,
}
