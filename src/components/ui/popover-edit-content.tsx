import * as React from "react"
import { PopoverLabel } from "./popover"
import { Input } from "./input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"

interface EditField {
  label: string
  type: "input" | "select"
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
  autoFocus?: boolean
  selectOnFocus?: boolean
  options?: { value: string; label: string }[] // for select
}

interface PopoverEditContentProps {
  size?: "base" | "sm" | "lg"
  fields: EditField[]
}

function PopoverEditContent({ size = "base", fields }: PopoverEditContentProps) {
  // 左右 padding 与 PopoverLabel 一致，下方 padding 使用 pb-1.5
  const paddingClass = {
    sm: "px-1.5 pb-1.5",
    base: "px-2 pb-1.5",
    lg: "px-3 pb-1.5",
  }[size]

  // 跟踪已自动选中的字段，确保只在首次聚焦时选中文本
  const autoSelectedRef = React.useRef<Set<number>>(new Set())

  return (
    <>
      {fields.map((field, index) => (
        <React.Fragment key={index}>
          <PopoverLabel size={size}>{field.label}</PopoverLabel>
          {field.type === "input" && (
            <div className={paddingClass}>
              <Input
                variant="basic"
                size={size}
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
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger variant="basic" size={size} className="w-full">
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
        </React.Fragment>
      ))}
    </>
  )
}

export { PopoverEditContent }
export type { EditField }