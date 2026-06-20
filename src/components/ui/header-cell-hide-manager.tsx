import * as React from "react"
import { PopoverMenuItem } from "./popover"
import { useTable } from "@/hooks"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { cn } from "@/lib/utils"

function HeaderCellHideManagerView({ firstDataColumnId }: {
  firstDataColumnId: string | undefined
}) {
  const { state, actions } = useTable()
  const id = React.useId()

  // 查找 checkbox 列
  const checkboxColumn = state.allColumns.find(col => col.type === "checkbox")
  const isCheckboxHidden = checkboxColumn ? state.hiddenColumns.has(checkboxColumn.id) : false

  return (
    <div data-slot="hide-column-view" data-slot-id={id}>
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
              <svg className="icon text-black-55 shrink-0" aria-hidden="true">
                <use xlinkHref={isHidden ? "#icon-browse-off" : "#icon-browse"} />
              </svg>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="truncate">{col.title || col.id}</span>
                </TooltipTrigger>
                <TooltipContent side="top" size="base">
                  <p>{col.title || col.id}</p>
                </TooltipContent>
              </Tooltip>
            </PopoverMenuItem>
          )
        })}
    </div>
  )
}

export { HeaderCellHideManagerView }
