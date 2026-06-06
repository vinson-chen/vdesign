import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TableProvider, useTable } from "@/hooks"
import type { TableData, CellType, GroupedData, RowData } from "@/types/table"
import { Cell } from "./cell"
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverMenuItem,
  PopoverSeparator,
  PopoverContext,
} from "./popover"
import { PopoverEditContent } from "./popover-edit-content"
import { Input } from "./input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"

const tableVariants = cva("flex w-max min-w-full flex-col bg-white-100 border-neutral-2 border-l border-t border-r relative", {
  variants: {
    variant: {
      base: "",
      plain: "border-0",
    },
  },
  defaultVariants: {
    variant: "base",
  },
})

interface CellContentProps {
  cellId: string
  type: string
  value: string | boolean | number
  rowId?: string
  isHeader?: boolean
  columnId?: string
}

// 表头文本单元格内部组件（访问 Popover Context）
function HeaderTextCellInner({ cellId, value, columnId, currentColumnType, editView, setEditView, onDoubleClickTitle }: {
  cellId: string
  value: string | boolean | number
  columnId?: string
  currentColumnType: CellType
  editView: boolean
  setEditView: (v: boolean) => void
  onDoubleClickTitle: () => void
}) {
  const { state, actions } = useTable()
  const { close, isOpen } = React.useContext(PopoverContext)
  const [editedTitle, setEditedTitle] = React.useState(String(value))
  const [editedType, setEditedType] = React.useState<CellType>("text")

  // 打开编辑视图时同步状态
  React.useEffect(() => {
    if (editView) {
      setEditedTitle(String(value))
      setEditedType(currentColumnType)
    }
  }, [editView, value, currentColumnType])

  // 保存修改
  const handleSave = () => {
    // 保存标题
    if (editedTitle !== String(value) && columnId) {
      actions.updateColumnTitle(columnId, editedTitle)
    }
    // 保存列类型
    if (columnId && editedType !== currentColumnType) {
      actions.updateColumnType(columnId, editedType)
    }
    close()
  }

  // 取消修改
  const handleCancel = () => {
    close()
  }

  return (
    <>
      <span
        className="truncate cursor-pointer flex-1"
        onDoubleClick={onDoubleClickTitle}
      >
        {String(value)}
      </span>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="iconSm"
          leftIcon="icon-chevron-down"
          className={cn(
            "transition-opacity",
            isOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
          onClick={(e) => {
            e.stopPropagation()
            if (state.selectedColumnId === columnId) {
              actions.selectColumn(null)
            }
          }}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      </PopoverTrigger>
      <PopoverContent size="base" align="end" alignOffset={-8} className="w-[200px]">
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
        {/* 菜单视图 */}
        <div className={editView ? "hidden" : ""}>
          <PopoverMenuItem size="base" onClick={() => {
            if (columnId && state.selectedColumnId !== columnId) {
              actions.selectColumn(columnId)
            }
            setEditView(true)
          }}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-edit" /></svg>
              <span className="text-sm text-black-85">编辑列</span>
            </div>
          </PopoverMenuItem>
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.hideColumn(columnId)}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-browse-off" /></svg>
              <span className="text-sm text-black-85">隐藏列</span>
            </div>
          </PopoverMenuItem>
          <PopoverSeparator />
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.insertColumnLeft(columnId)}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-arrow-left" /></svg>
              <span className="text-sm text-black-85">向左插入列</span>
            </div>
          </PopoverMenuItem>
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.insertColumnRight(columnId)}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-arrow-right" /></svg>
              <span className="text-sm text-black-85">向右插入列</span>
            </div>
          </PopoverMenuItem>
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.freezeColumns(columnId)}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-grid-column" /></svg>
              <span className="text-sm text-black-85">冻结到此列</span>
            </div>
          </PopoverMenuItem>
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.setGroupColumn(state.groupColumnId === columnId ? null : columnId)}>
            <div className="flex items-center gap-2">
              <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-form" /></svg>
              <span className="text-sm text-black-85">{state.groupColumnId === columnId ? "取消分组" : "设为分组标题"}</span>
            </div>
          </PopoverMenuItem>
          <PopoverSeparator />
          <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.deleteColumn(columnId)} className="text-error-5 hover:bg-error-1 focus:bg-error-1 active:bg-error-2">
            <div className="flex items-center gap-2">
              <svg className="icon text-error-5" aria-hidden="true"><use xlinkHref="#icon-delete" /></svg>
              <span className="text-sm">删除列</span>
            </div>
          </PopoverMenuItem>
        </div>
        {/* 编辑视图 */}
        <div className={editView ? "" : "hidden"}>
          <PopoverEditContent
            size="base"
            fields={[
              {
                label: "标题",
                type: "input",
                value: editedTitle,
                onChange: setEditedTitle,
                placeholder: "输入列标题",
                autoFocus: true,
                selectOnFocus: true,
              },
              {
                label: "列类型",
                type: "select",
                value: editedType,
                onChange: (v) => setEditedType(v as CellType),
                placeholder: "选择列类型",
                options: [
                  { value: "text", label: "文本列" },
                  { value: "input", label: "输入列" },
                  { value: "select", label: "单选列" },
                  { value: "button", label: "按钮列" },
                ],
              },
            ]}
          />
          <PopoverSeparator />
          <div className="flex gap-2 px-2 py-1.5">
            <Button variant="outline" size="base" className="flex-1" onClick={handleCancel}>取消</Button>
            <Button variant="primary" size="base" className="flex-1" onClick={handleSave}>保存</Button>
          </div>
        </div>
        </div>
      </PopoverContent>
    </>
  )
}

