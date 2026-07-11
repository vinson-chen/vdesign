import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const editableNavigationGroupVariants = cva("flex items-center gap-2", {
  variants: {
    size: {
      base: "",
      lg: "",
    },
  },
  defaultVariants: { size: "base" },
})

const prClassMap = { base: "pr-1", lg: "pr-2" } as const
const addIconSizeMap = { base: "iconBase", lg: "iconLg" } as const
const textClassMap = { base: "text-sm leading-6", lg: "text-base leading-6" } as const

function EditableNavigationGroup({
  className,
  size,
  defaultItems = ['选项一', '选项二', '选项三'],
  selectedIndex,
  onSelectedChange,
  onItemsChange,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof editableNavigationGroupVariants> & {
    defaultItems?: string[]
    selectedIndex?: number | null
    onSelectedChange?: (index: number | null) => void
    onItemsChange?: (items: string[]) => void
  }) {
  const s = size ?? "base"
  const [items, setItems] = React.useState(defaultItems)
  const [internalSelected, setInternalSelected] = React.useState<number | null>(0)
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null)
  const [editValue, setEditValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>(null)

  const isControlled = selectedIndex !== undefined
  const selected = isControlled ? selectedIndex : internalSelected

  const setSelected = (index: number | null) => {
    if (!isControlled) setInternalSelected(index)
    onSelectedChange?.(index)
  }

  React.useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingIndex])

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setItems((prev) => {
      const next = [...prev, '未命名选项']
      const newIndex = prev.length
      setSelected(newIndex)
      setEditingIndex(newIndex)
      setEditValue('未命名选项')
      onItemsChange?.(next)
      return next
    })
  }

  const handleRemove = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setItems((prev) => {
      const next = prev.filter((_, i) => i !== index)
      if (index === selected) {
        setSelected(next.length > 0 ? Math.min(index, next.length - 1) : null)
      } else if (selected !== null && index < selected) {
        setSelected(selected - 1)
      }
      onItemsChange?.(next)
      return next
    })
  }

  const handleDoubleClick = (e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    setEditingIndex(index)
    setEditValue(items[index] ?? '')
  }

  const commitEdit = () => {
    if (editingIndex === null) return
    setItems((prev) => {
      const next = prev.map((item, i) =>
        i === editingIndex ? (editValue || item) : item
      )
      onItemsChange?.(next)
      return next
    })
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
    <div
      data-slot="editable-navigation-group"
      className={cn(editableNavigationGroupVariants({ size }), className)}
      {...props}
    >
      {items.map((label, i) => (
        <NavigationItem
          key={i}
          variant={selected === i ? "selected" : "basic"}
          size={s}
          onClick={() => setSelected(i)}
          onDoubleClick={(e) => handleDoubleClick(e, i)}
          className={cn("shrink-0 group", prClassMap[s])}
        >
          {editingIndex === i ? (
            <span className="relative inline-flex items-center">
              <span className={cn("invisible", textClassMap[s])}>
                {editValue || ' '}
              </span>
              <Input
                ref={inputRef}
                size={s}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value ?? '')}
                onKeyDown={handleEditKeyDown}
                onBlur={commitEdit}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "absolute inset-0 border-0 bg-transparent p-0 h-auto rounded-none shadow-none focus:shadow-none",
                  textClassMap[s]
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
      <Button
        variant="ghost"
        size={addIconSizeMap[s]}
        leftIcon="icon-add"
        onClick={handleAdd}
        className="shrink-0 text-black-55"
      />
    </div>
  )
}

export { EditableNavigationGroup, editableNavigationGroupVariants }
