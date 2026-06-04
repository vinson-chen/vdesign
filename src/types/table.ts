/**
 * 表格数据类型定义
 */

// 单元格类型
export type CellType =
  | 'text'
  | 'checkbox'
  | 'editable'
  | 'button'
  | 'icon'
  | 'select'
  | 'input'

// 单元格数据
export interface CellData {
  id: string
  type: CellType
  value: string | boolean | number
  width?: number | 'auto'
  align?: 'left' | 'center' | 'right'
  editable?: boolean
  // 按钮/图标单元格特有属性
  buttonVariant?: 'cell' | 'ghost' | 'link'
  iconName?: string
  // 可编辑单元格特有属性
  defaultValue?: string
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
}

// 表格状态
export interface TableState {
  // 选择状态
  selectedRows: Set<string>
  selectAll: boolean
  // 编辑状态
  editingCellId: string | null
  editingValue: string
  // 列宽状态
  columnWidths: Record<string, number>
  // 隐藏列状态
  hiddenColumns: Set<string>
  // 冻结列状态
  frozenColumns: Set<string>
  // 分组列状态
  groupColumnId: string | null
  // 收起的分组
  collapsedGroups: Set<string>
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
  // 列宽操作
  updateColumnWidth: (columnId: string, width: number) => void
  // 列操作
  insertColumnLeft: (columnId: string) => void
  insertColumnRight: (columnId: string) => void
  hideColumn: (columnId: string) => void
  deleteColumn: (columnId: string) => void
  updateColumnType: (columnId: string, type: CellType) => void
  updateColumnTitle: (columnId: string, title: string) => void
  freezeColumns: (columnId: string) => void
  // 分组操作
  setGroupColumn: (columnId: string | null) => void
  toggleGroupCollapse: (groupValue: string) => void
  toggleGroupSelect: (groupValue: string, groupRows: RowData[]) => void
}

// 表格 Context 类型
export interface TableContextValue {
  state: TableState
  actions: TableActions
  data: TableData
}

// 分组数据
export interface GroupedData {
  groupValue: string
  rows: RowData[]
}