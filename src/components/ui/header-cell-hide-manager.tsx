import { PopoverMenuItem } from "./popover"
import { useTable } from "@/hooks"

function HeaderCellHideManagerView({ firstDataColumnId }: {
  firstDataColumnId: string | undefined
}) {
  const { state, actions } = useTable()

  // 查找 checkbox 列
  const checkboxColumn = state.allColumns.find(col => col.type === "checkbox")
  const isCheckboxHidden = checkboxColumn ? state.hiddenColumns.has(checkboxColumn.id) : false

  return (
    <div data-slot="hide-column-view">
      {/* 多选列选项 */}
      {checkboxColumn && (
        <PopoverMenuItem
          size="base"
          closeOnClick={false}
          onClick={() => actions.toggleColumnVisibility(checkboxColumn.id)}
        >
          <svg className="icon text-black-55" aria-hidden="true">
            <use xlinkHref={isCheckboxHidden ? "#icon-browse-off" : "#icon-browse"} />
          </svg>
          <span>多选列</span>
        </PopoverMenuItem>
      )}
      {/* 数据列选项 */}
      {state.allColumns
        .filter(col => col.type !== "checkbox" && col.id !== firstDataColumnId)
        .map(col => {
          const isHidden = state.hiddenColumns.has(col.id)
          return (
            <PopoverMenuItem
              key={col.id}
              size="base"
              closeOnClick={false}
              onClick={() => actions.toggleColumnVisibility(col.id)}
            >
              <svg className="icon text-black-55" aria-hidden="true">
                <use xlinkHref={isHidden ? "#icon-browse-off" : "#icon-browse"} />
              </svg>
              <span>{col.title || col.id}</span>
            </PopoverMenuItem>
          )
        })}
    </div>
  )
}

export { HeaderCellHideManagerView }
