import * as React from "react"
import { PopoverSeparator } from "./popover"
import { PopoverLabel } from "./popover"
import { Input } from "./input"
import { Button } from "./button"
import { PopoverContext } from "./popover"
import { useTable } from "@/hooks"

function HeaderCellDimensionView() {
  const { data, state, actions } = useTable()
  const { close } = React.useContext(PopoverContext)

  // 计算当前行数（纯表体行）
  const currentRowCount = data.rows.length

  // 计算当前列数（排除 checkbox 列，包含首列）
  const excludeColumnCount = React.useMemo(() => {
    const hasCheckbox = state.allColumns.some(col => col.type === "checkbox")
    return hasCheckbox ? 1 : 0 // 仅排除 checkbox
  }, [state.allColumns])

  const currentColumnCount = state.allColumns.length - excludeColumnCount

  // 输入状态（保存字符串值，支持清空）
  const [rowInput, setRowInput] = React.useState(String(currentRowCount))
  const [columnInput, setColumnInput] = React.useState(String(currentColumnCount))

  // 数值约束：行数最小1，列数最小2（首列 + 至少1个数据列）
  const clampRowValue = (v: number) => Math.max(1, Math.min(100, v))
  const clampColumnValue = (v: number) => Math.max(2, Math.min(100, v))

  // 处理行数输入变化
  const handleRowCountChange = (value: string) => {
    setRowInput(value)
  }

  // 处理列数输入变化
  const handleColumnCountChange = (value: string) => {
    setColumnInput(value)
  }

  // 处理失焦恢复默认值
  const handleRowBlur = () => {
    if (rowInput === "" || rowInput === undefined) {
      setRowInput(String(currentRowCount))
    }
  }

  const handleColumnBlur = () => {
    if (columnInput === "" || columnInput === undefined) {
      setColumnInput(String(currentColumnCount))
    }
  }

  const handleSave = () => {
    const rowCount = clampRowValue(parseInt(rowInput) || currentRowCount)
    const columnCount = clampColumnValue(parseInt(columnInput) || currentColumnCount)
    actions.setDimension(rowCount, columnCount)
    close()
  }

  const handleCancel = () => {
    close()
  }

  return (
    <div
      data-slot="header-cell-dimension"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          handleSave()
        }
        if (e.key === "Escape") {
          e.preventDefault()
          handleCancel()
        }
      }}
    >
      <PopoverLabel>行数</PopoverLabel>
      <div className="px-2 pb-1.5">
        <Input
          variant="basic"
          size="base"
          type="number"
          value={rowInput}
          onChange={(e) => handleRowCountChange(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={handleRowBlur}
          noSpinner
          min={1}
          max={100}
          className="w-full"
        />
      </div>
      <PopoverLabel>列数</PopoverLabel>
      <div className="px-2 pb-1.5">
        <Input
          variant="basic"
          size="base"
          type="number"
          value={columnInput}
          onChange={(e) => handleColumnCountChange(e.target.value)}
          onFocus={(e) => e.target.select()}
          onBlur={handleColumnBlur}
          noSpinner
          min={1}
          max={100}
          className="w-full"
        />
      </div>
      <PopoverSeparator />
      <div className="flex gap-2 px-2 py-1.5">
        <Button variant="outline" size="base" className="flex-1" onClick={handleCancel}>取消</Button>
        <Button variant="primary" size="base" className="flex-1" onClick={handleSave}>保存</Button>
      </div>
    </div>
  )
}

export { HeaderCellDimensionView }