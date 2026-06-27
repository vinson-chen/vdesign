/**
 * 表格数据类型定义
 */

import type * as React from "react"

// 单元格类型
export type CellType =
  | 'text'
  | 'number'
  | 'checkbox'
  | 'link'
  | 'attachment'
  | 'select'

// 单元格渲染器 Props 接口
export interface CellRendererProps {
  value: string | boolean | number
  cellId: string
  rowId: string
  columnId: string
  onChange?: (value: unknown) => void
  isEditing: boolean
  isSelected?: boolean  // 单元格选中态（用于 select 列等）
  isCellHovering?: boolean
  readOnly?: boolean
  onStartEdit?: (initialValue?: string) => void  // 可选参数：进入编辑态时的初始值
  onSelectCell?: () => void  // 进入单元格选中态
  // 列级别的组件配置（如 Select 的 options、Button 的 buttons）
  options?: Record<string, unknown>
  // 单元格级别的配置（如按钮的 urls）
  cellData?: CellData
  // 编辑态额外 props（由 CellContent 传入）
  editingValue?: string
  onUpdateEditingValue?: (value: string) => void
  onFinishEdit?: () => void
  onCancelEdit?: () => void
  // 更新列配置（如添加新选项）
  onUpdateColumnOptions?: (options: Record<string, unknown>) => void
}

// 渲染器注册表类型
export type CellRendererRegistry = Record<string, React.ComponentType<CellRendererProps>>

// Select 选项项类型
export interface SelectOptionItem {
  value: string
  label: string
  disabled?: boolean
}

// Button 单元格配置（单元格级别）
export interface ButtonCellConfig {
  label?: string  // 按钮名称，为空时显示图标按钮
  url?: string    // 超链接
}

// 单元格数据
export interface CellData {
  id: string
  type?: CellType  // 可选，未指定时从 ColumnDef.type 继承
  value: string | boolean | number
  width?: number | 'auto'
  align?: 'left' | 'center' | 'right'
  editable?: boolean
  // 按钮/图标单元格特有属性
  buttonVariant?: 'cell' | 'ghost' | 'link'
  iconName?: string
  // 可编辑单元格特有属性
  defaultValue?: string
  // 单元格级别配置（优先于列级 ColumnDef.options）
  options?: Record<string, unknown>
  // 按钮单元格专属配置（单元格级别）
  buttonConfig?: ButtonCellConfig
  // 附件单元格专属配置（单元格级别）
  attachmentFiles?: File[]
}

// 列定义
export interface ColumnDef {
  id: string
  type: CellType
  title?: string
  width?: number | 'auto'
  align?: 'left' | 'center' | 'right'
  editable?: boolean
  resizable?: boolean
  // 列级别的组件配置（传递给该列渲染器）
  options?: Record<string, unknown>
}

// 行数据
export interface RowData {
  id: string
  cells: CellData[]
  selected?: boolean
}

// 表格数据
export interface TableData {
  columns: ColumnDef[]
  rows: RowData[]
  hiddenColumns?: Set<string>
  groupColumnId?: string
  // 分组初始收起状态：外部可传入缓存的收起分组值，不传则默认首组展开其余收起
  initialCollapsedGroups?: string[]
  // 列 ID → ColumnDef 的映射，用于快速查找（替代 Array.find）
  columnMap?: Map<string, ColumnDef>
  // 原始行数据（含隐藏列的单元格），用于分组计算等需要完整数据的场景
  allRows?: RowData[]
}

// 表格状态
export interface TableState {
  // 选择状态
  selectedRows: Set<string>
  selectAll: boolean
  // 编辑状态
  editingCellId: string | null
  editingValue: string
  // 单元格选中状态（焦点单元格）
  selectedCellId: string | null
  // 列宽状态
  columnWidths: Record<string, number>
  // 全部列（含隐藏列）
  allColumns: ColumnDef[]
  // 隐藏列状态
  hiddenColumns: Set<string>
  // 冻结列状态
  frozenColumns: Set<string>
  // 分组列状态
  groupColumnId: string | null
  // 收起的分组
  collapsedGroups: Set<string>
  // 选中列
  selectedColumnId: string | null
  // 只读模式（隐藏所有编辑入口）
  readOnly?: boolean
}

// 表格操作
export interface TableActions {
  // 选择操作
  toggleSelectAll: () => void
  toggleRowSelect: (rowId: string) => void
  clearSelection: () => void
  // 编辑操作
  startEdit: (cellId: string, value: string) => void
  finishEdit: () => void
  cancelEdit: () => void
  updateEditingValue: (value: string) => void
  // 单元格选中操作
  selectCell: (cellId: string | null) => void
  // 单元格值更新
  updateCellValue: (cellId: string, value: unknown) => void
  // 列宽操作
  updateColumnWidth: (columnId: string, width: number) => void
  // 列操作
  insertColumnLeft: (columnId: string) => void
  insertColumnRight: (columnId: string) => void
  hideColumn: (columnId: string) => void
  toggleColumnVisibility: (columnId: string) => void
  deleteColumn: (columnId: string) => void
  updateColumnType: (columnId: string, type: CellType) => void
  updateColumnTitle: (columnId: string, title: string) => void
  updateColumnOptions: (columnId: string, options: Record<string, unknown>) => void
  freezeColumns: (columnId: string) => void
  // 分组操作
  setGroupColumn: (columnId: string | null) => void
  toggleGroupCollapse: (groupValue: string) => void
  toggleGroupSelect: (groupValue: string, groupRows: RowData[]) => void
  insertRowInGroup: (groupValue: string, groupColumnId: string) => void
  insertRow: () => void
  updateGroupValues: (oldGroupValue: string, newGroupValue: string, groupColumnId: string) => void
  expandAllGroups: () => void
  collapseAllGroups: () => void
  // 列选中操作
  selectColumn: (columnId: string | null) => void
  // 列顺序操作
  moveColumnOrder: (sourceColumnId: string, targetColumnId: string, insertPosition: 'left' | 'right') => void
  // 行列数操作
  setDimension: (targetRowCount: number, targetColumnCount: number) => void
  // 编辑/只读模式切换
  toggleReadOnly: () => void
  // 撤回/恢复
  undo: () => void
  redo: () => void
}

// 表格 Context 类型
export interface TableContextValue {
  state: TableState
  actions: TableActions
  data: TableData
  cellRenderers: CellRendererRegistry
}

// 分组数据
export interface GroupedData {
  groupValue: string
  rows: RowData[]
}

/** 表格状态快照，用于撤回/恢复 */
export interface TableSnapshot {
  columns: ColumnDef[]
  rows: RowData[]
  hiddenColumns: string[]
  frozenColumns: string[]
  groupColumnId: string | null
  collapsedGroups: string[]
  columnWidths: Record<string, number>
}

/** DataTable 对外暴露的操作句柄（通过 ref 访问） */
export interface DataTableHandle {
  undo: () => void
  redo: () => void
}

/** 单元格编辑事件 */
export interface CellEditEvent {
  cellId: string
  rowId: string
  columnId: string
  newValue: string | number | boolean
  oldValue: string | number | boolean
}