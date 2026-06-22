import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { TableProvider, useTable, useTableData, useTableState, useTableActions, useFirstDataColumn, CellRenderersContext } from "@/hooks"
import type { TableData, CellType, GroupedData, RowData, CellRendererRegistry, DataTableHandle, CellEditEvent } from "@/types/table"
import { Cell } from "./cell"
import { Checkbox } from "./checkbox"
import { Button } from "./button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverContext,
} from "./popover"
import { HeaderCellMenuView } from "./header-cell-menu"
import { HeaderCellEditView } from "./header-cell-edit"
import { HeaderCellHideManagerView } from "./header-cell-hide-manager"
import { HeaderCellDimensionView } from "./header-cell-dimension"
import { TextCellRenderer } from "./cell-renderers"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./tooltip"

const tableVariants = cva("flex flex-col relative", {
  variants: {
    variant: {
      base: "border border-neutral-2 bg-white-100",
      plain: "",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-md",
      base: "rounded-lg",
    },
  },
  defaultVariants: {
    variant: "base",
    radius: "none",
  },
})

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

interface CellContentProps {
  cellId: string
  type?: string
  value: string | boolean | number
  rowId?: string
  isHeader?: boolean
  columnId?: string
  rowIndex?: number
  cellOptions?: Record<string, unknown>
  isCellHovering?: boolean
}

// 表头文本单元格内部组件（访问 Popover Context）
function HeaderTextCellInner({ cellId: _cellId, value, columnId, currentColumnType, editView, setEditView, hideColumnView, setHideColumnView, dimensionView, setDimensionView, onDoubleClickTitle }: {
  cellId: string
  value: string | boolean | number
  columnId?: string
  currentColumnType: CellType
  editView: boolean
  setEditView: (v: boolean) => void
  hideColumnView: boolean
  setHideColumnView: (v: boolean) => void
  dimensionView: boolean
  setDimensionView: (v: boolean) => void
  onDoubleClickTitle: () => void
}) {
  const state = useTableState()
  const actions = useTableActions()
  const data = useTableData()
  const { close, isOpen } = React.useContext(PopoverContext)
  const { isFirstDataColumn, firstDataColumnId } = useFirstDataColumn(columnId)
  // 使用 columnMap O(1) 查找，替代 Array.find() O(n)
  const currentColumnDef = columnId ? data.columnMap?.get(columnId) : undefined

  return (
    <>
      <TruncatedText
        className="truncate cursor-pointer flex-1"
        onDoubleClick={onDoubleClickTitle}
      >
        {String(value)}
      </TruncatedText>
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
            if (state.lockedCellId) {
              actions.lockCell(null)
            }
          }}
          onDoubleClick={(e) => e.stopPropagation()}
        />
      </PopoverTrigger>
      <PopoverContent align="end" alignOffset={-8} sideOffset={8} className="w-[200px]">
        <div onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
          {!editView && !hideColumnView && !dimensionView && (
            <HeaderCellMenuView
              columnId={columnId}
              isFirstDataColumn={isFirstDataColumn}
              groupColumnId={state.groupColumnId}
              readOnly={state.readOnly}
              onEdit={() => setEditView(true)}
              onHideManager={() => setHideColumnView(true)}
              onDimension={() => setDimensionView(true)}
            />
          )}
          {editView && (
            <HeaderCellEditView
              columnId={columnId}
              value={value}
              currentColumnType={currentColumnType}
              currentColumnDef={currentColumnDef}
              onClose={close}
            />
          )}
          {hideColumnView && (
            <HeaderCellHideManagerView firstDataColumnId={firstDataColumnId} />
          )}
          {dimensionView && (
            <HeaderCellDimensionView />
          )}
        </div>
      </PopoverContent>
    </>
  )
}

// 表头文本单元格组件（带菜单）
function HeaderTextCell({ cellId, value, columnId }: { cellId: string; value: string | boolean | number; columnId?: string }) {
  const data = useTableData()
  const [editView, setEditView] = React.useState(false)
  const [hideColumnView, setHideColumnView] = React.useState(false)
  const [dimensionView, setDimensionView] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const isHeaderPopoverOpenRef = React.useContext(HeaderPopoverOpenRefContext)

  // 获取当前列类型 — 使用 columnMap O(1) 查找
  const currentColumnType = columnId
    ? data.columnMap?.get(columnId)?.type ?? "text"
    : "text"

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (newOpen) {
      setEditView(false)
      setHideColumnView(false)
      setDimensionView(false)
    }
    // 标记面板开关状态，确保取消选中逻辑被阻断
    if (isHeaderPopoverOpenRef) isHeaderPopoverOpenRef.current = newOpen
  }

  const handleDoubleClick = () => {
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
        hideColumnView={hideColumnView}
        setHideColumnView={setHideColumnView}
        dimensionView={dimensionView}
        setDimensionView={setDimensionView}
        onDoubleClickTitle={handleDoubleClick}
      />
    </Popover>
  )
}

