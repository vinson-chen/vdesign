import * as React from "react"
import { PopoverSeparator } from "./popover"
import { PopoverEditContent } from "./popover-edit-content"
import { Button } from "./button"
import { useTable } from "@/hooks"
import { PopoverContext } from "./popover"
import type { CellType, SelectOptionItem, TextFieldItem, ColumnDef } from "@/types/table"

function HeaderCellEditView({
  columnId,
  value,
  currentColumnType,
  currentColumnDef,
  onClose,
}: {
  columnId?: string
  value: string | boolean | number
  currentColumnType: CellType
  currentColumnDef?: ColumnDef
  onClose: () => void
}) {
  const { actions } = useTable()
  const { close } = React.useContext(PopoverContext)
  const id = React.useId()

  // 编辑状态
  const [editedTitle, setEditedTitle] = React.useState(String(value))
  const [editedType, setEditedType] = React.useState<CellType>("text")
  const [selectOptions, setSelectOptions] = React.useState<SelectOptionItem[]>([])
  const [textFields, setTextFields] = React.useState<TextFieldItem[]>([])

  // 同步初始状态
  React.useEffect(() => {
    setEditedTitle(String(value))
    setEditedType(currentColumnType)
    if (currentColumnDef?.options) {
      if (currentColumnType === "select") {
        setSelectOptions((currentColumnDef.options.items as SelectOptionItem[]) ?? [])
        setTextFields([])
      } else if (currentColumnType === "text") {
        setTextFields((currentColumnDef.options.fields as TextFieldItem[]) ?? [])
        setSelectOptions([])
      } else {
        setSelectOptions([])
        setTextFields([])
      }
    } else {
      setSelectOptions([])
      setTextFields([])
    }
  }, [value, currentColumnType, currentColumnDef])

  // 保存修改
  const handleSave = () => {
    if (editedTitle !== String(value) && columnId) {
      actions.updateColumnTitle(columnId, editedTitle)
    }
    if (columnId && editedType !== currentColumnType) {
      actions.updateColumnType(columnId, editedType)
    }
    if (columnId) {
      const newOptions: Record<string, unknown> = {}
      if (editedType === "select") {
        // 过滤掉空label的选项
        const validOptions = selectOptions.filter(opt => opt.label.trim())
        newOptions.items = validOptions
      } else if (editedType === "text") {
        // 过滤掉空label的字段
        const validFields = textFields.filter(f => f.label.trim())
        newOptions.fields = validFields
      }
      actions.updateColumnOptions(columnId, newOptions)
    }
    close()
  }

  return (
    <div
      data-slot="header-cell-edit"
      data-slot-id={id}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          handleSave()
        }
        if (e.key === "Escape") {
          e.preventDefault()
          onClose()
        }
      }}
    >
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
              { value: "number", label: "数字列" },
              { value: "select", label: "选择列" },
              { value: "link", label: "链接列" },
              { value: "attachment", label: "附件列" },
            ],
          },
          // 选择列：选项内容配置
          ...(editedType === "select" ? [{
            label: "",
            type: "content" as const,
            contentType: editedType,
            selectOptions,
            onSelectOptionsChange: setSelectOptions,
          }] : []),
          // 文本列：字段内容配置
          ...(editedType === "text" ? [{
            label: "",
            type: "content" as const,
            contentType: editedType,
            textFields,
            onTextFieldsChange: setTextFields,
          }] : []),
        ]}
      />
      <PopoverSeparator />
      <div className="flex gap-2 px-2 py-1.5">
        <Button variant="outline" size="base" className="flex-1" onClick={onClose}>取消</Button>
        <Button variant="primary" size="base" className="flex-1" onClick={handleSave}>保存</Button>
      </div>
    </div>
  )
}

export { HeaderCellEditView }