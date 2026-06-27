import * as React from "react";
import type { CellRendererProps } from "@/types/table";
declare function TruncatedText({ children, className, onDoubleClick, onClick }: {
    children: string;
    className?: string;
    onDoubleClick?: () => void;
    onClick?: () => void;
}): import("react/jsx-runtime").JSX.Element;
declare function TextCellRenderer({ value, isEditing, isSelected, onStartEdit, editingValue, onUpdateEditingValue, onFinishEdit, onCancelEdit, readOnly, isCellHovering, onSelectCell, options, cellData, onChange }: CellRendererProps): import("react/jsx-runtime").JSX.Element;
declare function NumberCellRenderer({ value, isEditing, isSelected, onStartEdit, editingValue, onUpdateEditingValue, onFinishEdit, onCancelEdit, readOnly }: CellRendererProps): import("react/jsx-runtime").JSX.Element;
declare function SelectEditableCellRenderer({ value, options, onChange, onUpdateColumnOptions, isSelected, isCellHovering, onSelectCell, readOnly }: CellRendererProps): import("react/jsx-runtime").JSX.Element;
declare function LinkCellRenderer({ cellData, isSelected, isCellHovering, onChange, onSelectCell, readOnly }: CellRendererProps): import("react/jsx-runtime").JSX.Element;
declare function AttachmentCellRenderer({ cellData, isSelected, isCellHovering, onChange, readOnly }: CellRendererProps): import("react/jsx-runtime").JSX.Element;
declare const defaultCellRenderers: Record<string, React.ComponentType<CellRendererProps>>;
export { TruncatedText, TextCellRenderer, NumberCellRenderer, SelectEditableCellRenderer, LinkCellRenderer, AttachmentCellRenderer, defaultCellRenderers, };