function CellContent({ cellId, type, value, rowId, isHeader, columnId, rowIndex, cellOptions, isCellHovering }: CellContentProps) {
  const state = useTableState()
  const actions = useTableActions()
  const data = useTableData()
  const cellRenderers = React.useContext(CellRenderersContext)
  // 表头 checkbox 单元格内部悬停状态
  const [isHeaderCheckboxHovering, setIsHeaderCheckboxHovering] = React.useState(false)

  // 表头 checkbox → 默认显示 icon，悬停或全选时显示 checkbox
  if (isHeader && type === "checkbox") {
    const showCheckbox = isHeaderCheckboxHovering || state.selectAll
    return (
      <div
        className="flex items-center justify-center w-full h-full"
        onMouseEnter={() => setIsHeaderCheckboxHovering(true)}
        onMouseLeave={() => setIsHeaderCheckboxHovering(false)}
      >
        {showCheckbox ? (
          <Checkbox
            checked={state.selectAll}
            onChange={() => actions.toggleSelectAll()}
          />
        ) : (
          <svg className="icon text-black-25" aria-hidden="true"><use xlinkHref="#icon-vcell-logo" /></svg>
        )}
      </div>
    )
  }

  // 表头文本单元格 → 仍由表格内部处理
  if (isHeader) {
    return <HeaderTextCell cellId={cellId} value={value} columnId={columnId} />
  }

  // 表体 checkbox → 默认显示序号，选中时显示 checkbox
  if (type === "checkbox") {
    const isSelected = rowId ? state.selectedRows.has(rowId) : false
    const showCheckbox = isCellHovering || isSelected
    return (
      <div className="flex items-center justify-center w-full h-full">
        {showCheckbox ? (
          <Checkbox
            checked={isSelected}
            onChange={() => {
              if (rowId) {
                actions.toggleRowSelect(rowId)
              }
            }}
          />
        ) : (
          <span className="text-sm text-black-25">{rowIndex ?? 1}</span>
        )}
      </div>
    )
  }

  // 表体单元格 → 查找渲染器
  const Renderer = cellRenderers[type || 'text'] || TextCellRenderer
  // 使用 columnMap O(1) 查找，替代 Array.find() O(n)
  const columnDef = columnId ? data.columnMap?.get(columnId) : undefined

  // 合并 options：单元格级优先于列级
  const mergedOptions = cellOptions ? { ...columnDef?.options, ...cellOptions } : columnDef?.options

  // 判断是否为锁定态
  const isLocked = state.lockedCellId === cellId

  // 获取当前单元格的完整数据（从 rows 中查找）
  const currentRow = rowId ? data.rows.find(r => r.id === rowId) : undefined
  const currentCell = currentRow?.cells.find(c => c.id === cellId)

  return (
    <Renderer
      value={value}
      cellId={cellId}
      rowId={rowId!}
      columnId={columnId!}
      onChange={(newValue: unknown) => actions.updateCellValue(cellId, newValue)}
      isEditing={state.editingCellId === cellId}
      isLocked={isLocked}
      isCellHovering={isCellHovering}
      readOnly={state.readOnly}
      onStartEdit={() => actions.startEdit(cellId, String(value))}
      onLockCell={() => actions.lockCell(cellId)}
      options={mergedOptions}
      cellData={currentCell}
      editingValue={state.editingValue}
      onUpdateEditingValue={actions.updateEditingValue}
      onFinishEdit={actions.finishEdit}
      onCancelEdit={actions.cancelEdit}
      onUpdateColumnOptions={(newOptions: Record<string, unknown>) => actions.updateColumnOptions(columnId!, newOptions)}
    />
  )
}

interface CellDef {
  id: string
  type?: string
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
  isLastRow?: boolean  // 可选，标记最后一行
  columnIds?: string[]
  rowIndex?: number
  onCellResizeStart?: (columnId: string, startWidth: number, startX: number) => void
  onCellHoverEdge?: (columnId: string | null) => void
  onHeaderCellClick?: (columnId: string, cellType: string, e: React.MouseEvent) => void
  onHeaderCellMouseDown?: (columnId: string, e: React.MouseEvent) => void
  draggingColumnId?: string | null
  onCellHover?: (cellId: string | null) => void
  hoveringCellId?: string | null
  onBodyCellClick?: (cellId: string, e: React.MouseEvent) => void
  // 性能优化：由父级预计算，避免每行重复计算
  frozenOffsets?: Record<string, number>
  frozenWidth?: number
  rowWidth?: number
  // 虚拟化支持
  style?: React.CSSProperties
  // 分组模式下分组列ID（用于表头顶部描边）
  groupColumnId?: string
  // 表格内容是否溢出容器（用于控制冻结列投影）
  hasOverflow?: boolean
}

