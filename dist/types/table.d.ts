/**
 * 表格数据类型定义
 */
import type * as React from "react";
export type CellType = 'text' | 'number' | 'checkbox' | 'editable' | 'button' | 'attachment' | 'icon' | 'input' | 'select' | 'preview' | 'reference';
export interface CellRendererProps {
    value: string | boolean | number;
    cellId: string;
    rowId: string;
    columnId: string;
    onChange?: (value: unknown) => void;
    isEditing: boolean;
    isLocked?: boolean;
    isCellHovering?: boolean;
    readOnly?: boolean;
    onStartEdit?: () => void;
    onLockCell?: () => void;
    options?: Record<string, unknown>;
    cellData?: CellData;
    editingValue?: string;
    onUpdateEditingValue?: (value: string) => void;
    onFinishEdit?: () => void;
    onCancelEdit?: () => void;
    onUpdateColumnOptions?: (options: Record<string, unknown>) => void;
}
export type CellRendererRegistry = Record<string, React.ComponentType<CellRendererProps>>;
export interface SelectOptionItem {
    value: string;
    label: string;
    disabled?: boolean;
}
export interface ButtonCellConfig {
    label?: string;
    url?: string;
}
export interface CellData {
    id: string;
    type?: CellType;
    value: string | boolean | number;
    width?: number | 'auto';
    align?: 'left' | 'center' | 'right';
    editable?: boolean;
    buttonVariant?: 'cell' | 'ghost' | 'link';
    iconName?: string;
    defaultValue?: string;
    options?: Record<string, unknown>;
    buttonConfig?: ButtonCellConfig;
    attachmentFiles?: File[];
}
export interface ColumnDef {
    id: string;
    type: CellType;
    title?: string;
    width?: number | 'auto';
    align?: 'left' | 'center' | 'right';
    editable?: boolean;
    resizable?: boolean;
    options?: Record<string, unknown>;
}
export interface RowData {
    id: string;
    cells: CellData[];
    selected?: boolean;
}
export interface TableData {
    columns: ColumnDef[];
    rows: RowData[];
    hiddenColumns?: Set<string>;
    groupColumnId?: string;
    columnMap?: Map<string, ColumnDef>;
    allRows?: RowData[];
}
export interface TableState {
    selectedRows: Set<string>;
    selectAll: boolean;
    editingCellId: string | null;
    editingValue: string;
    lockedCellId: string | null;
    columnWidths: Record<string, number>;
    allColumns: ColumnDef[];
    hiddenColumns: Set<string>;
    frozenColumns: Set<string>;
    groupColumnId: string | null;
    collapsedGroups: Set<string>;
    selectedColumnId: string | null;
    readOnly?: boolean;
}
export interface TableActions {
    toggleSelectAll: () => void;
    toggleRowSelect: (rowId: string) => void;
    clearSelection: () => void;
    startEdit: (cellId: string, value: string) => void;
    finishEdit: () => void;
    cancelEdit: () => void;
    updateEditingValue: (value: string) => void;
    lockCell: (cellId: string | null) => void;
    updateCellValue: (cellId: string, value: unknown) => void;
    updateColumnWidth: (columnId: string, width: number) => void;
    insertColumnLeft: (columnId: string) => void;
    insertColumnRight: (columnId: string) => void;
    hideColumn: (columnId: string) => void;
    toggleColumnVisibility: (columnId: string) => void;
    deleteColumn: (columnId: string) => void;
    updateColumnType: (columnId: string, type: CellType) => void;
    updateColumnTitle: (columnId: string, title: string) => void;
    updateColumnOptions: (columnId: string, options: Record<string, unknown>) => void;
    freezeColumns: (columnId: string) => void;
    setGroupColumn: (columnId: string | null) => void;
    toggleGroupCollapse: (groupValue: string) => void;
    toggleGroupSelect: (groupValue: string, groupRows: RowData[]) => void;
    insertRowInGroup: (groupValue: string, groupColumnId: string) => void;
    insertRow: () => void;
    updateGroupValues: (oldGroupValue: string, newGroupValue: string, groupColumnId: string) => void;
    expandAllGroups: () => void;
    collapseAllGroups: () => void;
    selectColumn: (columnId: string | null) => void;
    moveColumnOrder: (sourceColumnId: string, targetColumnId: string, insertPosition: 'left' | 'right') => void;
    setDimension: (targetRowCount: number, targetColumnCount: number) => void;
    toggleReadOnly: () => void;
}
export interface TableContextValue {
    state: TableState;
    actions: TableActions;
    data: TableData;
    cellRenderers: CellRendererRegistry;
}
export interface GroupedData {
    groupValue: string;
    rows: RowData[];
}
