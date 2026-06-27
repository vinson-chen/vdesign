import * as React from "react"
import type { CellRendererProps, SelectOptionItem, ButtonCellConfig } from "@/types/table"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Input } from "./input"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverSeparator,
  PopoverLabel,
  PopoverItem,
} from "./popover"
import {
  Dialog,
  DialogContent,
} from "./dialog"

// 截断文本组件：检测文本是否被截断，若截断则悬停显示 Tooltip
function TruncatedText({ children, className, onDoubleClick, onClick }: { children: string; className?: string; onDoubleClick?: () => void; onClick?: () => void }) {
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
            onClick={onClick}
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
      onClick={onClick}
    >
      {children}
    </span>
  )
}

// 文本单元格渲染器（使用 contenteditable）
// 核心思路：选中态 contentEditable=true（隐藏光标），用户按键直接触发 IME
function TextCellRenderer({ value, isEditing, isSelected, onStartEdit, editingValue, onUpdateEditingValue, onFinishEdit, onCancelEdit, readOnly, isCellHovering, onSelectCell }: CellRendererProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  // 设置内容、光标和焦点
  React.useEffect(() => {
    if (editorRef.current) {
      const el = editorRef.current

      if (isEditing) {
        // 编辑态：确保内容正确（editingValue 优先）
        const expectedValue = editingValue ?? String(value)
        if (el.textContent !== expectedValue) {
          el.textContent = expectedValue
        }
        // 编辑态确保有焦点
        if (document.activeElement !== el) {
          el.focus()
        }
        // 编辑态：光标移到末尾
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)  // false = 移到末尾
        selection?.removeAllRanges()
        selection?.addRange(range)
      } else if (isSelected) {
        // 选中态：显示原值
        if (el.textContent !== String(value)) {
          el.textContent = String(value)
        }
        // 选中态确保有焦点（这样才能接收键盘输入）
        if (!readOnly && document.activeElement !== el) {
          el.focus()
          // 选中态：光标移到末尾（防止输入插入到开头）
          const selection = window.getSelection()
          const range = document.createRange()
          range.selectNodeContents(el)
          range.collapse(false)  // false = 移到末尾
          selection?.removeAllRanges()
          selection?.addRange(range)
        }
      }
    }
  }, [isEditing, isSelected, editingValue, value, readOnly])

  // 点击图标按钮：进入选中态并打开面板
  const handleIconButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 选中态或悬停态时显示图标按钮（只读模式隐藏）
  const showIconButton = !readOnly && (isSelected || isCellHovering)

  // 选中态或编辑态：都渲染 contenteditable + 图标按钮
  // 关键：选中态 contentEditable=true（隐藏光标），编辑态显示光标
  if (isEditing || isSelected) {
    return (
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div
          ref={editorRef}
          contentEditable={!readOnly}  // 选中态和编辑态都可编辑
          suppressContentEditableWarning
          onClick={(e) => {
            // 选中态：单击进入编辑态
            if (!isEditing && isSelected && !readOnly) {
              e.stopPropagation()
              onStartEdit?.(String(value))
            }
          }}
          onInput={(e) => {
            const text = e.currentTarget.textContent || ""

            if (isEditing) {
              // 编辑态：正常更新值
              onUpdateEditingValue?.(text)
            } else if (isSelected && !readOnly) {
              // 选中态检测到输入 → 进入编辑态，传入当前输入的内容
              onStartEdit?.(text)
            }
          }}
          onBlur={() => {
            if (isEditing) {
              onFinishEdit?.()
            }
          }}
          onKeyDown={(e) => {
            // 选中态：按空格时阻止默认行为，手动在末尾插入空格
            if (!isEditing && isSelected) {
              if (e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                // 进入编辑态，在末尾插入空格
                const currentValue = String(value)
                onStartEdit?.(currentValue + " ")
                return
              }
            }
            // 编辑态：处理 Enter/Escape
            if (!isEditing) return
            if (e.key === "Enter") {
              e.preventDefault()
              onFinishEdit?.()
            }
            if (e.key === "Escape") {
              e.preventDefault()
              onCancelEdit?.()
            }
          }}
          onDoubleClick={(e) => {
            if (!isEditing && isSelected && !readOnly) {
              e.stopPropagation()
              // 双击进入编辑态，不清空内容（使用当前值）
              onStartEdit?.(String(value))
            }
          }}
          onPaste={(e) => {
            // 选中态：阻止默认粘贴行为，让全局键盘事件处理
            if (!isEditing && isSelected) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            // 编辑态：处理粘贴
            if (isEditing) {
              e.preventDefault()
              const text = e.clipboardData.getData("text/plain")
              document.execCommand("insertText", false, text)
            }
          }}
          className={cn(
            "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
            // 选中态：隐藏光标，看起来像普通文本
            isSelected && !isEditing && "caret-transparent cursor-pointer"
          )}
        />

        {/* 图标按钮：选中态或悬停态时显示 */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="iconSm"
              leftIcon="icon-more"
              className={cn(
                "ml-auto shrink-0",
                !showIconButton && "opacity-0 pointer-events-none"
              )}
              onClick={handleIconButtonClick}
            />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[184px]">
            <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
              {/* 面板内容待定 */}
              <PopoverLabel>文本列设置</PopoverLabel>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  // 默认态：span 元素 + 图标按钮
  return (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <TruncatedText
        className={cn("flex-1 min-h-6 truncate", !readOnly && "cursor-pointer")}
        onDoubleClick={readOnly ? undefined : () => onStartEdit?.()}
      >
        {String(value) || " "}
      </TruncatedText>

      {/* 图标按钮：选中态或悬停态时显示 */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-more"
            className={cn(
              "ml-auto shrink-0",
              !showIconButton && "opacity-0 pointer-events-none"
            )}
            onClick={handleIconButtonClick}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[184px]">
          <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            {/* 面板内容待定 */}
            <PopoverLabel>文本列设置</PopoverLabel>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// 数字单元格渲染器（只能输入数字，左对齐，使用 contenteditable）
// 核心思路：选中态 contentEditable=true（隐藏光标），用户按键直接触发 IME
function NumberCellRenderer({ value, isEditing, isSelected, onStartEdit, editingValue, onUpdateEditingValue, onFinishEdit, onCancelEdit, readOnly, isCellHovering, onSelectCell }: CellRendererProps) {
  const editorRef = React.useRef<HTMLDivElement>(null)
  const [open, setOpen] = React.useState(false)

  // 设置内容、光标和焦点
  React.useEffect(() => {
    if (editorRef.current) {
      const el = editorRef.current

      if (isEditing) {
        // 编辑态：确保内容正确
        const expectedValue = editingValue ?? String(value)
        if (el.textContent !== expectedValue) {
          el.textContent = expectedValue
        }
        // 编辑态确保有焦点
        if (document.activeElement !== el) {
          el.focus()
        }
        // 编辑态：光标移到末尾
        const selection = window.getSelection()
        const range = document.createRange()
        range.selectNodeContents(el)
        range.collapse(false)  // false = 移到末尾
        selection?.removeAllRanges()
        selection?.addRange(range)
      } else if (isSelected) {
        // 选中态：显示原值
        if (el.textContent !== String(value)) {
          el.textContent = String(value)
        }
        // 选中态确保有焦点（这样才能接收键盘输入）
        if (!readOnly && document.activeElement !== el) {
          el.focus()
        }
      }
    }
  }, [isEditing, isSelected, editingValue, value, readOnly])

  // 点击图标按钮：进入选中态并打开面板
  const handleIconButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 选中态或悬停态时显示图标按钮（只读模式隐藏）
  const showIconButton = !readOnly && (isSelected || isCellHovering)

  // 选中态或编辑态：都渲染 contenteditable + 图标按钮
  if (isEditing || isSelected) {
    return (
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <div
          ref={editorRef}
          contentEditable={!readOnly}
          suppressContentEditableWarning
          onClick={(e) => {
            // 选中态：单击进入编辑态
            if (!isEditing && isSelected && !readOnly) {
              e.stopPropagation()
              onStartEdit?.(String(value))
            }
          }}
          onInput={(e) => {
            const text = e.currentTarget.textContent || ""

            // 验证是否为有效数字格式
            const isValidNumber = text === '' || /^-?\d*\.?\d*$/.test(text)

            if (!isValidNumber) {
              // 非法输入：恢复为上一个有效值
              const validValue = editingValue ?? String(value)
              e.currentTarget.textContent = validValue
              return
            }

            if (isEditing) {
              // 编辑态：正常更新值
              onUpdateEditingValue?.(text)
            } else if (isSelected && !readOnly) {
              // 选中态检测到有效输入 → 进入编辑态，传入当前内容
              onStartEdit?.(text)
            }
          }}
          onBlur={() => {
            if (isEditing) {
              onFinishEdit?.()
            }
          }}
          onKeyDown={(e) => {
            // 选中态：按空格时阻止默认行为，手动在末尾插入空格
            if (!isEditing && isSelected) {
              if (e.key === " ") {
                e.preventDefault()
                e.stopPropagation()
                // 进入编辑态，在末尾插入空格
                const currentValue = String(value)
                onStartEdit?.(currentValue + " ")
                return
              }
            }
            // 编辑态：处理 Enter/Escape
            if (!isEditing) return
            if (e.key === "Enter") {
              e.preventDefault()
              onFinishEdit?.()
            }
            if (e.key === "Escape") {
              e.preventDefault()
              onCancelEdit?.()
            }
          }}
          onDoubleClick={(e) => {
            if (!isEditing && isSelected && !readOnly) {
              e.stopPropagation()
              // 双击进入编辑态，不清空内容（使用当前值）
              onStartEdit?.(String(value))
            }
          }}
          onPaste={(e) => {
            // 选中态：阻止默认粘贴行为，让全局键盘事件处理
            if (!isEditing && isSelected) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            // 编辑态：处理粘贴（验证数字有效性）
            if (isEditing) {
              e.preventDefault()
              const text = e.clipboardData.getData("text/plain")
              const isValidNumber = text === '' || /^-?\d*\.?\d*$/.test(text)
              if (isValidNumber) {
                document.execCommand("insertText", false, text)
              }
            }
          }}
          className={cn(
            "flex-1 min-h-6 bg-transparent outline-none text-inherit font-inherit overflow-hidden whitespace-nowrap",
            // 选中态：隐藏光标，看起来像普通文本
            isSelected && !isEditing && "caret-transparent cursor-pointer"
          )}
        />

        {/* 图标按钮：选中态或悬停态时显示 */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="iconSm"
              leftIcon="icon-hashtag"
              className={cn(
                "ml-auto shrink-0",
                !showIconButton && "opacity-0 pointer-events-none"
              )}
              onClick={handleIconButtonClick}
            />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-[184px]">
            <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
              {/* 面板内容待定 */}
              <PopoverLabel>数字列设置</PopoverLabel>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    )
  }

  // 默认态：span 元素 + 图标按钮
  return (
    <div className="flex items-center gap-2 min-w-0 flex-1">
      <TruncatedText
        className={cn("flex-1 min-h-6 truncate", !readOnly && "cursor-pointer")}
        onDoubleClick={readOnly ? undefined : () => onStartEdit?.()}
      >
        {String(value) || " "}
      </TruncatedText>

      {/* 图标按钮：选中态或悬停态时显示 */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-hashtag"
            className={cn(
              "ml-auto shrink-0",
              !showIconButton && "opacity-0 pointer-events-none"
            )}
            onClick={handleIconButtonClick}
          />
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[184px]">
          <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
            {/* 面板内容待定 */}
            <PopoverLabel>数字列设置</PopoverLabel>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

// 可编辑下拉选择单元格渲染器（新版，支持添加选项）
function SelectEditableCellRenderer({
  value,
  options,
  onChange,
  onUpdateColumnOptions,
  isSelected,
  isCellHovering,
  onSelectCell,
  readOnly
}: CellRendererProps) {
  const items = (options?.items as SelectOptionItem[]) ?? []
  const [open, setOpen] = React.useState(false)
  const [searchKeyword, setSearchKeyword] = React.useState("")

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
    if (!searchKeyword.trim() || !onUpdateColumnOptions) return
    const keyword = searchKeyword.trim()
    const newOption: SelectOptionItem = {
      value: `opt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      label: keyword,
    }
    // 关闭面板
    setOpen(false)
    // 延迟更新状态，等关闭动画完成
    setTimeout(() => {
      const newItems = [...items, newOption]
      onUpdateColumnOptions({ ...options, items: newItems })
      onChange?.(newOption.value)
    }, 200)
  }

  // 选中选项
  const handleSelectItem = (itemValue: string) => {
    onChange?.(itemValue)
    setOpen(false)
  }

  // 点击文本区域
  const handleTextClick = () => {
    if (readOnly) return
    if (!isSelected) {
      // 默认态单击 → 进入选中态，不展开面板
      onSelectCell?.()
    }
    // 选中态时 PopoverTrigger 已包裹整个区域，点击会自动打开面板
  }

  // 双击文本区域：进入选中态 + 展开面板
  const handleTextDoubleClick = () => {
    if (readOnly) return
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 点击箭头按钮：展开面板
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 选中态或悬停态时显示箭头按钮（只读模式隐藏）
  const showArrowButton = !readOnly && (isSelected || isCellHovering)

  return (
    <Popover open={open} onOpenChange={(newOpen) => {
      if (newOpen) setSearchKeyword("")
      setOpen(newOpen)
    }}>
      {/* 文本区域 + 箭头按钮 */}
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <TruncatedText
          className={cn(
            "flex-1 min-h-6 truncate",
            !readOnly && "cursor-pointer",
            !selectedLabel && "text-black-25"
          )}
          onClick={handleTextClick}
          onDoubleClick={handleTextDoubleClick}
        >
          {selectedLabel || " "}
        </TruncatedText>

        {/* 箭头按钮：作为 PopoverTrigger，锁定态或悬停态时显示 */}
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-chevron-down"
            className={cn(
              "ml-auto shrink-0",
              !showArrowButton && "opacity-0 pointer-events-none"
            )}
            onClick={handleArrowClick}
          />
        </PopoverTrigger>
      </div>

      <PopoverContent align="end" className="w-[184px]">
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          {/* 搜索框 */}
          <Input
          variant="basic"
          size="base"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="搜索或添加选项"
          className="w-full border-none shadow-none rounded-none hover:border-none focus-visible:border-none focus-visible:shadow-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !hasExactMatch && searchKeyword.trim()) {
              e.preventDefault()
              handleAddOption()
            }
          }}
        />
        <PopoverSeparator className="!my-1" />

        {/* 选项列表 */}
        <div className="flex flex-col group/options">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <PopoverItem
                key={item.value}
                className={cn(
                  item.value === value && "bg-neutral-1 group-hover/options:bg-transparent hover:bg-neutral-1",
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => !item.disabled && handleSelectItem(item.value)}
              >
                <TruncatedText className="flex-1 min-w-0 truncate">
                  {item.label}
                </TruncatedText>
              </PopoverItem>
            ))
          ) : (
            !searchKeyword.trim() && items.length === 0 ? (
              <span className="relative flex items-center outline-none transition-colors h-8 rounded-md px-2 text-sm text-black-55 cursor-default">
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
              <TruncatedText className="flex-1 min-w-0 truncate">
                {`添加选项 "${searchKeyword.trim()}"`}
              </TruncatedText>
            </PopoverItem>
          )}
        </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// 链接单元格渲染器（每个单元格支持1个链接按钮）
function LinkCellRenderer({ cellData, isSelected, isCellHovering, onChange, onSelectCell, readOnly }: CellRendererProps) {
  const buttonConfig = cellData?.buttonConfig as ButtonCellConfig | undefined
  const [open, setOpen] = React.useState(false)

  // 更新按钮配置（单元格级别）
  const handleUpdateConfig = (config: ButtonCellConfig) => {
    onChange?.({ buttonConfig: config })
    setOpen(false)
  }

  // 判断 URL 是否有效：存在且格式正确
  const isValidUrl = () => {
    const url = buttonConfig?.url?.trim()
    if (!url) return false
    return url.startsWith('http://') || url.startsWith('https://') || url.includes('.')
  }

  // 点击按钮：有效链接跳转，无效链接进入选中态并打开配置面板
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isValidUrl()) {
      const url = buttonConfig!.url!.trim()
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        // 自动补全 https://
        window.open(`https://${url}`, '_blank', 'noopener,noreferrer')
      }
    } else {
      // 无有效链接，进入选中态并打开配置面板
      onSelectCell?.()
      setOpen(true)
    }
  }

  // 点击link按钮：进入选中态并打开配置面板
  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 双击单元格：进入选中态并打开配置面板
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (readOnly) return
    if (!isSelected) {
      onSelectCell?.()
    }
    setOpen(true)
  }

  // 选中态或悬停态时显示link按钮（只读模式隐藏）
  const showLinkButton = !readOnly && (isSelected || isCellHovering)

  // 判断是否有按钮配置（名称或超链接不为空）
  const hasButtonConfig = buttonConfig?.label?.trim() || buttonConfig?.url?.trim()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="flex items-center gap-2 min-w-0 flex-1" onDoubleClick={handleDoubleClick}>
        {/* 按钮区域：只有在有配置时才显示 */}
        {hasButtonConfig && (
          <div className="min-w-0 shrink">
            {buttonConfig?.label ? (
              // 文字按钮：link 样式，超长截断 + Tooltip
              <Button
                variant="link"
                size="base"
                onClick={handleButtonClick}
                className="max-w-full"
              >
                <TruncatedText className="truncate">
                  {buttonConfig.label}
                </TruncatedText>
              </Button>
            ) : (
              // 图标按钮：只有 URL 无名称时显示
              <Button
                variant="link"
                size="iconBase"
                leftIcon="icon-jump"
                onClick={handleButtonClick}
              />
            )}
          </div>
        )}

        {/* link按钮：作为 PopoverTrigger，锁定态或悬停态时显示 */}
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-link"
            className={cn(
              "ml-auto shrink-0",
              !showLinkButton && "opacity-0 pointer-events-none"
            )}
            onClick={handleLinkClick}
          />
        </PopoverTrigger>
      </div>

      <PopoverContent align="end" className="w-[184px]">
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          <LinkManager
            config={buttonConfig}
            onSave={handleUpdateConfig}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

// 链接管理面板（单元格级别）
function LinkManager({ config, onSave }: {
  config?: ButtonCellConfig
  onSave: (config: ButtonCellConfig) => void
}) {
  const [label, setLabel] = React.useState(config?.label ?? "")
  const [url, setUrl] = React.useState(config?.url ?? "")
  const id = React.useId()

  const handleSave = () => {
    onSave({ label, url })
  }

  const handleCancel = () => {
    onSave(config ?? {}) // 取消 = 恢复原值
  }

  return (
    <div
      data-slot="button-link-manager"
      data-slot-id={id}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          handleSave()
        }
        if (e.key === "Escape") {
          e.preventDefault()
          handleCancel()
        }
      }}
    >
      {/* 链接名 */}
      <PopoverLabel>链接名</PopoverLabel>
      <div className="px-2 pb-1.5">
        <Input
          variant="basic"
          size="base"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="输入链接名"
          className="w-full"
        />
      </div>
      {/* 超链接 */}
      <PopoverLabel>超链接</PopoverLabel>
      <div className="px-2 pb-1.5">
        <Input
          variant="basic"
          size="base"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="输入超链接"
          className="w-full"
        />
      </div>
      <PopoverSeparator />
      <div className="flex gap-2 px-2 py-1.5">
        <Button variant="outline" size="base" className="flex-1" onClick={handleCancel}>取消</Button>
        <Button variant="primary" size="base" className="flex-1" onClick={handleSave}>保存</Button>
      </div>
    </div>
  )
}

// 附件缩略图组件（只负责缩略图显示，预览由父组件处理）
function AttachmentThumbnail({ file, isSelected, isPreviewOpen, onPreview, onRemove }: {
  file: File
  isSelected: boolean
  isPreviewOpen?: boolean
  onPreview?: () => void
  onRemove?: () => void
}) {
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  // 判断文件类型
  const isImage = file.type.startsWith("image/")
  const isVideo = file.type.startsWith("video/")

  React.useEffect(() => {
    if (isImage) {
      const url = URL.createObjectURL(file)
      setThumbnailUrl(url)
      return () => URL.revokeObjectURL(url)
    } else if (isVideo) {
      const url = URL.createObjectURL(file)

      // 提取视频第一帧作为缩略图
      const video = videoRef.current
      const canvas = canvasRef.current
      if (video && canvas) {
        video.src = url
        video.addEventListener('loadeddata', () => {
          canvas.width = video.videoWidth || 80
          canvas.height = video.videoHeight || 80
          const ctx = canvas.getContext('2d')
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            const thumbnail = canvas.toDataURL('image/jpeg', 0.8)
            setThumbnailUrl(thumbnail)
          }
        })
        video.currentTime = 0.1
      }

      return () => URL.revokeObjectURL(url)
    }
    return () => {}
  }, [file, isImage, isVideo])

  const handleClick = () => {
    onPreview?.()
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    inputRef.current?.click()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0]
    if (newFile) {
      // 修改功能暂未实现
    }
    e.target.value = ""
  }

  // 缩略图容器
  const thumbnailContent = (
    <div
      className="group relative size-8 shrink-0 rounded-lg overflow-hidden bg-neutral-1 border border-neutral-2 flex items-center justify-center cursor-pointer"
      onClick={handleClick}
    >
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={file.name} className="size-full object-cover" />
      ) : (
        <svg className="size-4 text-black-55" fill="currentColor">
          <use xlinkHref="#icon-file-1" />
        </svg>
      )}
      {/* hover 预览蒙层 */}
      {(isImage || isVideo) && thumbnailUrl && (
        <div className={cn(
          "absolute inset-0 bg-black-10 opacity-0 group-hover:opacity-100",
          !isPreviewOpen && "transition-opacity"
        )} />
      )}
    </div>
  )

  return (
    <>
      {/* 选中态：Tooltip 显示编辑和删除按钮 */}
      {isSelected ? (
        <Tooltip>
          <TooltipTrigger asChild>
            {thumbnailContent}
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={4} className="h-10 flex items-center px-0.5">
            <Button
              variant="ghost"
              size="iconBase"
              leftIcon="icon-edit"
              onClick={handleEditClick}
              className="text-white-60 hover:text-white-100"
            />
            <Button
              variant="ghost"
              size="iconBase"
              leftIcon="icon-delete"
              onClick={handleDeleteClick}
              className="text-white-60 hover:text-white-100"
            />
          </TooltipContent>
        </Tooltip>
      ) : (
        thumbnailContent
      )}

      {/* 隐藏的修改 input */}
      <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />

      {/* 隐藏的 video 和 canvas（用于提取视频第一帧） */}
      <video ref={videoRef} className="hidden" preload="metadata" crossOrigin="anonymous" />
      <canvas ref={canvasRef} className="hidden" />
    </>
  )
}

