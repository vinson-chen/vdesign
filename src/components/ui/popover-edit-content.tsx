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
import type { CellType, SelectOptionItem } from "@/types/table"

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
  // content 类型专属（仅用于单选列选项配置）
  contentType?: CellType
  selectOptions?: SelectOptionItem[]
  onSelectOptionsChange?: (options: SelectOptionItem[]) => void
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

// 内容配置字段（仅用于单选列选项配置）
function ContentField({ field, paddingClass, size }: {
  field: EditField
  paddingClass: string
  size: "base" | "sm" | "lg"
}) {
  const selectOptions = field.selectOptions ?? []

  // 单选列选项拖拽状态
  const [dragIndex, setDragIndex] = React.useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = React.useState<number | null>(null)

  // 生成唯一 ID
  const generateOptionId = () => `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`

  // 添加选项：直接创建空选项组
  const handleAddOption = () => {
    const newOption: SelectOptionItem = {
      value: generateOptionId(),
      label: "",
    }
    field.onSelectOptionsChange?.([...selectOptions, newOption])
  }

  // 删除选项
  const handleRemoveOption = (index: number) => {
    const newOptions = selectOptions.filter((_, i) => i !== index)
    field.onSelectOptionsChange?.(newOptions)
  }

  // 更新选项标签
  const handleUpdateOption = (index: number, newLabel: string) => {
    const newOptions = selectOptions.map((opt, i) =>
      i === index ? { ...opt, label: newLabel } : opt
    )
    field.onSelectOptionsChange?.(newOptions)
  }

  // 拖拽排序
  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
      const newOptions = [...selectOptions]
      const [removed] = newOptions.splice(dragIndex, 1)
      newOptions.splice(dragOverIndex, 0, removed)
      field.onSelectOptionsChange?.(newOptions)
    }
    setDragIndex(null)
    setDragOverIndex(null)
  }

  // 只在单选列时显示
  if (field.contentType !== "select") return null

  return (
    <div className={paddingClass}>
      {/* 添加选项按钮 */}
      <Button
        variant="ghost"
        size="base"
        className="w-full justify-center text-black-55"
        leftIcon="icon-add"
        onClick={handleAddOption}
      >
        添加选项
      </Button>

      {/* 选项列表 */}
      {selectOptions.length > 0 && (
        <div className="mt-1.5 flex flex-col gap-0.5">
          {selectOptions.map((option, optIndex) => (
            <div
              key={option.value}
              draggable
              onDragStart={() => handleDragStart(optIndex)}
              onDragOver={(e) => handleDragOver(e, optIndex)}
              onDragEnd={handleDragEnd}
              className={cn(
                "flex items-center gap-1 rounded-sm px-0.5 py-0.5",
                dragOverIndex === optIndex && "bg-brand-1",
                dragIndex === optIndex && "opacity-50"
              )}
            >
              {/* 拖拽手柄 */}
              <Button
                variant="ghost"
                size="iconSm"
                leftIcon="icon-move"
                className="shrink-0 cursor-grab text-black-55"
              />
              {/* 选项输入框 */}
              <Input
                variant="basic"
                size="base"
                value={option.label}
                onChange={(e) => handleUpdateOption(optIndex, e.target.value)}
                className="flex-1 min-w-0"
                placeholder="输入选项名称"
              />
              {/* 删除按钮 */}
              <Button
                variant="ghost"
                size="iconSm"
                leftIcon="icon-close"
                onClick={() => handleRemoveOption(optIndex)}
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
