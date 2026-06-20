import * as React from "react"
import { DataTable } from "@/components/ui/data-table"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { TableData, CellRendererProps } from "@/types/table"
import { defaultCellRenderers } from "@/components/ui/cell-renderers"

// 预览渲染器所需组件
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Radio } from "@/components/ui/radio"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Pagination, PaginationButton, PaginationInfo } from "@/components/ui/pagination"

// ============================================
// 数据字典 — Vdesign 组件产品本体名注册表
// 覆盖所有 variant × size × state 组合，Vdata 埋点追踪的数据字典
// ============================================

// --- 本体名生成工具 ---

function toKebab(s: string): string {
  return s.replace(/([A-Z])/g, "-$1").toLowerCase()
}

function buttonOntoName(variant: string, size: string): string {
  return ["button", variant, toKebab(size)].join("-")
}

function variantOntoName(prefix: string, variant: string, size: string): string {
  return [prefix, variant, size].join("-")
}

function sizeOntoName(prefix: string, size: string): string {
  return [prefix, size].join("-")
}

// --- 变体配置 ---

const BUTTON_VARIANTS = ["primary", "outline", "ghost", "destructive", "link"] as const
const BUTTON_SIZES = ["sm", "base", "lg"] as const
const BUTTON_ICON_SIZES = ["iconSm", "iconBase", "iconLg"] as const

const SIZE_OPTIONS = ["sm", "base", "lg"] as const
const CHECK_STATES = ["off", "on"] as const
const DISABLED_STATES = ["normal", "disabled"] as const

const INPUT_VARIANTS = ["basic", "invalid"] as const
const SELECT_VARIANTS = ["basic", "invalid"] as const
const TABS_VARIANTS = ["basic", "line"] as const
const NAV_VARIANTS = ["basic", "selected"] as const

// --- 描述映射 ---

const VARIANT_DESC: Record<string, string> = {
  primary: "主色", outline: "线框", ghost: "透明", destructive: "危险", link: "链接",
  basic: "基础", invalid: "错误", selected: "选中", line: "下划线",
}
const SIZE_DESC: Record<string, string> = {
  sm: "小号", base: "标准", lg: "大号",
  iconSm: "图标-小", iconBase: "图标-标准", iconLg: "图标-大",
}
const STATE_DESC: Record<string, string> = {
  "": "", "left-icon": "左图标", "right-icon": "右图标",
  normal: "", disabled: "禁用", off: "未选", on: "已选",
}

function desc(variant: string, size: string, state?: string): string {
  const parts = [VARIANT_DESC[variant] || variant, SIZE_DESC[size] || size]
  if (state && STATE_DESC[state]) parts.push(STATE_DESC[state])
  return parts.join(" · ")
}

// --- 表格行类型 ---

interface PreviewOptions {
  dataSlot: string
  variant: string
  size: string
  state: string
  tag: string
}

interface DictRow {
  ontoName: string
  dataSlot: string
  component: string
  file: string
  variant: string
  size: string
  state: string
  tag: string
  description: string
}

// ============================================
// 示例预览渲染器（在表格单元格中内联渲染 Vdesign 组件）
// ============================================

