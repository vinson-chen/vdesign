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
function HeaderTextCellInner({ cellId, value, columnId, currentColumnType, editView, setEditView }: {
  cellId: string
  value: string | boolean | number
  columnId?: string
  currentColumnType: CellType
  editView: boolean
  setEditView: (v: boolean) => void
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
    <>
      <span
        className="truncate cursor-pointer"
        onDoubleClick={() => actions.startEdit(cellId, String(value))}
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
        />
      </PopoverTrigger>
      <PopoverContent size="base" align="end" alignOffset={-8} className="w-[200px]">
        {/* 菜单视图 */}
        <div className={editView ? "hidden" : ""}>
          <PopoverMenuItem size="base" onClick={() => setEditView(true)}>
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
      </PopoverContent>
    </>
  )
}

// 表头文本单元格组件（带菜单）
function HeaderTextCell({ cellId, value, columnId }: { cellId: string; value: string | boolean | number; columnId?: string }) {
  const { data } = useTable()
  const [editView, setEditView] = React.useState(false)

  // 获取当前列类型
  const currentColumnType = columnId
    ? data.columns.find(col => col.id === columnId)?.type ?? "text"
    : "text"

  return (
    <Popover onOpenChange={(open) => open && setEditView(false)}>
      <HeaderTextCellInner
        cellId={cellId}
        value={value}
        columnId={columnId}
        currentColumnType={currentColumnType}
        editView={editView}
        setEditView={setEditView}
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
}

function RowRenderer({ row, isHeader, columnIds, onCellResizeStart, onCellHoverEdge }: RowRendererProps) {
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

        return (
          <Cell
            key={cell.id}
            width={width}
            variant={isHeader ? "header" : isSelected ? "selected" : "default"}
            isLastCell={isLast}
            resizable={isHeader && !isLast}
            onResizeStart={onCellResizeStart ? (startWidth, startX) => onCellResizeStart(columnId, startWidth, startX) : undefined}
            onHoverEdge={onCellHoverEdge ? (hovering) => onCellHoverEdge(hovering ? columnId : null) : undefined}
            slotClassName={isHeader && cell.type === "text" ? "justify-between" : cell.type === "checkbox" ? "justify-center" : undefined}
            className={cn(
              isHeader && cell.type === "text" && "group",
              isFrozen && "sticky",
              isHeader && isFrozen && "z-20",
              !isHeader && isFrozen && "z-10",
              isLastFrozen && "shadow-[2px_0_4px_-2px_var(--black-10)]"
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
function GroupHeaderRow({ groupValue, rowCount, frozenWidth, rowWidth, checkboxWidth, frozenNonCheckboxWidth, isCollapsed, isGroupSelected, onToggle, onGroupSelect }: {
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
}) {
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
          <Cell width={frozenNonCheckboxWidth} isLastCell={false}>
            <div className="flex items-center justify-between w-full">
              <span className="text-sm font-medium text-black-85">{groupValue}</span>
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

  // 处理拖拽开始
  const handleResizeStart = (columnId: string, startWidth: number, startX: number) => {
    setResizingColumnId(columnId)
    setHoveringColumnId(null)
    setResizingStartX(startX)
    setResizingStartWidth(startWidth)
  }

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

  return (
    <div
      data-slot="data-table"
      className={cn(tableVariants({ variant, className }))}
      {...props}
    >
      <div className="sticky top-0 z-20">
        <RowRenderer
          row={headerRow}
          isHeader
          columnIds={columnIds}
          onCellResizeStart={handleResizeStart}
          onCellHoverEdge={setHoveringColumnId}
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
                />
                {!isCollapsed && group.rows.map(row => (
                  <RowRenderer key={row.id} row={row} columnIds={columnIds} />
                ))}
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
      {/* 贯穿整个表格的分割线（悬停或拖拽时显示） */}
      {(hoveringColumnId || resizingColumnId) && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-6 z-20"
          style={{ left: `${resizeLineLeft}px` }}
        />
      )}
    </div>
  )
}

export { DataTable, tableVariants }