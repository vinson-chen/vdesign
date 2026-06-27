import type { CellType, SelectOptionItem, TextFieldItem } from "@/types/table";
interface EditField {
    label: string;
    type: "input" | "select" | "content";
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    autoFocus?: boolean;
    selectOnFocus?: boolean;
    options?: {
        value: string;
        label: string;
    }[];
    contentType?: CellType;
    selectOptions?: SelectOptionItem[];
    onSelectOptionsChange?: (options: SelectOptionItem[]) => void;
    textFields?: TextFieldItem[];
    onTextFieldsChange?: (fields: TextFieldItem[]) => void;
}
interface PopoverEditContentProps {
    size?: "base" | "sm" | "lg";
    fields: EditField[];
}
declare function PopoverEditContent({ size, fields }: PopoverEditContentProps): import("react/jsx-runtime").JSX.Element;
export { PopoverEditContent };
export type { EditField };