// 表头文本单元格组件（带菜单）
function HeaderTextCell({ cellId, value, columnId }: { cellId: string; value: string | boolean | number; columnId?: string }) {
  const { data, state, actions } = useTable()
  const [editView, setEditView] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const isHeaderPopoverOpenRef = React.useContext(HeaderPopoverOpenRefContext)

  // 获取当前列类型
  const currentColumnType = columnId
    ? data.columns.find(col => col.id === columnId)?.type ?? "text"
    : "text"

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) setEditView(false)
    // 标记面板开关状态，确保取消选中逻辑被阻断
    if (isHeaderPopoverOpenRef) isHeaderPopoverOpenRef.current = newOpen
  }

  const handleDoubleClick = () => {
    // 双击打开编辑面板时选中列
    if (columnId && state.selectedColumnId !== columnId) {
      actions.selectColumn(columnId)
    }
    if (isHeaderPopoverOpenRef) isHeaderPopoverOpenRef.current = true
    setOpen(true)
    setEditView(true)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <HeaderTextCellInner
        cellId={cellId}
        value={value}
        columnId={columnId}
        currentColumnType={currentColumnType}
        editView={editView}
        setEditView={setEditView}
        onDoubleClickTitle={handleDoubleClick}
      />
    </Popover>
  )
}

function CellContent({ cellId, type, value, rowId, isHeader, columnId }: CellContentProps) {
  const { state, actions } = useTable()
  const isSelected = rowId ? state.selectedRows.has(rowId) : false

  switch (type) {
    case "checkbox":
      return (
        <Checkbox
          checked={rowId ? isSelected : state.selectAll}
          onChange={() => {
            if (rowId) {
              actions.toggleRowSelect(rowId)
            } else {
              actions.toggleSelectAll()
            }
          }}
        />
      )

    case "select":
      return (
        <div className="min-w-0 flex-1">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={String(value) || "请选择"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option1">选项一</SelectItem>
              <SelectItem value="option2">选项二</SelectItem>
              <SelectItem value="option3">选项三</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )

    case "input":
      return (
        <div className="min-w-0 flex-1">
          <Input className="w-full" placeholder={String(value) || "请输入"} variant="basic" size="base" />
        </div>
      )

    case "button":
      return (
        <Button variant="outline" size="base">
          {String(value) || "按钮"}
        </Button>
      )

    case "icon":
      return (
        <Button variant="cell" size="cellIconBase" leftIcon={String(value)} />
      )

    case "editable":
      if (state.editingCellId === cellId) {
        return (
          <input
            type="text"
            value={state.editingValue}
            onChange={(e) => actions.updateEditingValue(e.target.value)}
            onBlur={actions.finishEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") actions.finishEdit()
              if (e.key === "Escape") actions.cancelEdit()
            }}
            className="absolute inset-0 bg-transparent border-none outline-none p-0 text-inherit font-inherit overflow-hidden"
            autoFocus
          />
        )
      }
      return (
        <span
          className="block truncate min-h-6 cursor-pointer"
          onDoubleClick={() => actions.startEdit(cellId, String(value))}
        >
          {String(value) || " "}
        </span>
      )

    case "text":
    default:
      if (isHeader) {
        return <HeaderTextCell cellId={cellId} value={value} columnId={columnId} />
      }
      // 非表头文本单元格支持双击编辑（沿用表头编辑态样式）
      if (state.editingCellId === cellId) {
        return (
          <input
            type="text"
            value={state.editingValue}
            onChange={(e) => actions.updateEditingValue(e.target.value)}
            onBlur={actions.finishEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") actions.finishEdit()
              if (e.key === "Escape") actions.cancelEdit()
            }}
            onFocus={(e) => e.target.select()}
            className="absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden"
            autoFocus
          />
        )
      }
      return (
        <span
          className="flex-1 w-full min-h-6 cursor-pointer truncate"
          onDoubleClick={() => actions.startEdit(cellId, String(value))}
        >
          {String(value) || " "}
        </span>
      )
  }
}