// Memo 化 RowRenderer：避免父组件 hover 等状态变化时全量重渲染
const RowRenderer = React.memo(function RowRenderer({ row, isHeader, isLastRow: _isLastRow, columnIds, rowIndex, onCellResizeStart, onCellHoverEdge, onHeaderCellClick, onHeaderCellMouseDown, draggingColumnId, onCellHover, hoveringCellId, onBodyCellClick, frozenOffsets = {}, frozenWidth = 0, rowWidth: rowWidthProp, style, groupColumnId, hasOverflow }: RowRendererProps) {
  const state = useTableState()
  const data = useTableData()
  const actions = useTableActions()
  const isSelected = !isHeader && state.selectedRows.has(row.id)

  // 行宽由父级预计算传入，仅表头需要在组件内 fallback
  const rowWidth = rowWidthProp ?? row.cells.reduce((sum, cell, index) => {
    const cid = columnIds?.[index] ?? cell.id
    const columnDef = data.columns[index]
    const cellWidth = cell.width === 'auto' ? 40 : (cell.width ?? (columnDef?.width === 'auto' ? 40 : columnDef?.width ?? 80))
    const width = state.columnWidths[cid] ?? cellWidth
    return sum + width
  }, 0)

  return (
    <div
      data-slot="row"
      data-slot-id={row.id}
      className={cn(
        "flex border-b border-neutral-2",
        isSelected && "bg-brand-1"
      )}
      style={style ?? { minWidth: `${rowWidth}px`, width: (isHeader && !state.readOnly) ? '100%' : `${rowWidth}px` }}
    >
      {row.cells.map((cell, index) => {
        const columnId = columnIds?.[index] ?? cell.id
        const columnDef = data.columns[index]
        // 单元格属性：优先从 CellData 获取，否则从 ColumnDef 继承
        const cellType = cell.type ?? columnDef?.type ?? "text"
        // 处理 width：'auto' 转换为固定宽度 40
        const rawWidth = cell.width ?? columnDef?.width ?? 80
        const cellWidth = rawWidth === 'auto' ? 40 : rawWidth
        const width = state.columnWidths[columnId] ?? cellWidth
        const isFrozen = state.frozenColumns.has(columnId)
        const frozenLeft = frozenOffsets[columnId] ?? 0
        const isLastFrozen = isFrozen && frozenLeft + width === frozenWidth

        const isEditing = !isHeader && state.editingCellId === cell.id && cellType === "text"
        const isColumnSelected = state.selectedColumnId === columnId
        const isLocked = !isHeader && state.lockedCellId === cell.id
        const isCellHovering = !isHeader && hoveringCellId === cell.id

        // 表头 variant 优先级：headerSelected > header
        // 表体 variant 优先级：editing > locked > selected(行或列) > defaultHover > default
        const cellVariant = isHeader
          ? (isColumnSelected ? "headerSelected" : "header")
          : isEditing
            ? "editing"
            : isLocked
              ? "locked"
              : (isSelected || isColumnSelected)
                ? "selected"
                : (isCellHovering && !state.readOnly ? "defaultHover" : "default")

        // 光标：选中列 + 非冻结 + 非拖拽中 = grab
        const showGrabCursor = isHeader && isColumnSelected && !isFrozen && !draggingColumnId
        // 拖拽中 = grabbing
        const showGrabbingCursor = isHeader && draggingColumnId && draggingColumnId === state.selectedColumnId

        return (
          <Cell
            key={cell.id}
            columnId={columnId}
            data-cell-id={!isHeader ? cell.id : undefined}
            width={width}
            variant={cellVariant}
            isLastCell={false}
            resizable={isHeader && cellType !== "checkbox"}
            onResizeStart={onCellResizeStart ? (startWidth, startX) => onCellResizeStart(columnId, startWidth, startX) : undefined}
            onHoverEdge={onCellHoverEdge ? (hovering) => onCellHoverEdge(hovering ? columnId : null) : undefined}
            onClick={isHeader && cellType !== "checkbox" && onHeaderCellClick
              ? (e: React.MouseEvent) => onHeaderCellClick(columnId, cellType, e)
              : !isHeader && cellType !== "checkbox" && onBodyCellClick
                ? (e: React.MouseEvent) => onBodyCellClick(cell.id, e)
                : undefined}
            onMouseEnter={!isHeader && onCellHover ? () => onCellHover(cell.id) : undefined}
            onMouseLeave={!isHeader && onCellHover ? () => onCellHover(null) : undefined}
            onMouseDown={isHeader && cellType !== "checkbox" && !isFrozen && isColumnSelected && onHeaderCellMouseDown ? (e: React.MouseEvent) => onHeaderCellMouseDown(columnId, e) : undefined}
            slotClassName={isHeader && cellType === "text" ? "justify-between" : cellType === "checkbox" ? "justify-center" : undefined}
            className={cn(
              isHeader && cellType === "text" && "group",
              isFrozen && "sticky",
              isHeader && isFrozen && "z-20",
              isHeader && isFrozen && "top-0",
              !isHeader && isFrozen && "z-10",
              isLastFrozen && hasOverflow && "shadow-[2px_0_4px_-2px_var(--black-10)]",
              // 光标
              showGrabCursor && "cursor-grab",
              showGrabbingCursor && "cursor-grabbing",
              // 分组模式下分组列的表头顶部描边
              isHeader && groupColumnId && columnId === groupColumnId && "border-t-2 border-neutral-2",
              // readOnly 模式下去掉最后一列右描边，避免与容器描边重叠
              state.readOnly && index === row.cells.length - 1 && "!border-r-0",
            )}
            style={isFrozen ? { left: frozenLeft } : undefined}
          >
            <CellContent
              cellId={cell.id}
              type={cellType}
              value={cell.value}
              rowId={isHeader ? undefined : row.id}
              isHeader={isHeader}
              columnId={columnId}
              rowIndex={rowIndex}
              cellOptions={(cell as { options?: Record<string, unknown> }).options}
              isCellHovering={isCellHovering}
            />
          </Cell>
        )
      })}
      {/* 插入列：仅表头渲染，readOnly 模式下隐藏 */}
      {isHeader && !state.readOnly && (
        <Cell
          variant="header"
          isLastCell={true}
          className="flex-1 min-w-[40px] cursor-pointer"
          onClick={() => {
            const lastColumnId = columnIds![columnIds!.length - 1]
            if (lastColumnId) actions.insertColumnRight(lastColumnId)
          }}
        >
          <div className="flex items-center w-full h-full">
            <Button variant="ghost" size="iconSm" leftIcon="icon-add" />
          </div>
        </Cell>
      )}
    </div>
  )
}, (prev, next) => {
  // 自定义比较函数：只有这些 props 变化时才重渲染
  return prev.row === next.row
    && prev.isHeader === next.isHeader
    && prev.columnIds === next.columnIds
    && prev.rowIndex === next.rowIndex
    && prev.hoveringCellId === next.hoveringCellId
    && prev.draggingColumnId === next.draggingColumnId
    && prev.onCellResizeStart === next.onCellResizeStart
    && prev.onCellHoverEdge === next.onCellHoverEdge
    && prev.onHeaderCellClick === next.onHeaderCellClick
    && prev.onHeaderCellMouseDown === next.onHeaderCellMouseDown
    && prev.onCellHover === next.onCellHover
    && prev.onBodyCellClick === next.onBodyCellClick
    && prev.frozenOffsets === next.frozenOffsets
    && prev.frozenWidth === next.frozenWidth
    && prev.rowWidth === next.rowWidth
    && prev.groupColumnId === next.groupColumnId
    && prev.hasOverflow === next.hasOverflow
})

