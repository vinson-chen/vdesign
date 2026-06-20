/**
 * 计算首列相关信息的 hook
 * - isFirstDataColumn: 当前列是否为首列（checkbox 列右侧第一列或无 checkbox 时第一列）
 * - firstDataColumnId: 首列 ID（基于 allColumns，用于隐藏列管理面板排除首列）
 */
declare function useFirstDataColumn(columnId?: string): {
    isFirstDataColumn: boolean;
    firstDataColumnId: string | undefined;
};
export { useFirstDataColumn };