interface CellDef {
  id: string
  type: string
  value: string | boolean | number
  width?: number | 'auto'
}

interface RowDef {
  id: string
  cells: CellDef[]
}

interface RowRendererProps {
  row: RowDef
  isHeader?: boolean
  columnIds?: string[]
  onCellResizeStart?: (columnId: string, startWidth: number, startX: number) => void
  onCellHoverEdge?: (columnId: string | null) => void
  onHeaderCellClick?: (columnId: string, cellType: string, e: React.MouseEvent) => void
  onHeaderCellMouseDown?: (columnId: string, e: React.MouseEvent) => void
  draggingColumnId?: string | null
}

function RowRenderer({ row, isHeader, columnIds, onCellResizeStart, onCellHoverEdge, onHeaderCellClick, onHeaderCellMouseDown, draggingColumnId }: RowRendererProps) {
  const { state } = useTable()
  const isSelected = !isHeader && state.selectedRows.has(row.id)

  // 使用实际列宽计算行宽
  const rowWidth = row.cells.reduce((sum, cell, index) => {
    const columnId = columnIds?.[index] ?? cell.id
    const width = state.columnWidths[columnId] ?? (cell.width === 'auto' ? 40 : cell.width) ?? 80
    return sum + width
  }, 0)

  // 计算冻结列的累积偏移
  const frozenOffsets: Record<string, number> = {}
  let frozenAccum = 0
  row.cells.forEach((cell, index) => {
    const columnId = columnIds?.[index] ?? cell.id
    if (state.frozenColumns.has(columnId)) {
      frozenOffsets[columnId] = frozenAccum
      const width = state.columnWidths[columnId] ?? (cell.width === 'auto' ? 40 : cell.width) ?? 80
      frozenAccum += width
    }
  })

  // 冻结列总宽度
  const frozenWidth = frozenAccum

  return (
    <div
      data-slot="row"
      className={cn(
        "flex border-b border-neutral-2",
        isSelected && "bg-brand-1"
      )}
      style={{ width: `${rowWidth}px` }}
    >
      {row.cells.map((cell, index) => {
        const columnId = columnIds?.[index] ?? cell.id
        const width = state.columnWidths[columnId] ?? (cell.width === 'auto' ? 40 : cell.width) ?? 80
        const isLast = index === row.cells.length - 1
        const isFrozen = state.frozenColumns.has(columnId)
        const frozenLeft = frozenOffsets[columnId] ?? 0
        const isLastFrozen = isFrozen && frozenLeft + width === frozenWidth

        const isEditing = !isHeader && state.editingCellId === cell.id && cell.type === "text"
        const isColumnSelected = state.selectedColumnId === columnId

        // 拖拽态判断（仅用于光标）

        // 表头 variant 优先级：headerSelected > header
        // 表体 variant 优先级：editing > selected(行或列) > default
        const cellVariant = isHeader
          ? (isColumnSelected ? "headerSelected" : "header")
          : isEditing
            ? "editing"
            : (isSelected || isColumnSelected)
              ? "selected"
              : "default"

        // 光标：选中列 + 非冻结 + 非拖拽中 = grab
        const showGrabCursor = isHeader && isColumnSelected && !isFrozen && !draggingColumnId
        // 拖拽中 = grabbing
        const showGrabbingCursor = isHeader && draggingColumnId && draggingColumnId === state.selectedColumnId

        return (
          <Cell
            key={cell.id}
            width={width}
            variant={cellVariant}
            isLastCell={isLast}
            resizable={isHeader && !isLast}
            onResizeStart={onCellResizeStart ? (startWidth, startX) => onCellResizeStart(columnId, startWidth, startX) : undefined}
            onHoverEdge={onCellHoverEdge ? (hovering) => onCellHoverEdge(hovering ? columnId : null) : undefined}
            onClick={isHeader && cell.type !== "checkbox" && onHeaderCellClick ? (e: React.MouseEvent) => onHeaderCellClick(columnId, cell.type, e) : undefined}
            onMouseDown={isHeader && cell.type !== "checkbox" && !isFrozen && isColumnSelected && onHeaderCellMouseDown ? (e: React.MouseEvent) => onHeaderCellMouseDown(columnId, e) : undefined}
            slotClassName={isHeader && cell.type === "text" ? "justify-between" : cell.type === "checkbox" ? "justify-center" : undefined}
            className={cn(
              isHeader && cell.type === "text" && "group",
              isFrozen && "sticky",
              isHeader && isFrozen && "z-20",
              !isHeader && isFrozen && "z-10",
              isLastFrozen && "shadow-[2px_0_4px_-2px_var(--black-10)]",
              // 光标
              showGrabCursor && "cursor-grab",
              showGrabbingCursor && "cursor-grabbing"
            )}
            style={isFrozen ? { left: frozenLeft } : undefined}
          >
            <CellContent
              cellId={cell.id}
              type={cell.type}
              value={cell.value}
              rowId={isHeader ? undefined : row.id}
              isHeader={isHeader}
              columnId={columnId}
            />
          </Cell>
        )
      })}
    </div>
  )
}