// 分组标题行组件
function GroupHeaderRow({ groupValue, rowCount, frozenWidth, rowWidth, checkboxWidth, frozenNonCheckboxWidth, isCollapsed, isGroupSelected, onToggle, onGroupSelect, groupColumnId, isCheckboxHidden, hasOverflow }: {
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
  isCheckboxHidden?: boolean
  hasOverflow?: boolean
}) {
  const { state, actions } = useTable()
  const cellId = `group-header-${groupValue}`
  const isEditing = state.editingCellId === cellId
  // readOnly 模式下无悬停态
  const [hoveringCell, setHoveringCell] = React.useState<'checkbox' | 'title' | null>(null)

  // 编辑完成时同步更新分组列所有单元格
  const handleFinishEdit = () => {
    if (state.editingValue !== groupValue) {
      actions.updateGroupValues(groupValue, state.editingValue, groupColumnId)
    }
    actions.finishEdit()
  }

  // 隐藏 checkbox 列时，调整冻结宽度（减去 checkbox 列宽度）
  const adjustedFrozenWidth = isCheckboxHidden ? frozenNonCheckboxWidth : frozenWidth

  return (
    <div
      data-slot="group-header"
      data-slot-id={`group-${groupValue}`}
      className="flex border-y border-neutral-2 mt-3 bg-white-100"
      style={{ width: `${rowWidth}px` }}
    >
      {/* 冻结部分 */}
      <div
        className={cn(
          "sticky left-0 z-10 flex bg-white-100",
          hasOverflow && "shadow-[2px_0_4px_-2px_var(--black-10)]"
        )}
        style={{ width: `${adjustedFrozenWidth}px` }}
      >
        {/* 第一个单元格：checkbox 全选该组（仅当 checkbox 列可见时渲染） */}
        {!isCheckboxHidden && (
          <Cell width={checkboxWidth} isLastCell={false} variant={!state.readOnly && hoveringCell === 'checkbox' ? "defaultHover" : "default"}
            onMouseEnter={() => !state.readOnly && setHoveringCell('checkbox')}
            onMouseLeave={() => setHoveringCell(null)}
          >
            <div className="flex items-center justify-center w-full h-full">
              <Checkbox checked={isGroupSelected} onChange={onGroupSelect} />
            </div>
          </Cell>
        )}
        {/* 第二个单元格：分组标题 + 展开/收起按钮 */}
        {frozenNonCheckboxWidth > 0 && (
          <Cell width={frozenNonCheckboxWidth} isLastCell={false} variant={isEditing ? "editing" : (!state.readOnly && hoveringCell === 'title' ? "defaultHover" : "default")}
            onMouseEnter={() => !state.readOnly && setHoveringCell('title')}
            onMouseLeave={() => setHoveringCell(null)}
          >
            <div className="relative flex items-center justify-between w-full h-6">
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
                  className="absolute inset-0 bg-transparent border-none outline-none text-inherit font-inherit overflow-hidden"
                  autoFocus
                />
              ) : (
                <TruncatedText
                  className={cn(
                    "text-sm truncate",
                    !state.readOnly && "cursor-pointer",
                    groupValue ? "font-medium text-black-85" : "font-normal text-black-25"
                  )}
                  onDoubleClick={state.readOnly ? undefined : () => actions.startEdit(cellId, groupValue)}
                >
                  {groupValue || "空值组"}
                </TruncatedText>
              )}
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  rightIcon="icon-chevron-down"
                  onClick={onToggle}
                  className={`text-black-55 [&>svg:last-child]:transition-transform ${isCollapsed ? "[&>svg:last-child]:-rotate-90" : ""}`}
                >
                  {rowCount}
                </Button>
              )}
            </div>
          </Cell>
        )}
      </div>
      {/* 非冻结部分 */}
      <Cell variant="default" isLastCell={state.readOnly} className="flex-1">{''}</Cell>
    </div>
  )
}

// 插入行组件（分组和非分组共用）
function InsertRow({ rowWidth, showBorder, isHovering, onHoverChange, onInsert, frozenWidth, checkboxWidth, isCheckboxHidden }: {
  rowWidth: number
  showBorder: boolean
  isHovering: boolean
  onHoverChange: (hovering: boolean) => void
  onInsert: () => void
  frozenWidth: number
  checkboxWidth: number
  isCheckboxHidden: boolean
}) {
  const cellWidth = isCheckboxHidden ? frozenWidth - checkboxWidth : frozenWidth
  const insertId = React.useId()
  return (
    <div
      data-slot="insert-row"
      data-slot-id={insertId}
      className={cn(
        "flex bg-white-100 cursor-pointer",
        showBorder && "border-b border-neutral-2",
        isHovering && "bg-neutral-1"
      )}
      style={{ width: `${rowWidth}px` }}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onClick={onInsert}
    >
      {/* 冻结区 */}
      <Cell
        width={cellWidth}
        variant="default"
        isLastCell={true}
        className="sticky left-0 z-10 bg-transparent cursor-pointer"
      >
        <div className="flex items-center w-full h-full">
          <Button variant="ghost" size="iconSm" leftIcon="icon-add" />
        </div>
      </Cell>
      {/* 非冻结区 */}
      <Cell variant="default" isLastCell={false} className="flex-1 cursor-pointer bg-transparent">{''}</Cell>
    </div>
  )
}

interface DataTableProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tableVariants> {
  data: TableData
  cellRenderers?: CellRendererRegistry
  readOnly?: boolean
  /** 是否自带滚动容器（含边框+圆角），默认 false */
  contained?: boolean
  /** 分组收起状态变更回调，业务层可用于持久化（如 localStorage） */
  onCollapsedGroupsChange?: (groups: string[]) => void
  /** 单元格值变更回调，编辑完成时触发 */
  onCellValueChange?: (event: CellEditEvent) => void
}

// 监听 collapsedGroups 变更并通知业务层
function CollapsedGroupsNotifier({ onChange }: { onChange?: (groups: string[]) => void }) {
  const state = useTableState()
  const prevRef = React.useRef(state.collapsedGroups)
  React.useEffect(() => {
    if (prevRef.current !== state.collapsedGroups) {
      prevRef.current = state.collapsedGroups
      onChange?.(Array.from(state.collapsedGroups))
    }
  }, [state.collapsedGroups, onChange])
  return null
}

