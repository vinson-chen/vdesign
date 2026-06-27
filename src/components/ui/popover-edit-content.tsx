import * as React from "react"
import { PopoverLabel, PopoverContext } from "./popover"
import { Input } from "./input"
import { Button } from "./button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"
import type { CellType, SelectOptionItem, TextFieldItem } from "@/types/table"

interface EditField {
  label: string
  type: "input" | "select" | "content"
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  selectOnFocus?: boolean
  options?: { value: string; label: string }[] // for select
  // content 类型专属
  contentType?: CellType
  selectOptions?: SelectOptionItem[]
  onSelectOptionsChange?: (options: SelectOptionItem[]) => void
  textFields?: TextFieldItem[]
  onTextFieldsChange?: (fields: TextFieldItem[]) => void
}

interface PopoverEditContentProps {
  size?: "base" | "sm" | "lg"  // 可选，默认从 Context 获取
  fields: EditField[]
}

function PopoverEditContent({ size, fields }: PopoverEditContentProps) {
  // 从 PopoverContext 获取 size（如果未通过 prop 传递）
  const context = React.useContext(PopoverContext)
  const actualSize = size ?? context.size

  const paddingClass = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5",
  }[actualSize]

  const autoSelectedRef = React.useRef<Set<number>>(new Set())

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          {field.label && <PopoverLabel>{field.label}</PopoverLabel>}
          {field.type === "input" && (
            <div className={paddingClass}>
              <Input
                variant="basic"
                size={actualSize}
                value={field.value}
                defaultValue={field.defaultValue}
                onChange={(e) => field.onChange?.(e.target.value)}
                placeholder={field.placeholder}
                autoFocus={field.autoFocus}
                onFocus={field.selectOnFocus ? (e) => {
                  if (!autoSelectedRef.current.has(index)) {
                    autoSelectedRef.current.add(index)
                    ;(e.target as HTMLInputElement).select()
                  }
                } : undefined}
                className="w-full"
              />
            </div>
          )}
          {field.type === "select" && (
            <div className={paddingClass}>
              <Select value={field.value} onValueChange={field.onChange} size={actualSize}>
                <SelectTrigger variant="basic" className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {field.type === "content" && (
            <ContentField
              field={field}
              paddingClass={paddingClass}
              size={actualSize}
            />
          )}
        </React.Fragment>
      ))}
    </>
  )
}

// 内容配置字段（选择列选项配置 / 文本列字段配置）
function ContentField({ field, paddingClass }: {
  field: EditField
  paddingClass: string
  size: "base" | "sm" | "lg"
}) {
  // 根据列类型区分数据源
  const isText = field.contentType === "text"
  const isSelect = field.contentType === "select"
  if (!isText && !isSelect) return null

  // 统一用 items 数组操作
  const items: { key: string; label: string }[] = isSelect
    ? (field.selectOptions ?? []).map(o => ({ key: o.value, label: o.label }))
    : (field.textFields ?? []).map(f => ({ key: f.id, label: f.label }))

  const addLabel = isSelect ? "添加选项" : "添加字段"
  const placeholderLabel = isSelect ? "输入选项名称" : "输入字段名称"

  // 拖拽状态
  const [dragIndex, setDragIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  // 生成唯一 ID
  const generateId = () => `${isSelect ? "opt" : "fld"}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

  // 添加项：新项插入到列表头部，紧贴按钮下方
  const handleAdd = () => {
    const newItem = { key: generateId(), label: "" }
    if (isSelect) {
      field.onSelectOptionsChange?.([{ value: newItem.key, label: "" }, ...(field.selectOptions ?? [])])
    } else {
      field.onTextFieldsChange?.([{ id: newItem.key, label: "" }, ...(field.textFields ?? [])])
    }
  }

  // 删除项
  const handleRemove = (index: number) => {
    if (isSelect) {
      field.onSelectOptionsChange?.((field.selectOptions ?? []).filter((_, i) => i !== index))
    } else {
      field.onTextFieldsChange?.((field.textFields ?? []).filter((_, i) => i !== index))
    }
  }

  // 更新标签
  const handleUpdate = (index: number, newLabel: string) => {
    if (isSelect) {
      const newOptions = (field.selectOptions ?? []).map((opt, i) =>
        i === index ? { ...opt, label: newLabel } : opt
      )
      field.onSelectOptionsChange?.(newOptions)
    } else {
      const newFields = (field.textFields ?? []).map((f, i) =>
        i === index ? { ...f, label: newLabel } : f
      )
      field.onTextFieldsChange?.(newFields)
    }
  }

  // 拖拽排序
  const handleDragStart = (index: number) => setDragIndex(index)

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      if (isSelect) {
        const arr = [...(field.selectOptions ?? [])]
        const removed = arr[dragIndex]
        if (removed) {
          arr.splice(dragIndex, 1)
          arr.splice(dragOverIndex, 0, removed)
          field.onSelectOptionsChange?.(arr)
        }
      } else {
        const arr = [...(field.textFields ?? [])]
        const removed = arr[dragIndex]
        if (removed) {
          arr.splice(dragIndex, 1)
          arr.splice(dragOverIndex, 0, removed)
          field.onTextFieldsChange?.(arr)
        }
      }
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }

  return (
    <div className={paddingClass}>
      {/* 添加按钮 */}
      <Button
        variant="ghost"
        size="base"
        className="w-full justify-center text-black-55"
        leftIcon="icon-add"
        onClick={handleAdd}
      >
        {addLabel}
      </Button>

      {/* 项列表 */}
      {items.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-0.5">
          {items.map((item, itemIndex) => (
            <div
              key={item.key}
              draggable
              onDragStart={() => handleDragStart(itemIndex)}
              onDragOver={(e) => handleDragOver(e, itemIndex)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
                dragOverIndex === itemIndex && "bg-brand-1",
                dragIndex === itemIndex && "opacity-50"
              )}
            >
              {/* 拖拽手柄 */}
              <Button
                variant="ghost"
                size="iconSm"
                leftIcon="icon-move"
                className="shrink-0 cursor-grab text-black-55"
              />
              {/* 输入框 */}
              <Input
                variant="basic"
                size="base"
                value={item.label}
                onChange={(e) => handleUpdate(itemIndex, e.target.value)}
                className="flex-1 min-w-0"
                placeholder={placeholderLabel}
              />
              {/* 删除按钮 */}
              <Button
                variant="ghost"
                size="iconSm"
                leftIcon="icon-close"
                onClick={() => handleRemove(itemIndex)}
                className="shrink-0 text-black-55"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ")
}

export { PopoverEditContent }
export type { EditField }