// 分组标题行组件
function GroupHeaderRow({ groupValue, rowCount, frozenWidth, rowWidth, checkboxWidth, frozenNonCheckboxWidth, isCollapsed, isGroupSelected, onToggle, onGroupSelect, groupColumnId }: {
  groupValue: string
  rowCount: number
  frozenWidth: number
  rowWidth: number
  checkboxWidth: number
  frozenNonCheckboxWidth: number
  isCollapsed: boolean
  isGroupSelected: boolean
  onToggle: () => void
  onGroupSelect: () => void
  groupColumnId: string
}) {
  const { state, actions } = useTable()
  const cellId = `group-header-${groupValue}`
  const isEditing = state.editingCellId === cellId

  // 编辑完成时同步更新分组列所有单元格
  const handleFinishEdit = () => {
    if (state.editingValue !== groupValue) {
      actions.updateGroupValues(groupValue, state.editingValue, groupColumnId)
    }
    actions.finishEdit()
  }

  return (
    <div
      data-slot="group-header"
      className="flex border-b border-neutral-2 bg-white-100"
      style={{ width: `${rowWidth}px` }}
    >
      {/* 冻结部分 */}
      <div
        className="sticky left-0 z-10 flex bg-white-100 shadow-[2px_0_4px_-2px_var(--black-10)]"
        style={{ width: `${frozenWidth}px` }}
      >
        {/* 第一个单元格：checkbox 全选该组 */}
        <Cell width={checkboxWidth} isLastCell={frozenNonCheckboxWidth === 0}>
          <div className="flex items-center justify-center w-full h-full">
            <Checkbox checked={isGroupSelected} onChange={onGroupSelect} />
          </div>
        </Cell>
        {/* 第二个单元格：分组标题 + 展开/收起按钮 */}
        {frozenNonCheckboxWidth > 0 && (
          <Cell width={frozenNonCheckboxWidth} isLastCell={false} variant={isEditing ? "editing" : "default"}>
            <div className="flex items-center justify-between w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={state.editingValue}
                  onChange={(e) => actions.updateEditingValue(e.target.value)}
                  onBlur={handleFinishEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleFinishEdit()
                    if (e.key === "Escape") actions.cancelEdit()
                  }}
                  onFocus={(e) => e.target.select()}
                  className="absolute inset-0 bg-transparent border-none outline-none p-2 text-inherit font-inherit overflow-hidden"
                  autoFocus
                />
              ) : (
                <span
                  className="text-sm font-medium text-black-85 cursor-pointer truncate"
                  onDoubleClick={() => actions.startEdit(cellId, groupValue)}
                >
                  {groupValue}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                rightIcon="icon-chevron-down"
                onClick={onToggle}
                className={`text-black-55 [&>svg:last-child]:transition-transform ${isCollapsed ? "[&>svg:last-child]:-rotate-90" : ""}`}
              >
                {rowCount}
              </Button>
            </div>
          </Cell>
        )}
      </div>
      {/* 非冻结部分 */}
      <div className="flex-1 bg-white-100" />
    </div>
  )
}