function PreviewCellRenderer({ value, options }: CellRendererProps) {
  const opts = (options ?? {}) as Record<string, unknown>
  const dataSlot = (opts.dataSlot as string) || ""
  const variant = (opts.variant as string) || ""
  const size = (opts.size as string) || "sm"
  const state = (opts.state as string) || ""
  const isDisabled = state === "disabled"
  const previewSize = size.startsWith("icon") ? size : "sm"

  // --- 结构组件标签 ---
  const structBadge = (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", lineHeight: "18px", color: "var(--neutral-4)", backgroundColor: "var(--neutral-1)", border: "1px solid var(--neutral-2)", whiteSpace: "nowrap" }}>
      {dataSlot}
    </span>
  )

  // --- Button ---
  if (dataSlot === "button") {
    const isIcon = size.startsWith("icon")
    const hasLeftIcon = state === "left-icon"
    const hasRightIcon = state === "right-icon"
    return (
      <Button variant={variant as never} size={previewSize as never} disabled={isDisabled}
        leftIcon={hasLeftIcon || isIcon ? "icon-link" : undefined}
        rightIcon={hasRightIcon ? "icon-chevron-down" : undefined}>
        {isIcon ? undefined : "按钮"}
      </Button>
    )
  }

  // --- Checkbox ---
  if (dataSlot === "checkbox") return <Checkbox checked={variant === "on"} disabled={isDisabled} size={size as never} />

  // --- Radio ---
  if (dataSlot === "radio") return <Radio checked={variant === "on"} disabled={isDisabled} size={size as never} />

  // --- Switch ---
  if (dataSlot === "switch") return <Switch checked={variant === "on"} disabled={isDisabled} size={size as never} />

  // --- Input ---
  if (dataSlot === "input") {
    return (
      <Input variant={variant as never} size={size as never} disabled={isDisabled}
        placeholder="输入" className="w-full"
        leftIcon={state === "left-icon" ? "icon-search" : undefined}
        rightIcon={state === "right-icon" ? "icon-chevron-down" : undefined} />
    )
  }

  // --- NavigationItem ---
  if (dataSlot === "navigation-item") {
    return (
      <NavigationItem variant={variant as never} size={size as never} className="w-full">
        {variant === "selected" ? "选中项" : "导航项"}
      </NavigationItem>
    )
  }

  // --- SelectTrigger ---
  if (dataSlot === "select-trigger") {
    return (
      <Select size={size as never} disabled={isDisabled}>
        <SelectTrigger variant={variant as never} className="w-full">
          <SelectValue placeholder="选择" />
        </SelectTrigger>
      </Select>
    )
  }

  // --- SelectEditableTrigger ---
  if (dataSlot === "select-editable-trigger") {
    return (
      <Button variant="outline" size={previewSize as never} disabled={isDisabled}
        rightIcon="icon-chevron-down" className="w-full justify-between font-normal">
        <span className={isDisabled ? "text-black-25" : "text-black-55"}>选择</span>
      </Button>
    )
  }

  // --- TabsTrigger ---
  if (dataSlot === "tabs-trigger") {
    return (
      <Tabs size={size as never} defaultValue="preview">
        <TabsList variant={variant as never}>
          <TabsTrigger variant={variant as never} value="preview" disabled={isDisabled}>标签页</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  }

  // --- Tabs / TabsList ---
  if (dataSlot === "tabs" || dataSlot === "tabs-list") {
    return (
      <Tabs size={size as never} defaultValue="preview">
        <TabsList variant={variant as never}>
          <TabsTrigger value="preview" disabled={isDisabled}>标签</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  }

  // --- PaginationButton ---
  if (dataSlot === "pagination-button") {
    return (
      <Pagination size={size as never}>
        <PaginationButton disabled={isDisabled}>
          <svg className={size === "sm" ? "size-[14px]" : size === "lg" ? "size-[18px]" : "size-4"} style={{ fill: "currentColor" }}>
            <use xlinkHref="#icon-chevron-left" />
          </svg>
        </PaginationButton>
      </Pagination>
    )
  }

  // --- Pagination ---
  if (dataSlot === "pagination") {
    return (
      <Pagination size={size as never}>
        <PaginationButton disabled={isDisabled}>
          <svg className="size-4" style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-left" /></svg>
        </PaginationButton>
        <PaginationButton disabled={isDisabled}>
          <svg className="size-4" style={{ fill: "currentColor" }}><use xlinkHref="#icon-chevron-right" /></svg>
        </PaginationButton>
      </Pagination>
    )
  }

  // --- 其余结构组件 ---
  return structBadge
}

// ============================================
// 表格数据生成
// ============================================

function toTableData(rows: DictRow[], groupByFile = false): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "file_col", type: "text" as const, title: "组件文件", width: 200 },
    { id: "onto_name", type: "text" as const, title: "本体名 ontoName", width: 260 },
    { id: "data_slot", type: "text" as const, title: "data-slot", width: 180 },
    { id: "description", type: "text" as const, title: "说明", width: 140 },
    { id: "preview", type: "preview" as const, title: "示例", width: 180 },
  ]

  const tableRows = rows.map((r, i) => ({
    id: `r-${i}`,
    cells: [
      { id: `cb-${i}`, value: false },
      { id: `file-${i}`, value: `${r.file}  ·  ${r.component}` },
      { id: `name-${i}`, value: r.ontoName },
      { id: `slot-${i}`, value: r.dataSlot },
      { id: `desc-${i}`, value: r.description },
      {
        id: `prev-${i}`,
        value: r.ontoName,
        type: "preview" as const,
        options: {
          dataSlot: r.dataSlot,
          variant: r.variant,
          size: r.size || "sm",
          state: r.state,
        },
      },
    ],
  }))

  return groupByFile
    ? { columns, rows: tableRows, groupColumnId: "file_col" }
    : { columns, rows: tableRows }
}

