import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Input } from "./input"
import { Popover, PopoverTrigger, PopoverContent, PopoverSeparator, PopoverItem, sizeConfig } from "./popover"
import { selectTriggerVariants } from "./select"

// 选项项类型
interface SelectEditableItem {
  value: string
  label: string
  disabled?: boolean
}

interface SelectEditableProps extends VariantProps<typeof selectTriggerVariants> {
  value?: string
  onValueChange?: (value: string) => void
  items: SelectEditableItem[]
  onItemsChange?: (items: SelectEditableItem[]) => void
  placeholder?: string
  disabled?: boolean
  size?: "sm" | "base" | "lg"
  className?: string
  slotId?: string
}

function SelectEditable({
  value,
  onValueChange,
  items,
  onItemsChange,
  placeholder = "请选择",
  disabled,
  variant,
  size = "base",
  className,
  slotId,
}: SelectEditableProps) {
  const isDisabled = disabled || variant === "disabled"
  const id = React.useId()
  const [searchKeyword, setSearchKeyword] = React.useState("")
  const [open, setOpen] = React.useState(false)

  const config = sizeConfig[size as keyof typeof sizeConfig]

  // 获取当前选中项的 label
  const selectedLabel = React.useMemo(() => {
    const selectedItem = items.find(item => item.value === value)
    return selectedItem?.label || ""
  }, [items, value])

  // 搜索筛选：模糊匹配
  const filteredItems = React.useMemo(() => {
    if (!searchKeyword.trim()) return items
    const keyword = searchKeyword.toLowerCase()
    return items.filter(item => item.label.toLowerCase().includes(keyword))
  }, [items, searchKeyword])

  // 精确匹配判断：是否存在 label 精确等于搜索关键词的选项（忽略大小写）
  const hasExactMatch = React.useMemo(() => {
    if (!searchKeyword.trim()) return true
    const keyword = searchKeyword.toLowerCase()
    return items.some(item => item.label.toLowerCase() === keyword)
  }, [items, searchKeyword])

  // 添加新选项
  const handleAddOption = () => {
    if (!searchKeyword.trim() || !onItemsChange) return
    const keyword = searchKeyword.trim()
    const newOption: SelectEditableItem = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: keyword,
    }
    // 关闭面板
    setOpen(false)
    // 延迟更新状态，等关闭动画完成
    setTimeout(() => {
      const newItems = [...items, newOption]
      onItemsChange(newItems)
      onValueChange?.(newOption.value)
    }, 200)
  }

  // 选中选项
  const handleSelectItem = (itemValue: string) => {
    onValueChange?.(itemValue)
    setOpen(false)
  }

  return (
    <Popover
      size={size}
      open={open}
      onOpenChange={(newOpen) => {
        // 打开面板时清空搜索
        if (newOpen) setSearchKeyword("")
        setOpen(newOpen)
      }}
    >
      <PopoverTrigger asChild>
        <button
          data-slot="select-editable-trigger"
          data-slot-id={slotId ?? id}
          className={cn(selectTriggerVariants({ variant }), config.height, config.rounded, config.px, config.gap, config.text, "w-full", className)}
          disabled={isDisabled}
          type="button"
        >
          <div className={cn("flex-1 truncate text-left", !selectedLabel && "text-black-25")}>
            {selectedLabel || placeholder}
          </div>
          <svg aria-hidden="true" className={cn("shrink-0 ml-auto", config.icon)} style={{ fill: "currentColor" }}>
            <use xlinkHref="#icon-chevron-down" />
          </svg>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={4}
        className="min-w-[184px] w-[var(--radix-popover-trigger-width)]"
      >
        {/* 搜索区 */}
        <Input
          variant="basic"
          size="base"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="搜索或添加选项"
          className="w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none"
          onKeyDown={(e) => {
            // Enter 添加选项
            if (e.key === "Enter" && !hasExactMatch && searchKeyword.trim()) {
              e.preventDefault()
              handleAddOption()
            }
          }}
        />
        <PopoverSeparator className="!my-1" />

        {/* 选项区 */}
        <div className="flex flex-col group/options">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PopoverItem
                key={item.value}
                disabled={item.disabled}
                className={cn(
                  item.value === value && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
                  item.disabled && "opacity-50"
                )}
                onClick={() => !item.disabled && handleSelectItem(item.value)}
              >
                {item.label}
              </PopoverItem>
            ))
          ) : (
            // 没有选项时显示占位文案
            !searchKeyword.trim() && items.length === 0 ? (
              <span className={cn(
                "relative flex items-center outline-none transition-colors",
                config.height,
                config.rounded,
                config.px,
                config.text,
                "text-black-55 cursor-default"
              )}>
                没有选项
              </span>
            ) : null
          )}

          {/* 添加选项按钮：搜索框有内容且无精确匹配时显示 */}
          {searchKeyword.trim() && !hasExactMatch && (
            <PopoverItem
              className="text-black-55 hover:text-black-85"
              onClick={handleAddOption}
            >
              添加选项 "{searchKeyword.trim()}"
            </PopoverItem>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { SelectEditable }
export type { SelectEditableItem, SelectEditableProps }