const DataTable = React.forwardRef<DataTableHandle, DataTableProps>(function DataTable({ className, variant, radius, data, cellRenderers, readOnly, contained = false, onCollapsedGroupsChange, onCellValueChange, ...props }, ref) {
  // contained 模式下，边框和圆角提升到外层滚动容器，表格内部不透出边框
  const wrapperClass = contained
    ? tableVariants({ variant, radius })
    : ""
  const innerVariant = contained ? "plain" as const : variant
  const innerRadius = contained ? "none" as const : radius

  const inner = (
    <DataTableInner ref={ref} className={className} variant={innerVariant} radius={innerRadius} {...props} />
  )
  return (
    <TableProvider data={data} cellRenderers={cellRenderers} readOnly={readOnly} onCellValueChange={onCellValueChange}>
      <CollapsedGroupsNotifier onChange={onCollapsedGroupsChange} />
      <TooltipProvider>
        {contained ? (
          <div className={cn("max-h-full min-h-0 overflow-auto overscroll-none w-fit max-w-full", wrapperClass)}>
            {inner}
          </div>
        ) : (
          inner
        )}
      </TooltipProvider>
    </TableProvider>
  )
})

// 标记表头编辑面板是否打开，用于保持选中列状态
const HeaderPopoverOpenRefContext = React.createContext<React.MutableRefObject<boolean> | null>(null)