// ============================================
// 全量本体名生成
// ============================================

function generateDictionary(): DictRow[] {
  const rows: DictRow[] = []

  // --- Button ---
  for (const variant of BUTTON_VARIANTS) {
    for (const size of BUTTON_SIZES) {
      rows.push({ ontoName: buttonOntoName(variant, size), dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "", tag: "<button>", description: desc(variant, size) })
      rows.push({ ontoName: `${buttonOntoName(variant, size)}-left-icon`, dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "left-icon", tag: "<button>", description: desc(variant, size, "left-icon") })
      rows.push({ ontoName: `${buttonOntoName(variant, size)}-right-icon`, dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "right-icon", tag: "<button>", description: desc(variant, size, "right-icon") })
      rows.push({ ontoName: `${buttonOntoName(variant, size)}-disabled`, dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "disabled", tag: "<button>", description: desc(variant, size, "disabled") })
    }
    for (const size of BUTTON_ICON_SIZES) {
      rows.push({ ontoName: buttonOntoName(variant, size), dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "", tag: "<button>", description: desc(variant, size) })
      rows.push({ ontoName: `${buttonOntoName(variant, size)}-disabled`, dataSlot: "button", component: "Button", file: "button.tsx", variant, size, state: "disabled", tag: "<button>", description: desc(variant, size, "disabled") })
    }
  }

  // --- Checkbox ---
  for (const checked of CHECK_STATES) {
    for (const disabled of DISABLED_STATES) {
      for (const size of SIZE_OPTIONS) {
        const st = disabled === "disabled" ? "禁用" : ""
        const cl = checked === "on" ? "已选" : "未选"
        rows.push({ ontoName: `checkbox-${checked}${disabled === "disabled" ? "-disabled" : ""}-${size}`, dataSlot: "checkbox", component: "Checkbox", file: "checkbox.tsx", variant: checked, size, state: disabled, tag: "<div>", description: `${cl}${st ? " · " + st : ""} · ${SIZE_DESC[size]}` })
      }
    }
  }

  // --- Radio ---
  for (const checked of CHECK_STATES) {
    for (const disabled of DISABLED_STATES) {
      for (const size of SIZE_OPTIONS) {
        const st = disabled === "disabled" ? "禁用" : ""
        const cl = checked === "on" ? "已选" : "未选"
        rows.push({ ontoName: `radio-${checked}${disabled === "disabled" ? "-disabled" : ""}-${size}`, dataSlot: "radio", component: "Radio", file: "radio.tsx", variant: checked, size, state: disabled, tag: "<div>", description: `${cl}${st ? " · " + st : ""} · ${SIZE_DESC[size]}` })
      }
    }
  }

  // --- Switch ---
  for (const checked of CHECK_STATES) {
    for (const disabled of DISABLED_STATES) {
      for (const size of SIZE_OPTIONS) {
        const st = disabled === "disabled" ? "禁用" : ""
        const cl = checked === "on" ? "开启" : "关闭"
        rows.push({ ontoName: `switch-${checked}${disabled === "disabled" ? "-disabled" : ""}-${size}`, dataSlot: "switch", component: "Switch", file: "switch.tsx", variant: checked, size, state: disabled, tag: "<button>", description: `${cl}${st ? " · " + st : ""} · ${SIZE_DESC[size]}` })
      }
    }
  }

  // --- Input ---
  for (const disabled of DISABLED_STATES) {
    for (const variant of INPUT_VARIANTS) {
      for (const size of SIZE_OPTIONS) {
        const fv = disabled === "disabled" ? "disabled" : variant
        const sl = disabled === "disabled" ? "禁用" : ""
        const vl = VARIANT_DESC[variant]
        rows.push({ ontoName: `input-${fv}-${size}`, dataSlot: "input", component: "Input", file: "input.tsx", variant: fv, size, state: disabled, tag: "<input>", description: `${vl}${sl ? " · " + sl : ""} · ${SIZE_DESC[size]}` })
        rows.push({ ontoName: `input-${fv}-${size}-left-icon`, dataSlot: "input", component: "Input", file: "input.tsx", variant: fv, size, state: disabled === "disabled" ? "disabled" : "left-icon", tag: "<div>", description: `${vl} · 左图标${sl ? " · " + sl : ""} · ${SIZE_DESC[size]}` })
        rows.push({ ontoName: `input-${fv}-${size}-right-icon`, dataSlot: "input", component: "Input", file: "input.tsx", variant: fv, size, state: disabled === "disabled" ? "disabled" : "right-icon", tag: "<div>", description: `${vl} · 右图标${sl ? " · " + sl : ""} · ${SIZE_DESC[size]}` })
      }
    }
  }

  // --- Select (Trigger / Content / Item / Value) ---
  for (const disabled of DISABLED_STATES) {
    for (const variant of SELECT_VARIANTS) {
      for (const size of SIZE_OPTIONS) {
        const fv = disabled === "disabled" ? "disabled" : variant
        const sl = disabled === "disabled" ? "禁用" : ""
        const vl = VARIANT_DESC[variant]
        for (const { slot, tag } of [{ slot: "select-trigger", tag: "<button>" }, { slot: "select-content", tag: "<div>" }, { slot: "select-item", tag: "<div>" }, { slot: "select-value", tag: "<span>" }]) {
          rows.push({ ontoName: `${slot}-${fv}-${size}`, dataSlot: slot, component: slot.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(""), file: "select.tsx", variant: fv, size, state: disabled, tag, description: `${vl}${sl ? " · " + sl : ""} · ${SIZE_DESC[size]}` })
        }
      }
    }
  }

  // --- Tabs ---
  for (const size of SIZE_OPTIONS) {
    rows.push({ ontoName: `tabs-${size}`, dataSlot: "tabs", component: "Tabs", file: "tabs.tsx", variant: "", size, state: "", tag: "<div>", description: `选项卡根 · ${SIZE_DESC[size]}` })
    rows.push({ ontoName: `tabs-content-${size}`, dataSlot: "tabs-content", component: "TabsContent", file: "tabs.tsx", variant: "", size, state: "", tag: "<div>", description: `内容区 · ${SIZE_DESC[size]}` })
  }
  for (const variant of TABS_VARIANTS) {
    for (const size of SIZE_OPTIONS) {
      rows.push({ ontoName: `tabs-list-${variant}-${size}`, dataSlot: "tabs-list", component: "TabsList", file: "tabs.tsx", variant, size, state: "", tag: "<div>", description: `${VARIANT_DESC[variant]} · ${SIZE_DESC[size]}` })
      rows.push({ ontoName: `tabs-trigger-${variant}-${size}`, dataSlot: "tabs-trigger", component: "TabsTrigger", file: "tabs.tsx", variant, size, state: "", tag: "<button>", description: `${VARIANT_DESC[variant]} · ${SIZE_DESC[size]}` })
    }
  }

  // --- NavigationItem ---
  for (const variant of NAV_VARIANTS) {
    for (const size of SIZE_OPTIONS) {
      rows.push({ ontoName: variantOntoName("navigation-item", variant, size), dataSlot: "navigation-item", component: "NavigationItem", file: "navigation-item.tsx", variant, size, state: "", tag: "<div>", description: `${VARIANT_DESC[variant]} · ${SIZE_DESC[size]}` })
    }
  }

  // --- Pagination ---
  for (const size of SIZE_OPTIONS) {
    rows.push({ ontoName: sizeOntoName("pagination", size), dataSlot: "pagination", component: "Pagination", file: "pagination.tsx", variant: "", size, state: "", tag: "<nav>", description: `分页容器 · ${SIZE_DESC[size]}` })
    rows.push({ ontoName: sizeOntoName("pagination-button", size), dataSlot: "pagination-button", component: "PaginationButton", file: "pagination.tsx", variant: "", size, state: "", tag: "<button>", description: `分页按钮 · ${SIZE_DESC[size]}` })
    rows.push({ ontoName: sizeOntoName("pagination-info", size), dataSlot: "pagination-info", component: "PaginationInfo", file: "pagination.tsx", variant: "", size, state: "", tag: "<div>", description: `页码信息 · ${SIZE_DESC[size]}` })
  }

  // --- SelectEditable ---
  for (const disabled of DISABLED_STATES) {
    for (const variant of SELECT_VARIANTS) {
      for (const size of SIZE_OPTIONS) {
        const fv = disabled === "disabled" ? "disabled" : variant
        const sl = disabled === "disabled" ? "禁用" : ""
        rows.push({ ontoName: `select-editable-trigger-${fv}-${size}`, dataSlot: "select-editable-trigger", component: "SelectEditable", file: "select-editable.tsx", variant: fv, size, state: disabled, tag: "<button>", description: `${VARIANT_DESC[variant]}${sl ? " · " + sl : ""} · ${SIZE_DESC[size]}` })
      }
    }
  }

  // --- 纯结构组件 ---
  const structural: [string, string, string, string, string][] = [
    ["toaster", "toaster", "Toaster", "sonner.tsx", "<div>"],
    ["cell", "cell", "Cell", "cell.tsx", "<div>"],
    ["cell-slot", "cell-slot", "CellSlot", "cell.tsx", "<div>"],
    ["button-link-manager", "button-link-manager", "ButtonLinkManager", "cell-renderers.tsx", "<div>"],
    ["data-table", "data-table", "DataTable", "data-table.tsx", "<div>"],
    ["row", "row", "RowRenderer", "data-table.tsx", "<div>"],
    ["group-header", "group-header", "GroupHeaderRow", "data-table.tsx", "<div>"],
    ["insert-row", "insert-row", "InsertRow", "data-table.tsx", "<div>"],
    ["dialog-content", "dialog-content", "DialogContent", "dialog.tsx", "<div>"],
    ["dialog-header", "dialog-header", "DialogHeader", "dialog.tsx", "<div>"],
    ["dialog-body", "dialog-body", "DialogBody", "dialog.tsx", "<div>"],
    ["dialog-field", "dialog-field", "DialogField", "dialog.tsx", "<div>"],
    ["dialog-footer", "dialog-footer", "DialogFooter", "dialog.tsx", "<div>"],
    ["dialog-title", "dialog-title", "DialogTitle", "dialog.tsx", "<h2>"],
    ["dialog-description", "dialog-description", "DialogDescription", "dialog.tsx", "<p>"],
    ["drawer-content", "drawer-content", "DrawerContent", "drawer.tsx", "<div>"],
    ["drawer-header", "drawer-header", "DrawerHeader", "drawer.tsx", "<div>"],
    ["drawer-body", "drawer-body", "DrawerBody", "drawer.tsx", "<div>"],
    ["drawer-field", "drawer-field", "DrawerField", "drawer.tsx", "<div>"],
    ["drawer-footer", "drawer-footer", "DrawerFooter", "drawer.tsx", "<div>"],
    ["drawer-title", "drawer-title", "DrawerTitle", "drawer.tsx", "<h2>"],
    ["drawer-description", "drawer-description", "DrawerDescription", "drawer.tsx", "<p>"],
    ["header-cell-dimension", "header-cell-dimension", "HeaderCellDimensionView", "header-cell-dimension.tsx", "<div>"],
    ["header-cell-edit", "header-cell-edit", "HeaderCellEditView", "header-cell-edit.tsx", "<div>"],
    ["hide-column-view", "hide-column-view", "HeaderCellHideManagerView", "header-cell-hide-manager.tsx", "<div>"],
    ["header-cell-menu", "header-cell-menu", "HeaderCellMenuView", "header-cell-menu.tsx", "<div>"],
    ["popover-content", "popover-content", "PopoverContent", "popover.tsx", "<div>"],
    ["popover-item", "popover-item", "PopoverItem", "popover.tsx", "<div>"],
    ["popover-menu-item", "popover-menu-item", "PopoverMenuItem", "popover.tsx", "<div>"],
    ["popover-label", "popover-label", "PopoverLabel", "popover.tsx", "<div>"],
    ["popover-separator", "popover-separator", "PopoverSeparator", "popover.tsx", "<div>"],
    ["popover-checkbox-item", "popover-checkbox-item", "PopoverCheckboxItem", "popover-checkbox.tsx", "<div>"],
    ["popover-radio-group", "popover-radio-group", "PopoverRadioGroup", "popover-radio.tsx", "<div>"],
    ["popover-radio-item", "popover-radio-item", "PopoverRadioItem", "popover-radio.tsx", "<div>"],
    ["popover-sub-trigger", "popover-sub-trigger", "PopoverSubTrigger", "popover-sub.tsx", "<div>"],
    ["popover-sub-content", "popover-sub-content", "PopoverSubContent", "popover-sub.tsx", "<div>"],
    ["table", "table", "Table", "table.tsx", "<div>"],
    ["tooltip-content", "tooltip-content", "TooltipContent", "tooltip.tsx", "<div>"],
    ["tooltip-arrow", "tooltip-arrow", "TooltipArrow", "tooltip.tsx", "<svg>"],
    ["upload", "upload", "Upload", "upload.tsx", "<div>"],
    ["upload-thumbnail", "upload-thumbnail", "UploadThumbnail", "upload.tsx", "<div>"],
  ]
  for (const [n, s, c, f, t] of structural) {
    rows.push({ ontoName: n, dataSlot: s, component: c, file: f, variant: "", size: "", state: "", tag: t, description: "" })
  }

  return rows
}

// ============================================
// 页面组件
// ============================================

export default function App() {
  const dict = React.useMemo(() => generateDictionary(), [])
  const tableData = React.useMemo(() => toTableData(dict, true), [dict])

  const cellRenderers = React.useMemo(
    () => ({ ...defaultCellRenderers, preview: PreviewCellRenderer }),
    []
  )

  return (
    <TooltipProvider>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "var(--white-100)" }}>
        {/* 标题栏 */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 32px", borderBottom: "1px solid var(--neutral-2)", flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 600, lineHeight: "32px", color: "var(--neutral-5)", margin: 0 }}>
              Vdesign 组件数据字典
            </h1>
            <p style={{ fontSize: "14px", lineHeight: "20px", color: "var(--neutral-4)", margin: "4px 0 0 0" }}>
              {dict.length} 个产品本体名，覆盖所有 variant × size × state 组合，Vdata 埋点追踪的数据依据
            </p>
          </div>
        </div>

        {/* 表格区 */}
        <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "0 32px 32px" }}>
          <div style={{ marginTop: "24px" }}>
            <DataTable data={tableData} variant="base" contained readOnly cellRenderers={cellRenderers} />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
