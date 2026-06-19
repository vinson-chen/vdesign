import * as React from "react"
import { PopoverMenuItem, PopoverSeparator } from "./popover"
import { PopoverContext } from "./popover-shared"
import { useTable } from "@/hooks"

function HeaderCellMenuView({
  columnId,
  isFirstDataColumn,
  groupColumnId,
  readOnly,
  onEdit,
  onHideManager,
  onDimension,
}: {
  columnId?: string
  isFirstDataColumn: boolean
  groupColumnId: string | null
  readOnly?: boolean
  onEdit: () => void
  onHideManager: () => void
  onDimension: () => void
}) {
  const { actions } = useTable()
  const { close } = React.useContext(PopoverContext)

  // readOnly 模式：隐藏编辑列、插入列、行列数管理、删除列
  // 编辑模式：显示全部菜单项
  return (
    <div data-slot="header-cell-menu">
      {!readOnly && (
        <PopoverMenuItem size="base" onClick={onEdit}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-edit" /></svg>
          <span className="text-sm text-black-85">编辑列</span>
        </PopoverMenuItem>
      )}
      {!isFirstDataColumn && (
        <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.hideColumn(columnId)}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-browse-off" /></svg>
          <span className="text-sm text-black-85">隐藏列</span>
        </PopoverMenuItem>
      )}
      <PopoverSeparator />
      <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.setGroupColumn(groupColumnId === columnId ? null : columnId)}>
        <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-form" /></svg>
        <span className="text-sm text-black-85">{groupColumnId === columnId ? "取消分组" : "设为分组"}</span>
      </PopoverMenuItem>
      {!readOnly && !isFirstDataColumn && (
        <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.insertColumnLeft(columnId)}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-arrow-left" /></svg>
          <span className="text-sm text-black-85">向左插入列</span>
        </PopoverMenuItem>
      )}
      {!readOnly && (
        <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.insertColumnRight(columnId)}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-arrow-right" /></svg>
          <span className="text-sm text-black-85">向右插入列</span>
        </PopoverMenuItem>
      )}
      <PopoverSeparator />
      {isFirstDataColumn && (
        <PopoverMenuItem size="base" onClick={onHideManager}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-browse-off" /></svg>
          <span className="text-sm text-black-85">隐藏列管理</span>
        </PopoverMenuItem>
      )}
      {!readOnly && isFirstDataColumn && (
        <PopoverMenuItem size="base" onClick={onDimension}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-grid-view" /></svg>
          <span className="text-sm text-black-85">行列数管理</span>
        </PopoverMenuItem>
      )}
      {isFirstDataColumn && (
        <PopoverMenuItem size="base" onClick={() => {
          close()
          setTimeout(() => actions.toggleReadOnly(), 250)
        }}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref={readOnly ? "#icon-book-open" : "#icon-book-open-filled"} /></svg>
          <span className="text-sm text-black-85">{readOnly ? "编辑模式" : "只读模式"}</span>
        </PopoverMenuItem>
      )}
      {!isFirstDataColumn && (
        <PopoverMenuItem size="base" closeOnClick onClick={() => columnId && actions.freezeColumns(columnId)}>
          <svg className="icon text-black-55" aria-hidden="true"><use xlinkHref="#icon-grid-column" /></svg>
          <span className="text-sm text-black-85">冻结到此列</span>
        </PopoverMenuItem>
      )}
      {!readOnly && !isFirstDataColumn && (
        <>
          <PopoverSeparator />
          <PopoverMenuItem
            size="base"
            closeOnClick
            onClick={() => columnId && actions.deleteColumn(columnId)}
            className="text-error-5 hover:bg-error-1 focus:bg-error-1 active:bg-error-2"
          >
            <svg className="icon text-error-5" aria-hidden="true"><use xlinkHref="#icon-delete" /></svg>
            <span className="text-sm">删除列</span>
          </PopoverMenuItem>
        </>
      )}
    </div>
  )
}

export { HeaderCellMenuView }