const DataTableInner = React.forwardRef<DataTableHandle, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof tableVariants> & { slotId?: string }>(function DataTableInner({
  className,
  variant,
  radius,
  slotId,
  ...props
}, ref) {
  const { data, state, actions } = useTable()
  const id = React.useId()

  // 对外暴露撤回/恢复操作句柄
  React.useImperativeHandle(ref, () => ({
    undo: actions.undo,
    redo: actions.redo,
  }), [actions.undo, actions.redo])

  // 悬停列边缘状态
  const [hoveringColumnId, setHoveringColumnId] = React.useState<string | null>(null)
  // 悬停单元格状态
  const [hoveringCellId, setHoveringCellId] = React.useState<string | null>(null)
  // 悬停分组插入行单元格状态：{groupValue, cell: 'add' | 'empty'}
  const [hoveringGroupInsertCell, setHoveringGroupInsertCell] = React.useState<{groupValue: string, cell: 'add' | 'empty'} | null>(null)
  // 悬停底部插入行单元格状态
  const [insertRowHoveringCell, setInsertRowHoveringCell] = React.useState<'add' | 'empty' | null>(null)
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

  // 找到 checkbox 列（从 allColumns 中查找，因为 data.columns 可能已过滤隐藏列）
  const checkboxColumnId = state.allColumns.find(col => col.type === "checkbox")?.id
  const checkboxColumnWidth = checkboxColumnId ? (state.columnWidths[checkboxColumnId] ?? 40) : 40
  // checkbox 列是否隐藏（无 checkbox 列时视为隐藏）
  const isCheckboxHidden = checkboxColumnId ? state.hiddenColumns.has(checkboxColumnId) : true

  // 计算冻结列中非 checkbox 列的总宽度，用于分组标题行第二个单元格
  const frozenNonCheckboxWidth = columnIds.reduce((sum, colId) => {
    if (state.frozenColumns.has(colId) && colId !== checkboxColumnId) {
      return sum + (state.columnWidths[colId] ?? 80)
    }
    return sum
  }, 0)

  // 性能优化：预计算冻结列偏移量（替代每行独立计算）
  const frozenOffsets = React.useMemo(() => {
    const offsets: Record<string, number> = {}
    let accum = 0
    columnIds.forEach(colId => {
      if (state.frozenColumns.has(colId)) {
        offsets[colId] = accum
        accum += state.columnWidths[colId] ?? 80
      }
    })
    return offsets
  }, [columnIds, state.frozenColumns, state.columnWidths])

  // 计算分组数据（使用原始数据获取分组值，但存储过滤后的行用于渲染）
  const groupedData = React.useMemo(() => {
    if (!state.groupColumnId) return null

    // 从原始列中查找分组列索引（不受隐藏列影响）
    const groupColumnIndex = state.allColumns.findIndex(col => col.id === state.groupColumnId)
    if (groupColumnIndex === -1) return null

    const groups: GroupedData[] = []
    const groupMap = new Map<string, RowData[]>()

    // 使用原始行数据获取分组值（含隐藏列的单元格）
    const allRows = data.allRows ?? data.rows
    // 建立原始行ID → 过滤后行的映射
    const rowIdToFilteredRow = new Map<string, RowData>()
    data.rows.forEach(filteredRow => rowIdToFilteredRow.set(filteredRow.id, filteredRow))

    allRows.forEach(row => {
      const groupValue = String(row.cells[groupColumnIndex]?.value ?? "")
      if (!groupMap.has(groupValue)) {
        groupMap.set(groupValue, [])
      }
      // 存储过滤后的行（用于渲染，单元格数与可见列匹配）
      const filteredRow = rowIdToFilteredRow.get(row.id)
      if (filteredRow) {
        groupMap.get(groupValue)!.push(filteredRow)
      }
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
  }, [state.groupColumnId, state.allColumns, data.allRows, data.rows])

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
    // 只在选中列 + 非冻结列时触发（readOnly 模式也支持拖拽）
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

  // 点击其他区域清空选中列和锁定态
  const handleTableClick = React.useCallback(() => {
    if (dragJustEndedRef.current) {
      dragJustEndedRef.current = false
      return
    }
    if (isHeaderPopoverOpenRef.current) return
    actions.selectColumn(null)
    actions.lockCell(null)
  }, [actions])

  // 处理表体单元格点击（锁定态）
  const handleBodyCellClick = React.useCallback((cellId: string, e: React.MouseEvent) => {
    // readOnly 模式下禁用锁定态
    if (state.readOnly) return
    // 阻止事件冒泡到表格层（防止 handleTableClick 清空锁定态）
    e.stopPropagation()
    // 过滤组件元素点击（按钮、输入框、下拉等）→ 不改变锁定态
    const target = e.target as HTMLElement
    if (target.closest('button, input, select, a, [role="button"], [data-slot="select-trigger"]')) {
      return
    }
    // 非组件区域点击 → 切换锁定态
    actions.lockCell(cellId)
  }, [actions, state.readOnly])

  // 键盘导航：获取当前锁定单元格的行列索引
  const getLockedCellPosition = React.useCallback(() => {
    if (!state.lockedCellId) return null
    // 遍历所有行和列找到锁定单元格的位置
    const allRows = state.groupColumnId
      ? (groupedData?.flatMap(g => state.collapsedGroups.has(g.groupValue) ? [] : g.rows) ?? data.rows)
      : data.rows
    for (let rowIndex = 0; rowIndex < allRows.length; rowIndex++) {
      const row = allRows[rowIndex]
      if (!row) continue
      for (let colIndex = 0; colIndex < row.cells.length; colIndex++) {
        if (row.cells[colIndex]?.id === state.lockedCellId) {
          return { rowIndex, colIndex, rowId: row.id }
        }
      }
    }
    return null
  }, [state.lockedCellId, state.groupColumnId, state.collapsedGroups, groupedData, data.rows])

  // 键盘导航：根据方向移动锁定态（跳过 checkbox 列）
  const navigateLockedCell = React.useCallback((direction: 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight') => {
    const pos = getLockedCellPosition()
    if (!pos) return

    // 获取可见行（跳过折叠分组）
    const visibleRows = state.groupColumnId
      ? (groupedData?.flatMap(g => state.collapsedGroups.has(g.groupValue) ? [] : g.rows) ?? data.rows)
      : data.rows

    let newRowIndex = pos.rowIndex
    let newColIndex = pos.colIndex

    // 横向导航：跳过 checkbox 列
    if (direction === 'ArrowLeft' || direction === 'ArrowRight') {
      const step = direction === 'ArrowLeft' ? -1 : 1
      const maxCol = (visibleRows[pos.rowIndex]?.cells.length ?? 1) - 1
      let candidateCol = pos.colIndex + step
      // 循环找到下一个非 checkbox 列
      while (candidateCol >= 0 && candidateCol <= maxCol) {
        const candidateCell = visibleRows[pos.rowIndex]?.cells[candidateCol]
        if (candidateCell && candidateCell.type !== 'checkbox') {
          newColIndex = candidateCol
          break
        }
        candidateCol += step
      }
    } else {
      // 纵向导航
      switch (direction) {
        case 'ArrowUp':
          newRowIndex = Math.max(0, pos.rowIndex - 1)
          break
        case 'ArrowDown':
          newRowIndex = Math.min(visibleRows.length - 1, pos.rowIndex + 1)
          break
      }
    }

    // 如果位置没变化，不做任何事
    if (newRowIndex === pos.rowIndex && newColIndex === pos.colIndex) return

    const targetCell = visibleRows[newRowIndex]?.cells[newColIndex]
    // 确保目标单元格不是 checkbox
    if (targetCell && targetCell.type !== 'checkbox') {
      actions.lockCell(targetCell.id)
    }
  }, [getLockedCellPosition, state.groupColumnId, state.collapsedGroups, groupedData, data.rows, actions])

  // 键盘导航：获取单元格类型
  const getLockedCellType = React.useCallback(() => {
    if (!state.lockedCellId) return null
    const allRows = state.groupColumnId
      ? (groupedData?.flatMap(g => state.collapsedGroups.has(g.groupValue) ? [] : g.rows) ?? data.rows)
      : data.rows
    for (const row of allRows) {
      for (let i = 0; i < row.cells.length; i++) {
        const cell = row.cells[i]
        if (cell?.id === state.lockedCellId) {
          return cell.type ?? data.columns[i]?.type ?? 'text'
        }
      }
    }
    return null
  }, [state.lockedCellId, state.groupColumnId, state.collapsedGroups, groupedData, data.rows, data.columns])

  // 键盘导航：获取单元格当前值
  const getLockedCellValue = React.useCallback(() => {
    if (!state.lockedCellId) return ''
    const allRows = state.groupColumnId
      ? (groupedData?.flatMap(g => state.collapsedGroups.has(g.groupValue) ? [] : g.rows) ?? data.rows)
      : data.rows
    for (const row of allRows) {
      for (const cell of row.cells) {
        if (cell.id === state.lockedCellId) {
          return String(cell.value ?? '')
        }
      }
    }
    return ''
  }, [state.lockedCellId, state.groupColumnId, state.collapsedGroups, groupedData, data.rows])

  // 键盘事件监听
  React.useEffect(() => {
    if (!state.lockedCellId) return

    // composition 状态跟踪（中文输入法）
    let isComposing = false

    const handleCompositionStart = () => {
      isComposing = true
    }

    const handleCompositionEnd = () => {
      isComposing = false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // 编辑态时，让渲染器的 input 自己处理 Enter/Escape
      // 全局监听器不干预，避免双重调用或时序问题
      if (state.editingCellId) {
        // 只处理 Escape 取消编辑（渲染器已经处理了，但全局监听器需要同步状态）
        if (e.key === 'Escape') {
          // 不调用 preventDefault，渲染器已经处理了
          actions.cancelEdit()
          return
        }
        // Enter 由渲染器处理，全局监听器不干预
        // 其他按键在编辑态不处理
        return
      }

      // 检查焦点是否在可交互元素上（输入框、选择框等）
      const activeElement = document.activeElement as HTMLElement
      const isInteractiveElement = activeElement.closest('input, select, textarea, [data-slot="select-trigger"], [data-slot="select-editable"]')

      // 如果焦点在可交互元素上，不处理键盘快捷键
      if (isInteractiveElement) {
        return
      }

      // Escape → 退出锁定态
      if (e.key === 'Escape') {
        actions.lockCell(null)
        return
      }

      // 方向键导航
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
        navigateLockedCell(e.key as 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight')
        return
      }

      // Tab / Shift+Tab 导航
      if (e.key === 'Tab') {
        e.preventDefault()
        navigateLockedCell(e.shiftKey ? 'ArrowLeft' : 'ArrowRight')
        return
      }

      // 获取锁定单元格类型
      const cellType = getLockedCellType()

      // 输入列单元格：Enter 或可打印字符 → 聚焦内部 Input
      if (cellType === 'input' && !state.readOnly) {
        if (e.key === 'Enter' || (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !isComposing)) {
          e.preventDefault()
          // 查找锁定单元格内的 Input 元素并聚焦
          const lockedCellElement = document.querySelector(`[data-cell-id="${state.lockedCellId}"]`)
          if (lockedCellElement) {
            const inputElement = lockedCellElement.querySelector('input') as HTMLInputElement
            if (inputElement) {
              inputElement.focus()
              // 如果是可打印字符（非 Enter），延迟设置值（等待 focus 生效）
              if (e.key.length === 1 && e.key !== 'Enter' && !isComposing) {
                setTimeout(() => {
                  // 设置原生值
                  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set
                  nativeInputValueSetter?.call(inputElement, e.key)
                  // 触发 React 的 onChange
                  inputElement.dispatchEvent(new Event('input', { bubbles: true }))
                }, 0)
              }
            }
          }
          return
        }
      }

      // Enter → 进入编辑态（文本/数字单元格）— readOnly 模式下禁用
      if (e.key === 'Enter' && !state.readOnly) {
        if (cellType === 'text' || cellType === 'editable' || cellType === 'number') {
          const currentValue = getLockedCellValue()
          actions.startEdit(state.lockedCellId!, currentValue)
        }
        return
      }

      // 可打印字符 → 进入编辑态（以该字符为初始值）— readOnly 模式下禁用
      // 判断 composition 状态，避免中文输入法时误触发
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !state.readOnly && !isComposing) {
        if (cellType === 'text' || cellType === 'editable') {
          actions.startEdit(state.lockedCellId!, e.key)
        } else if (cellType === 'number') {
          // 数字单元格仅接受数字字符作为初始编辑值，拒绝字母等非数字字符
          if (/^[\d\-.]$/.test(e.key)) {
            actions.startEdit(state.lockedCellId!, e.key)
          }
        }
        return
      }

      // Backspace/Delete → 进入编辑态（清空内容）— readOnly 模式下禁用
      if ((e.key === 'Backspace' || e.key === 'Delete') && !state.readOnly) {
        if (cellType === 'text' || cellType === 'editable' || cellType === 'number') {
          actions.startEdit(state.lockedCellId!, '')
        }
        return
      }
    }

    document.addEventListener('compositionstart', handleCompositionStart)
    document.addEventListener('compositionend', handleCompositionEnd)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('compositionstart', handleCompositionStart)
      document.removeEventListener('compositionend', handleCompositionEnd)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [state.lockedCellId, state.editingCellId, state.readOnly, actions, navigateLockedCell, getLockedCellType, getLockedCellValue])

  // 撤回/恢复快捷键
  // 追踪表格是否处于活跃状态（最近一次 mousedown 在表格内）
  const tableActiveRef = React.useRef(false)

  React.useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const inTable = tableRef.current?.contains(e.target as Node) ?? false
      if (inTable) {
        tableActiveRef.current = true
      } else {
        // 仅当点击外部交互元素时才让出控制权；
        // 点击 body/main/div/span 等钝元素保持活跃（如关闭弹窗、空白区域点击）
        const el = e.target as HTMLElement
        if (el.closest('button, a, input, select, textarea, [role="button"], [data-interactive]')) {
          tableActiveRef.current = false
        }
      }
    }

    const handleUndoRedo = (e: KeyboardEvent) => {
      if (!tableActiveRef.current) return
      if (state.editingCellId) return
      const el = document.activeElement as HTMLElement | null
      if (el?.closest('input, textarea, select')) return

      const mod = e.metaKey || e.ctrlKey
      const key = e.key.toLowerCase()
      if (mod && key === 'z' && !e.shiftKey) {
        e.preventDefault()
        actions.undo()
      } else if (mod && key === 'z' && e.shiftKey) {
        e.preventDefault()
        actions.redo()
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleUndoRedo)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleUndoRedo)
    }
  }, [state.editingCellId, actions])

  // 监听 document 点击，点击表格外部时清空选中列和锁定态
  const tableRef = React.useRef<HTMLDivElement>(null)

  // 横向滚动位置（用于冻结列分割线补偿）
  const [scrollLeft, setScrollLeft] = React.useState(0)

  // 表格内容是否溢出容器（用于冻结列投影显隐）
  const [hasOverflow, setHasOverflow] = React.useState(false)

  // 监听父容器滚动
  React.useEffect(() => {
    const parent = tableRef.current?.parentElement
    if (!parent) return

    const handleScroll = () => setScrollLeft(parent.scrollLeft)
    parent.addEventListener('scroll', handleScroll)
    handleScroll() // 初始化

    return () => parent.removeEventListener('scroll', handleScroll)
  }, [])

  // 监听表格宽度是否溢出容器
  React.useEffect(() => {
    const el = tableRef.current
    const parent = el?.parentElement
    if (!el || !parent) return

    const observer = new ResizeObserver(() => {
      setHasOverflow(el.scrollWidth > parent.clientWidth)
    })
    observer.observe(el)
    observer.observe(parent)
    // 初始化
    setHasOverflow(el.scrollWidth > parent.clientWidth)

    return () => observer.disconnect()
  }, [])

  React.useEffect(() => {
    if (!state.selectedColumnId && !state.lockedCellId) return

    let pressedInsideTable = false

    const handlePointerDown = (e: PointerEvent) => {
      if (isHeaderPopoverOpenRef.current) return
      // 检查按下位置是否在表格内
      pressedInsideTable = tableRef.current?.contains(e.target as Node) ?? false
      // 检查按下位置是否在 PopoverContent/TooltipContent 内（Portal 渲染在表格外，但逻辑上属于表格）
      const target = e.target as HTMLElement
      if (target.closest('[data-slot="popover-content"], [data-slot="tooltip-content"]')) {
        pressedInsideTable = true
      }
    }

    const handlePointerUp = () => {
      if (isHeaderPopoverOpenRef.current) return
      // 按下位置在表格内 → 无论释放位置在哪，都保持锁定态
      if (pressedInsideTable) {
        pressedInsideTable = false
        return
      }
      // 按下位置在表格外 → 释放时退出锁定态（完整的外部点击）
      actions.selectColumn(null)
      actions.lockCell(null)
      pressedInsideTable = false
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('pointerup', handlePointerUp)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('pointerup', handlePointerUp)
    }
  }, [state.selectedColumnId, state.lockedCellId, actions])

  return (
    <HeaderPopoverOpenRefContext.Provider value={isHeaderPopoverOpenRef}>
      <div
        ref={tableRef}
        data-slot="data-table"
        data-slot-id={slotId ?? id}
        data-resizing={resizingColumnId || draggingColumnId ? "true" : undefined}
        className={cn(
          tableVariants({ variant, radius }),
          state.readOnly ? "w-fit max-w-full" : "w-max min-w-full",
          className
        )}
        onClick={handleTableClick}
        {...props}
      >
      <div className="sticky top-0 z-20">
        <div className="relative">
          <RowRenderer
            row={headerRow}
            isHeader
            columnIds={columnIds}
            onCellResizeStart={handleResizeStart}
            onCellHoverEdge={handleHoverEdge}
            onHeaderCellClick={handleHeaderCellClick}
            onHeaderCellMouseDown={handleHeaderCellMouseDown}
            draggingColumnId={draggingColumnId}
            frozenOffsets={frozenOffsets}
            frozenWidth={frozenWidth}
            rowWidth={rowWidth}
            groupColumnId={state.groupColumnId ?? undefined}
            hasOverflow={hasOverflow}
          />
        </div>
      </div>
      <div className={(groupedData || state.readOnly) ? "pb-3" : undefined}>
        {groupedData ? (
          // 分组渲染（每组序号独立计算）
          groupedData.map((group, groupIndex) => {
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
                  isCheckboxHidden={isCheckboxHidden}
                  hasOverflow={hasOverflow}
                />
                {!isCollapsed && (
                  <>
                    {group.rows.map((row, i) => (
                      <RowRenderer
                        key={row.id}
                        row={row}
                        columnIds={columnIds}
                        rowIndex={i + 1}
                        isLastRow={i === group.rows.length - 1 && groupIndex === groupedData.length - 1}
                        hoveringCellId={hoveringCellId}
                        onCellHover={setHoveringCellId}
                        onBodyCellClick={handleBodyCellClick}
                        frozenOffsets={frozenOffsets}
                        frozenWidth={frozenWidth}
                        rowWidth={rowWidth}
                        hasOverflow={hasOverflow}
                      />
                    ))}
                    {/* 插入行：readOnly 模式下隐藏 */}
                    {!state.readOnly && (
                      <InsertRow
                        rowWidth={rowWidth}
                        showBorder={true}
                        isHovering={hoveringGroupInsertCell?.groupValue === group.groupValue}
                        onHoverChange={(h) => setHoveringGroupInsertCell(h ? {groupValue: group.groupValue, cell: 'add'} : null)}
                        onInsert={() => state.groupColumnId && actions.insertRowInGroup(group.groupValue, state.groupColumnId)}
                        frozenWidth={frozenWidth}
                        checkboxWidth={checkboxColumnWidth}
                        isCheckboxHidden={isCheckboxHidden}
                      />
                    )}
                  </>
                )}
              </React.Fragment>
            )
          })
        ) : (
          // 普通渲染
          <>
            {data.rows.map((row, index) => (
              <RowRenderer
                key={row.id}
                row={row}
                columnIds={columnIds}
                rowIndex={index + 1}
                isLastRow={false}
                hoveringCellId={hoveringCellId}
                onCellHover={setHoveringCellId}
                onBodyCellClick={handleBodyCellClick}
                frozenOffsets={frozenOffsets}
                frozenWidth={frozenWidth}
                rowWidth={rowWidth}
                hasOverflow={hasOverflow}
              />
            ))}
            {/* 底部插入行：readOnly 模式下隐藏 */}
            {!state.readOnly && (
              <InsertRow
                rowWidth={rowWidth}
                showBorder={false}
                isHovering={insertRowHoveringCell !== null}
                onHoverChange={(h) => setInsertRowHoveringCell(h ? 'add' : null)}
                onInsert={() => actions.insertRow()}
                frozenWidth={frozenWidth}
                checkboxWidth={checkboxColumnWidth}
                isCheckboxHidden={isCheckboxHidden}
              />
            )}
          </>
        )}
      </div>
      {/* 列宽调整分割线 */}
      {(hoveringColumnId || resizingColumnId) && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2"
          style={{
            left: `${state.frozenColumns.has(hoveringColumnId || resizingColumnId || '')
              ? resizeLineLeft + scrollLeft
              : resizeLineLeft}px`
          }}
        />
      )}
      {/* 拖拽列顺序分割线 */}
      {draggingColumnId && dragTargetColumnId && (
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-brand-6 z-30 -translate-x-1/2"
          style={{
            left: `${state.frozenColumns.has(dragTargetColumnId)
              ? dragLineLeft + scrollLeft
              : dragLineLeft}px`
          }}
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
})

export { DataTable, tableVariants }
export type { DataTableHandle }