interface DataTableProps extends React.ComponentProps<"div">, VariantProps<typeof tableVariants> {
  data: TableData
}

function DataTable({ className, variant, data, ...props }: DataTableProps) {
  return (
    <TableProvider data={data}>
      <DataTableInner className={className} variant={variant} {...props} />
    </TableProvider>
  )
}

// 标记表头编辑面板是否打开，用于保持选中列状态
const HeaderPopoverOpenRefContext = React.createContext<React.MutableRefObject<boolean> | null>(null)

function DataTableInner({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof tableVariants>) {
  const { data, state, actions } = useTable()

  // 悬停列边缘状态
  const [hoveringColumnId, setHoveringColumnId] = React.useState<string | null>(null)
  // 拖拽列宽状态
  const [resizingColumnId, setResizingColumnId] = React.useState<string | null>(null)
  const [resizingStartX, setResizingStartX] = React.useState(0)
  const [resizingStartWidth, setResizingStartWidth] = React.useState(0)
  // 延迟显示分隔线的定时器
  const hoverDelayTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // 拖拽列顺序状态
  const [draggingColumnId, setDraggingColumnId] = React.useState<string | null>(null)
  const [dragTargetColumnId, setDragTargetColumnId] = React.useState<string | null>(null)
  const [dragInsertPosition, setDragInsertPosition] = React.useState<'left' | 'right' | null>(null)
  const [dragOverlayLeft, setDragOverlayLeft] = React.useState(0)
  const [dragReady, setDragReady] = React.useState(false)
  const dragStartXRef = React.useRef(0)
  const dragTargetColRef = React.useRef<string | null>(null)
  const dragInsertPosRef = React.useRef<'left' | 'right' | null>(null)
  const dragJustEndedRef = React.useRef(false)
  const isHeaderPopoverOpenRef = React.useRef(false)

  const columnIds = data.columns.map((col) => col.id)

  const headerRow = {
    id: "header",
    cells: data.columns.map((col) => ({
      id: col.id,
      type: col.type === "checkbox" ? "checkbox" : "text",  // 表头始终用 text（除 checkbox）
      value: col.type === "checkbox" ? false : col.title ?? "",
      width: col.width,
    })),
  }

  // 计算行总宽度
  const rowWidth = columnIds.reduce((sum, colId) => {
    return sum + (state.columnWidths[colId] ?? 80)
  }, 0)

  // 计算冻结列总宽度
  const frozenWidth = columnIds.reduce((sum, colId) => {
    if (state.frozenColumns.has(colId)) {
      return sum + (state.columnWidths[colId] ?? 80)
    }
    return sum
  }, 0)

  // 找到 checkbox 列宽度
  const checkboxColumnId = data.columns.find(col => col.type === "checkbox")?.id
  const checkboxColumnWidth = checkboxColumnId ? (state.columnWidths[checkboxColumnId] ?? 40) : 40

  // 计算冻结列中非 checkbox 列的总宽度，用于分组标题行第二个单元格
  const frozenNonCheckboxWidth = columnIds.reduce((sum, colId) => {
    if (state.frozenColumns.has(colId) && colId !== checkboxColumnId) {
      return sum + (state.columnWidths[colId] ?? 80)
    }
    return sum
  }, 0)

  // 计算分组数据
  const groupedData = React.useMemo(() => {
    if (!state.groupColumnId) return null

    const groupColumnIndex = columnIds.findIndex(id => id === state.groupColumnId)
    if (groupColumnIndex === -1) return null

    const groups: GroupedData[] = []
    const groupMap = new Map<string, RowData[]>()

    data.rows.forEach(row => {
      const groupValue = String(row.cells[groupColumnIndex]?.value ?? "")
      if (!groupMap.has(groupValue)) {
        groupMap.set(groupValue, [])
      }
      groupMap.get(groupValue)!.push(row)
    })

    groupMap.forEach((rows, groupValue) => {
      groups.push({ groupValue, rows })
    })

    // 空值分组排在末尾
    groups.sort((a, b) => {
      if (!a.groupValue && b.groupValue) return 1
      if (a.groupValue && !b.groupValue) return -1
      return 0
    })

    return groups
  }, [state.groupColumnId, columnIds, data.rows])

  // 计算分割线位置（用于悬停和拖拽）
  const resizeLineLeft = React.useMemo(() => {
    const targetColumnId = resizingColumnId || hoveringColumnId
    if (!targetColumnId) return 0
    let left = 0
    for (const colId of columnIds) {
      const width = state.columnWidths[colId] ?? 80
      if (colId === targetColumnId) {
        return left + width
      }
      left += width
    }
    return left
  }, [resizingColumnId, hoveringColumnId, columnIds, state.columnWidths])

  // 计算拖拽列顺序的分割线位置
  const dragLineLeft = React.useMemo(() => {
    if (!dragTargetColumnId || !dragInsertPosition) return 0
    let left = 0
    for (const colId of columnIds) {
      const width = state.columnWidths[colId] ?? 80
      if (colId === dragTargetColumnId) {
        return dragInsertPosition === 'left' ? left : left + width
      }
      left += width
    }
    return left
  }, [dragTargetColumnId, dragInsertPosition, columnIds, state.columnWidths])

  // 被拖拽列的宽度
  const dragColumnWidth = draggingColumnId ? (state.columnWidths[draggingColumnId] ?? 80) : 0

  // 处理拖拽开始
  const handleResizeStart = (columnId: string, startWidth: number, startX: number) => {
    // 清除悬停延迟定时器
    if (hoverDelayTimerRef.current) {
      clearTimeout(hoverDelayTimerRef.current)
      hoverDelayTimerRef.current = null
    }
    setResizingColumnId(columnId)
    setHoveringColumnId(null)
    setResizingStartX(startX)
    setResizingStartWidth(startWidth)
  }

  // 处理悬停边缘（带 1 秒延迟）
  const handleHoverEdge = React.useCallback((columnId: string | null) => {
    if (columnId) {
      // 鼠标进入边缘：启动 1 秒延迟定时器
      if (hoverDelayTimerRef.current) {
        clearTimeout(hoverDelayTimerRef.current)
      }
      hoverDelayTimerRef.current = setTimeout(() => {
        setHoveringColumnId(columnId)
        hoverDelayTimerRef.current = null
      }, 200)
    } else {
      // 鼠标离开边缘：清除定时器和悬停状态
      if (hoverDelayTimerRef.current) {
        clearTimeout(hoverDelayTimerRef.current)
        hoverDelayTimerRef.current = null
      }
      setHoveringColumnId(null)
    }
  }, [])

  // 处理拖拽过程
  React.useEffect(() => {
    if (!resizingColumnId) return

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - resizingStartX
      const newWidth = Math.max(40, resizingStartWidth + delta)
      actions.updateColumnWidth(resizingColumnId, newWidth)
    }

    const handleMouseUp = () => {
      setResizingColumnId(null)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [resizingColumnId, resizingStartX, resizingStartWidth, actions])

  // 点击表头单元格选中列
  const handleHeaderCellClick = React.useCallback((columnId: string, _cellType: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (state.selectedColumnId === columnId) return
    actions.selectColumn(columnId)
  }, [actions, state.selectedColumnId])

  // 拖拽列顺序：mousedown 记录起始位置，实际拖拽在 mousemove ≥4px 时启动
  const dragNativeCleanupRef = React.useRef<(() => void) | null>(null)

  const handleHeaderCellMouseDown = React.useCallback((columnId: string, e: React.MouseEvent) => {
    // 只在选中列 + 非冻结列时触发
    if (state.selectedColumnId !== columnId || state.frozenColumns.has(columnId)) return
    e.preventDefault()
    e.stopPropagation()
    dragStartXRef.current = e.clientX

    // 先用原生监听器等待首次移动，避免 setState 重渲染干扰 click 事件
    const handleMouseMove = (ev: MouseEvent) => {
      const deltaX = Math.abs(ev.clientX - dragStartXRef.current)
      if (deltaX >= 4) {
        // 达到拖拽阈值，切换到 React 状态驱动的拖拽模式
        cleanup()
        // 同步设置初始蒙层位置，避免闪现上一次拖拽的旧位置
        const tableRect = tableRef.current?.getBoundingClientRect()
        if (tableRect) {
          const colWidth = state.columnWidths[columnId] ?? 80
          setDragOverlayLeft(ev.clientX - tableRect.left - colWidth / 2)
        }
        setDraggingColumnId(columnId)
      }
    }

    const handleMouseUp = () => {
      cleanup()
    }

    const cleanup = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      dragNativeCleanupRef.current = null
    }

    dragNativeCleanupRef.current = cleanup
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [state.selectedColumnId, state.frozenColumns])

  // 清理原生监听器（组件卸载时）
  React.useEffect(() => {
    return () => {
      dragNativeCleanupRef.current?.()
    }
  }, [])

  // 拖拽列顺序过程（由 setDraggingColumnId 触发，此时已经过 ≥4px 阈值）
  React.useEffect(() => {
    if (!draggingColumnId) return

    const dragColumnWidth = state.columnWidths[draggingColumnId] ?? 80
    dragTargetColRef.current = null
    dragInsertPosRef.current = null
    setDragReady(true)

    // 拖拽列的索引，用于判断无意义的相邻插入
    const sourceIndex = columnIds.findIndex(id => id === draggingColumnId)

    const handleMouseMove = (e: MouseEvent) => {
      const tableRect = tableRef.current?.getBoundingClientRect()
      if (!tableRect) return

      // 蒙层位置：鼠标相对于表格左侧的位置（居中于鼠标）
      const mouseLeft = e.clientX - tableRect.left
      setDragOverlayLeft(mouseLeft - dragColumnWidth / 2)

      // 计算鼠标相对于表格的位置，找到目标列
      const mouseX = e.clientX - tableRect.left + (tableRef.current?.scrollLeft ?? 0)
      let currentLeft = 0
      let targetColId: string | null = null
      let insertPosition: 'left' | 'right' | null = null

      // 遍历所有列找到鼠标所在的列
      for (const colId of columnIds) {
        const width = state.columnWidths[colId] ?? 80
        const colCenter = currentLeft + width / 2

        if (mouseX >= currentLeft && mouseX < currentLeft + width) {
          targetColId = colId
          insertPosition = mouseX < colCenter ? 'left' : 'right'
          break
        }
        currentLeft += width
      }

      // 判断是否为无效目标（冻结列、自身、或插入后位置不变的相邻列）
      const isValid = (() => {
        if (!targetColId) return false
        if (state.frozenColumns.has(targetColId)) return false
        if (targetColId === draggingColumnId) return false
        if (sourceIndex === -1) return true

        const targetIndex = columnIds.findIndex(id => id === targetColId)
        // 右邻列 + insert left → 最终插入位置 = sourceIndex（无变化）
        if (targetIndex === sourceIndex + 1 && insertPosition === 'left') return false
        // 左邻列 + insert right → 最终插入位置 = sourceIndex（无变化）
        if (targetIndex === sourceIndex - 1 && insertPosition === 'right') return false

        return true
      })()

      if (isValid) {
        setDragTargetColumnId(targetColId)
        setDragInsertPosition(insertPosition)
        dragTargetColRef.current = targetColId
        dragInsertPosRef.current = insertPosition
      } else {
        setDragTargetColumnId(null)
        setDragInsertPosition(null)
        dragTargetColRef.current = null
        dragInsertPosRef.current = null
      }
    }

    const handleMouseUp = () => {
      if (dragTargetColRef.current && dragInsertPosRef.current && dragTargetColRef.current !== draggingColumnId) {
        actions.moveColumnOrder(draggingColumnId, dragTargetColRef.current, dragInsertPosRef.current)
      }
      setDraggingColumnId(null)
      setDragTargetColumnId(null)
      setDragInsertPosition(null)
      setDragReady(false)
      dragTargetColRef.current = null
      dragInsertPosRef.current = null
      // 标记拖拽刚结束，阻止后续 click 事件冒泡到 table 导致取消选中
      dragJustEndedRef.current = true
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [draggingColumnId, columnIds, state.columnWidths, state.frozenColumns, actions])

  // 点击其他区域清空选中列
  const handleTableClick = React.useCallback(() => {
    if (dragJustEndedRef.current) {
      dragJustEndedRef.current = false
      return
    }
    if (isHeaderPopoverOpenRef.current) return
    actions.selectColumn(null)
  }, [actions])

  // 监听 document 点击，点击表格外部时清空选中列
  const tableRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (!state.selectedColumnId) return

    const handleClickOutside = (e: MouseEvent) => {
      if (isHeaderPopoverOpenRef.current) return
      if (!tableRef.current?.contains(e.target as Node)) {
        actions.selectColumn(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [state.selectedColumnId, actions])

  return (
    <HeaderPopoverOpenRefContext.Provider value={isHeaderPopoverOpenRef}>
      <div
        ref={tableRef}
        data-slot="data-table"
        data-resizing={resizingColumnId || draggingColumnId ? "true" : undefined}
        className={cn(tableVariants({ variant, className }))}
        onClick={handleTableClick}
        {...props}
      >
      <div className="sticky top-0 z-20">
        <RowRenderer
          row={headerRow}
          isHeader
          columnIds={columnIds}
          onCellResizeStart={handleResizeStart}
          onCellHoverEdge={handleHoverEdge}
          onHeaderCellClick={handleHeaderCellClick}
          onHeaderCellMouseDown={handleHeaderCellMouseDown}
          draggingColumnId={draggingColumnId}
        />
      </div>
      <div>
        {groupedData ? (
          // 分组渲染
          groupedData.map(group => {
            const isCollapsed = state.collapsedGroups.has(group.groupValue)
            const isGroupSelected = group.rows.every(row => state.selectedRows.has(row.id))
            return (
              <React.Fragment key={group.groupValue}>
                <GroupHeaderRow
                  groupValue={group.groupValue}
                  rowCount={group.rows.length}
                  frozenWidth={frozenWidth}
                  rowWidth={rowWidth}
                  checkboxWidth={checkboxColumnWidth}
                  frozenNonCheckboxWidth={frozenNonCheckboxWidth}
                  isCollapsed={isCollapsed}
                  isGroupSelected={isGroupSelected}
                  onToggle={() => actions.toggleGroupCollapse(group.groupValue)}
                  onGroupSelect={() => actions.toggleGroupSelect(group.groupValue, group.rows)}
                  groupColumnId={state.groupColumnId!}
                />
                {!isCollapsed && (
                  <>
                    {group.rows.map(row => (
                      <RowRenderer key={row.id} row={row} columnIds={columnIds} />
                    ))}
                    {/* 插入行 */}
                    <div
                      data-slot="insert-row"
                      className="flex border-b border-neutral-2 bg-white-100"
                      style={{ width: `${rowWidth}px` }}
                    >
                      {/* 冻结部分 */}
                      <div
                        className="sticky left-0 z-10 flex bg-white-100 shadow-[2px_0_4px_-2px_var(--black-10)]"
                        style={{ width: `${frozenWidth}px` }}
                      >
                        {/* 第一个单元格：add 按钮 */}
                        <Cell width={checkboxColumnWidth} isLastCell={frozenNonCheckboxWidth === 0}>
                          <div className="flex items-center justify-center w-full h-full">
                            <Button
                              variant="ghost"
                              size="iconSm"
                              leftIcon="icon-add"
                              onClick={() => state.groupColumnId && actions.insertRowInGroup(group.groupValue, state.groupColumnId)}
                            />
                          </div>
                        </Cell>
                        {/* 第二个单元格：空 */}
                        {frozenNonCheckboxWidth > 0 && (
                          <Cell width={frozenNonCheckboxWidth} isLastCell={false}>{''}</Cell>
                        )}
                      </div>
                      {/* 非冻结部分 */}
                      <div className="flex-1 bg-white-100" />
                    </div>
                  </>
                )}
              </React.Fragment>
            )
          })
        ) : (
          // 普通渲染
          data.rows.map((row) => (
            <RowRenderer key={row.id} row={row} columnIds={columnIds} />
          ))
        )}
      </div>
      {/* 贯穿整个表格的分割线（悬停或拖拽列宽时显示） */}
      {(hoveringColumnId || resizingColumnId) && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2"
          style={{ left: `${resizeLineLeft}px` }}
        />
      )}
      {/* 拖拽列顺序分割线 */}
      {draggingColumnId && dragTargetColumnId && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2"
          style={{ left: `${dragLineLeft}px` }}
        />
      )}
      {/* 拖拽蒙层 */}
      {draggingColumnId && dragReady && (
        <div
          className="absolute top-0 bottom-0 bg-black-10 z-20 pointer-events-none"
          style={{
            left: `${dragOverlayLeft}px`,
            width: `${dragColumnWidth}px`,
          }}
        />
      )}
    </div>
    </HeaderPopoverOpenRefContext.Provider>
  )
}

export { DataTable, tableVariants }