// 附件单元格渲染器
function AttachmentCellRenderer({ cellData, isSelected, isCellHovering, onChange, readOnly }: CellRendererProps) {
  // 附件数据存储在 cellData.attachmentFiles 中
  // 不在此处用 ?? [] 兜底，避免每帧创建新空数组引用导致 useEffect 死循环
  const files = cellData?.attachmentFiles as File[] | undefined
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  // 预览状态
  const [previewIndex, setPreviewIndex] = React.useState<number | null>(null)
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([])

  const fileList = files ?? []
  const fileCount = fileList.length

  // 动态计算可容纳的缩略图数量
  const [visibleCount, setVisibleCount] = React.useState(fileCount)

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const calculateVisibleCount = () => {
      const containerWidth = container.clientWidth
      // 每个缩略图占 40px（32px + 8px gap）
      const thumbnailWidth = 40
      // 计算可容纳数量，至少显示1个
      const count = Math.max(1, Math.floor(containerWidth / thumbnailWidth))
      setVisibleCount(count)
    }

    // 初始化计算
    calculateVisibleCount()

    // 监听容器宽度变化
    const observer = new ResizeObserver(calculateVisibleCount)
    observer.observe(container)
    return () => observer.disconnect()
  }, [fileCount])

  // 判断是否需要显示 "+N"（附件数量超出可容纳数量）
  const showOverflow = fileCount > visibleCount
  const overflowCount = fileCount - visibleCount

  // 生成预览 URL — 用 files（可能是 undefined）做依赖，undefined 引用稳定，避免死循环
  React.useEffect(() => {
    const urls = fileList.map(file => URL.createObjectURL(file))
    setPreviewUrls(urls)
    return () => urls.forEach(url => URL.revokeObjectURL(url))
  }, [files])

  // 更新附件配置（单元格级别）
  const handleUpdateFiles = (newFiles: File[]) => {
    onChange?.({ attachmentFiles: newFiles })
  }

  // 上传新文件
  const handleUpload = () => {
    inputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (newFiles.length > 0) {
      handleUpdateFiles([...fileList, ...newFiles])
    }
    e.target.value = ""
  }

  // 删除文件
  const handleRemove = (index: number) => {
    const newFiles = fileList.filter((_, i) => i !== index)
    handleUpdateFiles(newFiles)
    // 如果删除的是正在预览的文件，关闭预览
    if (previewIndex === index) {
      setPreviewIndex(null)
    }
  }

  // 预览切换
  const handlePreview = (index: number) => {
    setPreviewIndex(index)
  }

  const handlePrev = () => {
    if (previewIndex !== null && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1)
    }
  }

  const handleNext = () => {
    if (previewIndex !== null && previewIndex < fileCount - 1) {
      setPreviewIndex(previewIndex + 1)
    }
  }

  // 键盘导航
  React.useEffect(() => {
    if (previewIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previewIndex])

  // 选中态或悬停态时显示上传按钮（只读模式隐藏）
  const showUploadButton = !readOnly && (isSelected || isCellHovering)

  return (
    <>
      <div ref={containerRef} className="flex items-center gap-2 min-w-0 flex-1">
        {/* 文件缩略图列表（贴左） */}
        {fileCount > 0 && (
          <div className="flex items-center gap-2 min-w-0 shrink">
            {fileList.slice(0, visibleCount).map((file, index) => (
              <div key={`${file.name}-${file.size}-${index}`} className="relative shrink-0">
                <AttachmentThumbnail
                  file={file}
                  isSelected={isSelected ?? false}
                  isPreviewOpen={previewIndex !== null}
                  onPreview={() => handlePreview(index)}
                  onRemove={() => handleRemove(index)}
                />
                {/* 最后一个缩略图上的 "+N" 蒙层 */}
                {showOverflow && index === visibleCount - 1 && (
                  <div
                    className="absolute inset-0 bg-black-55 flex items-center justify-center rounded-lg cursor-pointer"
                    onClick={() => handlePreview(index)}
                  >
                    <span className="text-xs text-white-100">+{overflowCount}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 隐藏的 file input */}
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* 锁定态或悬停态时，上传按钮贴右 */}
        {showUploadButton && (
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-upload"
            className="ml-auto shrink-0"
            onClick={handleUpload}
          />
        )}
      </div>

      {/* 预览 Dialog */}
      {previewIndex !== null && previewUrls[previewIndex] && (
        <Dialog open={previewIndex !== null} onOpenChange={(open) => !open && setPreviewIndex(null)}>
          <DialogContent
            size="lg"
            overlayClassName="bg-black-55"
            className="w-[95vw] h-[95vh] max-w-[95vw] max-h-[95vh] p-2 flex items-center justify-center bg-transparent shadow-none border-none [&>button]:bg-black-55 [&>button]:text-white-100 [&>button]:hover:bg-black-85 [&>button]:active:bg-black-85">
            {/* 左箭头 */}
            <Button
              variant="ghost"
              size="iconLg"
              leftIcon="icon-arrow-left"
              disabled={previewIndex === 0}
              className="absolute left-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60"
              onClick={handlePrev}
            />

            {/* 当前预览内容 */}
            {fileList[previewIndex]?.type.startsWith("image/") ? (
              <img src={previewUrls[previewIndex]} alt={fileList[previewIndex].name} className="max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)] object-contain" />
            ) : fileList[previewIndex]?.type.startsWith("video/") ? (
              <video src={previewUrls[previewIndex]} controls className="max-w-[calc(95vw-96px)] max-h-[calc(95vh-96px)]" />
            ) : null}

            {/* 右箭头 */}
            <Button
              variant="ghost"
              size="iconLg"
              leftIcon="icon-arrow-right"
              disabled={previewIndex === fileCount - 1}
              className="absolute right-2 top-1/2 -mt-5 bg-black-55 text-white-100 hover:bg-black-85 active:bg-black-85 z-10 disabled:bg-black-5 disabled:text-white-60 disabled:cursor-not-allowed disabled:hover:bg-black-5 disabled:hover:text-white-60"
              onClick={handleNext}
            />

            {/* 计数指示器 */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full bg-black/50 text-white text-sm z-10">
              {previewIndex + 1}/{fileCount}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

// 默认渲染器注册表
const defaultCellRenderers: Record<string, React.ComponentType<CellRendererProps>> = {
  text: TextCellRenderer,
  number: NumberCellRenderer,
  select: SelectEditableCellRenderer,
  link: LinkCellRenderer,
  attachment: AttachmentCellRenderer,
}

export {
  TruncatedText,
  TextCellRenderer,
  NumberCellRenderer,
  SelectEditableCellRenderer,
  LinkCellRenderer,
  AttachmentCellRenderer,
  defaultCellRenderers,
}
