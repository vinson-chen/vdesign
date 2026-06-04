import * as React from "react"
import "../styles.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverMenuItem,
  PopoverCheckboxItem,
  PopoverRadioGroup,
  PopoverRadioItem,
  PopoverLabel,
  PopoverSeparator,
  PopoverSub,
  PopoverSubTrigger,
  PopoverSubContent,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogField,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerField,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Switch } from "@/components/ui/switch"
import { Radio } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import { Cell } from "@/components/ui/cell"
import { Table } from "@/components/ui/table"
import { DataTable } from "@/components/ui/data-table"
import { PopoverEditContent } from "@/components/ui/popover-edit-content"
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationInfo,
} from "@/components/ui/pagination"
import {
  generateColorScale,
  updateCSSVariables,
  DEFAULT_BRAND_COLOR,
  DEFAULT_WARNING_COLOR,
  DEFAULT_ERROR_COLOR,
  DEFAULT_SUCCESS_COLOR,
  DEFAULT_SCALE_CONFIG,
  ColorScaleConfig,
} from "@/lib/color-scale"

// ============================================
// 数据定义
// ============================================

// 中性色
const neutralColors = [
  { name: "neutral-1", value: "#F2F2F2" },
  { name: "neutral-2", value: "#E5E5E5" },
  { name: "neutral-3", value: "#BFBFBF" },
  { name: "neutral-4", value: "#737373" },
  { name: "neutral-5", value: "#262626" },
  { name: "neutral-6", value: "#000000" },
]

// 黑色透明
const blackColors = [
  { name: "black-5", value: "5%" },
  { name: "black-10", value: "10%" },
  { name: "black-25", value: "25%" },
  { name: "black-55", value: "55%" },
  { name: "black-85", value: "85%" },
  { name: "black-100", value: "100%" },
]

// 白色透明
const whiteColors = [
  { name: "white-10", value: "10%" },
  { name: "white-20", value: "20%" },
  { name: "white-30", value: "30%" },
  { name: "white-60", value: "60%" },
  { name: "white-90", value: "90%" },
  { name: "white-100", value: "100%" },
]

// 常规文字字号
const textSizesRegular = [
  { name: "r-xs", value: "12/20" },
  { name: "r-sm", value: "14/24" },
  { name: "r-base", value: "16/24" },
  { name: "r-lg", value: "20/28" },
  { name: "r-xl", value: "24/32" },
  { name: "r-2xl", value: "28/36" },
]

// 中等文字字号
const textSizesMedium = [
  { name: "m-xs", value: "12/20" },
  { name: "m-sm", value: "14/24" },
  { name: "m-base", value: "16/24" },
  { name: "m-lg", value: "20/28" },
  { name: "m-xl", value: "24/32" },
  { name: "m-2xl", value: "28/36" },
]

// 半粗文字字号
const textSizesSemibold = [
  { name: "s-xs", value: "12/20" },
  { name: "s-sm", value: "14/24" },
  { name: "s-base", value: "16/24" },
  { name: "s-lg", value: "20/28" },
  { name: "s-xl", value: "24/32" },
  { name: "s-2xl", value: "28/36" },
]

// 图标列表
const icons = [
  { name: "icon-vcell-logo" },
  { name: "icon-hashtag" },
  { name: "icon-slash" },
  { name: "icon-grid-all" },
  { name: "icon-grid-row" },
  { name: "icon-grid-cell" },
  { name: "icon-grid-column" },
  { name: "icon-switch-off" },
  { name: "icon-switch" },
  { name: "icon-v-cell" },
  { name: "icon-check-sm" },
  { name: "icon-close-sm" },
  { name: "icon-edit" },
  { name: "icon-edit-filled" },
  { name: "icon-a-chevron-leftdouble" },
  { name: "icon-a-chevron-rightdouble" },
  { name: "icon-a-order-adjustmentcolumn" },
  { name: "icon-chevron-right-rectangle" },
  { name: "icon-arrow-left-down" },
  { name: "icon-add" },
  { name: "icon-adjustment" },
  { name: "icon-chevron-right-circle" },
  { name: "icon-bill-filled" },
  { name: "icon-arrow-triangle-up-filled" },
  { name: "icon-add-circle" },
  { name: "icon-adjustment-filled" },
  { name: "icon-activity-filled" },
  { name: "icon-activity" },
  { name: "icon-arrow-right-up" },
  { name: "icon-app-filled" },
  { name: "icon-calendar-1" },
  { name: "icon-airplay-wave-filled" },
  { name: "icon-arrow-down" },
  { name: "icon-add-circle-filled" },
  { name: "icon-chevron-left" },
  { name: "icon-chart-filled" },
  { name: "icon-attach" },
  { name: "icon-caret-down-small" },
  { name: "icon-browse-off-filled" },
  { name: "icon-browse-filled" },
  { name: "icon-book-unknown" },
  { name: "icon-book-unknown-filled" },
  { name: "icon-calendar-2" },
  { name: "icon-arrow-triangle-down-filled" },
  { name: "icon-airplay-wave" },
  { name: "icon-align-vertical" },
  { name: "icon-arrow-right-down" },
  { name: "icon-arrow-up" },
  { name: "icon-call-off" },
  { name: "icon-cart-filled" },
  { name: "icon-alarm" },
  { name: "icon-address-book-filled" },
  { name: "icon-delete" },
  { name: "icon-cart" },
  { name: "icon-bulletpoint" },
  { name: "icon-arrow-left" },
  { name: "icon-camera" },
  { name: "icon-caret-up-small" },
  { name: "icon-creditcard" },
  { name: "icon-chevron-up-rectangle" },
  { name: "icon-align-top" },
  { name: "icon-app" },
  { name: "icon-book-open" },
  { name: "icon-call-off-filled" },
  { name: "icon-chevron-down-double" },
  { name: "icon-barcode-1" },
  { name: "icon-camera-filled" },
  { name: "icon-base-station" },
  { name: "icon-clear-filled" },
  { name: "icon-calendar-2-filled" },
  { name: "icon-chart-combo" },
  { name: "icon-catalog-filled" },
  { name: "icon-chart-line-data-1" },
  { name: "icon-chevron-down" },
  { name: "icon-chat-message" },
  { name: "icon-align-bottom" },
  { name: "icon-arrow-right" },
  { name: "icon-bookmark-filled" },
  { name: "icon-clear" },
  { name: "icon-delete-filled" },
  { name: "icon-caret-right-small" },
  { name: "icon-call-1-filled" },
  { name: "icon-chart-combo-filled" },
  { name: "icon-copy" },
  { name: "icon-arrow-left-up" },
  { name: "icon-certificate-1" },
  { name: "icon-check-circle-filled" },
  { name: "icon-browse" },
  { name: "icon-chart" },
  { name: "icon-check" },
  { name: "icon-compass" },
  { name: "icon-cpu-filled" },
  { name: "icon-call-1" },
  { name: "icon-chevron-right-circle-filled" },
  { name: "icon-cloud-download" },
  { name: "icon-chevron-up" },
  { name: "icon-course-filled" },
  { name: "icon-clear-formatting" },
  { name: "icon-filter-2-filled" },
  { name: "icon-chevron-left-circle-filled" },
  { name: "icon-chevron-up-circle" },
  { name: "icon-swap" },
  { name: "icon-arrow-triangle-down" },
  { name: "icon-alarm-filled" },
  { name: "icon-chevron-down-rectangle" },
  { name: "icon-ellipsis" },
  { name: "icon-bill" },
  { name: "icon-calendar-1-filled" },
  { name: "icon-data-filled" },
  { name: "icon-call-filled" },
  { name: "icon-arrow-triangle-up" },
  { name: "icon-close-circle" },
  { name: "icon-bluetooth" },
  { name: "icon-chevron-left-circle" },
  { name: "icon-control-platform-filled" },
  { name: "icon-browse-off" },
  { name: "icon-fullscreen-exit-1" },
  { name: "icon-link" },
  { name: "icon-call" },
  { name: "icon-chevron-up-double" },
  { name: "icon-control-platform" },
  { name: "icon-file-1" },
  { name: "icon-chevron-right" },
  { name: "icon-save" },
  { name: "icon-cpu" },
  { name: "icon-download" },
  { name: "icon-chevron-down-circle" },
  { name: "icon-check-circle" },
  { name: "icon-caret-left-small" },
  { name: "icon-address-book" },
  { name: "icon-close" },
  { name: "icon-course" },
  { name: "icon-chevron-down-circle-filled" },
  { name: "icon-certificate-1-filled" },
  { name: "icon-chat-double-filled" },
  { name: "icon-chart-pie" },
  { name: "icon-chart-analytics" },
  { name: "icon-cloud-upload" },
  { name: "icon-form-filled" },
  { name: "icon-chevron-left-rectangle" },
  { name: "icon-fork-filled" },
  { name: "icon-close-circle-filled" },
  { name: "icon-flag-filled" },
  { name: "icon-chat-filled" },
  { name: "icon-format-vertical-align-left" },
  { name: "icon-book-open-filled" },
  { name: "icon-flag" },
  { name: "icon-format-vertical-align-right" },
  { name: "icon-chart-pie-filled" },
  { name: "icon-bookmark" },
  { name: "icon-add-rectangle" },
  { name: "icon-compass-filled" },
  { name: "icon-catalog" },
  { name: "icon-desktop" },
  { name: "icon-expand-vertical" },
  { name: "icon-creditcard-filled" },
  { name: "icon-lock-on-filled" },
  { name: "icon-move-1" },
  { name: "icon-microphone-1-filled" },
  { name: "icon-form" },
  { name: "icon-remove" },
  { name: "icon-rocket" },
  { name: "icon-no-result" },
  { name: "icon-rollfront" },
  { name: "icon-map-ruler-filled" },
  { name: "icon-clear-formatting-filled" },
  { name: "icon-rollback" },
  { name: "icon-notification" },
  { name: "icon-tree-round-dot-vertical" },
  { name: "icon-map" },
  { name: "icon-lock-on" },
  { name: "icon-chevron-up-circle-filled" },
  { name: "icon-chat-double" },
  { name: "icon-shop" },
  { name: "icon-jump" },
  { name: "icon-filter" },
  { name: "icon-gift" },
  { name: "icon-gift-filled" },
  { name: "icon-filter-2" },
  { name: "icon-location-filled" },
  { name: "icon-folder" },
  { name: "icon-expand-horizontal" },
  { name: "icon-store-filled" },
  { name: "icon-link-filled" },
  { name: "icon-time-filled" },
  { name: "icon-stop-circle-filled" },
  { name: "icon-error-triangle" },
  { name: "icon-menu-application" },
  { name: "icon-device" },
  { name: "icon-tag" },
  { name: "icon-mouse-filled" },
  { name: "icon-device-filled" },
  { name: "icon-sonic" },
  { name: "icon-user-checked-filled" },
  { name: "icon-user-add" },
  { name: "icon-map-filled" },
  { name: "icon-remote-wave-filled" },
  { name: "icon-Info" },
  { name: "icon-mouse" },
  { name: "icon-hotspot-wave-filled" },
  { name: "icon-unfold-less" },
  { name: "icon-indent-right" },
  { name: "icon-help" },
  { name: "icon-error" },
  { name: "icon-fork" },
  { name: "icon-notification-filled" },
  { name: "icon-stop-circle" },
  { name: "icon-ticket-filled" },
  { name: "icon-no-result-filled" },
  { name: "icon-home" },
  { name: "icon-file-1-filled" },
  { name: "icon-lock-off" },
  { name: "icon-zoom-in-filled" },
  { name: "icon-swap-left" },
  { name: "icon-scan" },
  { name: "icon-image" },
  { name: "icon-system-application-filled" },
  { name: "icon-image-filled" },
  { name: "icon-desktop-filled" },
  { name: "icon-mobile-filled" },
  { name: "icon-zoom-in" },
  { name: "icon-file-copy-filled" },
  { name: "icon-usb-filled" },
  { name: "icon-system-application" },
  { name: "icon-heart-filled" },
  { name: "icon-grid-add-filled" },
  { name: "icon-help-circle" },
  { name: "icon-mode-dark-filled" },
  { name: "icon-map-information-2" },
  { name: "icon-remote-wave" },
  { name: "icon-info-circle-filled" },
  { name: "icon-folder-open-1" },
  { name: "icon-mobile" },
  { name: "icon-object-storage" },
  { name: "icon-thumb-up-filled" },
  { name: "icon-unfold-more" },
  { name: "icon-tips-filled" },
  { name: "icon-info-circle" },
  { name: "icon-service-filled" },
  { name: "icon-error-circle" },
  { name: "icon-mail" },
  { name: "icon-home-filled" },
  { name: "icon-error-triangle-filled" },
  { name: "icon-mode-light-filled" },
  { name: "icon-map-ruler" },
  { name: "icon-move" },
  { name: "icon-keyboard" },
  { name: "icon-view-list" },
  { name: "icon-fullscreen-1" },
  { name: "icon-task-filled" },
  { name: "icon-history" },
  { name: "icon-send-filled" },
  { name: "icon-pause-circle-filled" },
  { name: "icon-textformat-bold" },
  { name: "icon-tag-filled" },
  { name: "icon-secured" },
  { name: "icon-lightbulb-filled" },
  { name: "icon-user-list-filled" },
  { name: "icon-pause-circle" },
  { name: "icon-more" },
  { name: "icon-ticket" },
  { name: "icon-usb" },
  { name: "icon-format-vertical-align-center" },
  { name: "icon-send" },
  { name: "icon-setting" },
  { name: "icon-login" },
  { name: "icon-tips" },
  { name: "icon-rocket-filled" },
  { name: "icon-store" },
  { name: "icon-user-checked" },
  { name: "icon-load" },
  { name: "icon-help-circle-filled" },
  { name: "icon-internet" },
  { name: "icon-share-filled" },
  { name: "icon-shield-error-filled" },
  { name: "icon-map-information-2-filled" },
  { name: "icon-logout" },
  { name: "icon-image-1-filled" },
  { name: "icon-save-filled" },
  { name: "icon-sensors-1" },
  { name: "icon-indent-left" },
  { name: "icon-shrink-horizontal" },
  { name: "icon-textformat-italic" },
  { name: "icon-shop-filled" },
  { name: "icon-search-filled" },
  { name: "icon-sound-mute-1" },
  { name: "icon-error-circle-filled" },
  { name: "icon-image-1" },
  { name: "icon-textformat-color" },
  { name: "icon-heart" },
  { name: "icon-tree-round-dot" },
  { name: "icon-mode-light" },
  { name: "icon-verify" },
  { name: "icon-wifi" },
  { name: "icon-user-setting-filled" },
  { name: "icon-play-circle-filled" },
  { name: "icon-thumb-down" },
  { name: "icon-user-add-filled" },
  { name: "icon-refresh" },
  { name: "icon-setting-filled" },
  { name: "icon-location" },
  { name: "icon-tree-round-dot-vertical-filled" },
  { name: "icon-thumb-up" },
  { name: "icon-link-unlink" },
  { name: "icon-video-camera" },
  { name: "icon-sound-mute-1-filled" },
  { name: "icon-shield-error" },
  { name: "icon-order-ascending" },
  { name: "icon-service" },
  { name: "icon-grid-add" },
  { name: "icon-hotspot-wave" },
  { name: "icon-search" },
  { name: "icon-textformat-strikethrough" },
  { name: "icon-sound-low-filled" },
  { name: "icon-folder-open-1-filled" },
  { name: "icon-folder-filled" },
  { name: "icon-user-list" },
  { name: "icon-microphone-1" },
  { name: "icon-keyboard-filled" },
  { name: "icon-mode-dark" },
  { name: "icon-zoom-out" },
  { name: "icon-fullscreen" },
  { name: "icon-wallet" },
  { name: "icon-lock-off-filled" },
  { name: "icon-verify-filled" },
  { name: "icon-upload" },
  { name: "icon-minus-circle-filled" },
  { name: "icon-wallet-filled" },
  { name: "icon-textformat-underline" },
  { name: "icon-pin-filled" },
  { name: "icon-video-camera-filled" },
  { name: "icon-fullscreen-exit" },
  { name: "icon-minus-rectangle" },
  { name: "icon-tree-round-dot-filled" },
  { name: "icon-palette-filled" },
  { name: "icon-print-filled" },
  { name: "icon-user" },
  { name: "icon-translate" },
  { name: "icon-lightbulb" },
  { name: "icon-user-transmit-filled" },
  { name: "icon-filter-filled" },
  { name: "icon-sensors" },
  { name: "icon-mail-filled" },
  { name: "icon-server" },
  { name: "icon-link" },
  { name: "icon-pin" },
  { name: "icon-file-copy" },
  { name: "icon-thumb-down-filled" },
  { name: "icon-play-circle" },
  { name: "icon-swap-right" },
  { name: "icon-secured-filled" },
  { name: "icon-user-setting" },
  { name: "icon-zoom-out-filled" },
  { name: "icon-wifi-no-filled" },
  { name: "icon-task" },
  { name: "icon-print" },
  { name: "icon-wifi-off" },
  { name: "icon-wifi-no" },
  { name: "icon-order-descending" },
  { name: "icon-qrcode" },
  { name: "icon-grid-view-filled" },
  { name: "icon-time" },
  { name: "icon-user-transmit" },
  { name: "icon-share" },
  { name: "icon-wifi-off-1-filled" },
  { name: "icon-grid-view" },
  { name: "icon-minus-circle" },
  { name: "icon-wifi-1-filled" },
  { name: "icon-user-filled" },
  { name: "icon-line-height" },
  { name: "icon-view-in-ar" },
  { name: "icon-palette" },
  { name: "icon-sound-low" },
]

// 字号映射表
const fontSizeMap: Record<string, string> = {
  "r-xs": "12px",
  "r-sm": "14px",
  "r-base": "16px",
  "r-lg": "20px",
  "r-xl": "24px",
  "r-2xl": "28px",
  "m-xs": "12px",
  "m-sm": "14px",
  "m-base": "16px",
  "m-lg": "20px",
  "m-xl": "24px",
  "m-2xl": "28px",
  "s-xs": "12px",
  "s-sm": "14px",
  "s-base": "16px",
  "s-lg": "20px",
  "s-xl": "24px",
  "s-2xl": "28px",
}

// ============================================
// 组件定义
// ============================================

// 统一卡片组件
interface CardProps {
  name?: string // 旧参数，兼容用
  value?: string // 旧参数，兼容用
  children?: React.ReactNode
  exampleStyle?: React.CSSProperties
  onClick?: () => void
  // 结构化参数格式
  label?: string // 左侧显示的标签（单按钮场景）
  copyText?: string // 点击复制的内容（单按钮场景）
  items?: { label: string; copyText: string }[] // 多按钮场景
}

function Card({
  name,
  value,
  children,
  exampleStyle,
  onClick,
  label,
  copyText,
  items,
}: CardProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = (text: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    navigator.clipboard.writeText(text)
    setCopied(true)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  // 判断是否使用新格式
  const useNewFormat = label || copyText || items

  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{
        border: "1px solid var(--neutral-2)",
        borderRadius: "var(--radius-card)",
      }}
      onClick={onClick}
    >
      {/* 示例区 */}
      <div
        className="relative min-h-24 p-2"
        style={{ backgroundColor: "var(--white-100)", ...exampleStyle }}
      >
        {children}
      </div>
      {/* 参数区 */}
      <div
        className="flex flex-grow items-center justify-between p-2"
        style={{
          backgroundColor: "var(--white-100)",
          borderTop: "1px solid var(--neutral-2)",
        }}
      >
        {useNewFormat ? (
          <>
            {/* 左侧：单按钮或多按钮 */}
            {items && items.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {items.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleCopy(item.copyText, e)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleCopy(copyText || label || "", e)}
              >
                {label}
              </Button>
            )}
            {/* 右侧：已复制提示 */}
            {copied && (
              <p
                className="font-mono"
                style={{
                  color: "var(--neutral-4)",
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
              >
                已复制
              </p>
            )}
          </>
        ) : (
          <>
            {/* 兼容旧格式 */}
            <p
              className="font-mono"
              style={{
                color: "var(--neutral-5)",
                fontSize: "12px",
                lineHeight: "20px",
                fontWeight: 400,
              }}
            >
              {name}
            </p>
            {value && (
              <p
                className="font-mono"
                style={{
                  color: "var(--neutral-4)",
                  fontSize: "12px",
                  lineHeight: "20px",
                  fontWeight: 400,
                }}
              >
                {value}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// 卡片网格容器组件
interface CardGridProps {
  cols?: 1 | 2 | 3 | 6
  children: React.ReactNode
}

function CardGrid({ cols = 6, children }: CardGridProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6",
  }
  return <div className={`grid ${gridClass[cols]} gap-4`}>{children}</div>
}

// 区块标题组件
function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      style={{
        color: "var(--neutral-5)",
        fontSize: "24px",
        lineHeight: "32px",
        fontWeight: 600,
        marginBottom: "32px",
      }}
    >
      {title}
    </h2>
  )
}

// 色阶配置抽屉组件
function ColorConfigDrawer({
  open,
  onClose,
  colorType,
  mainColor,
  scaleConfig,
  generatedColors,
  onColorChange,
  onConfigChange,
  onReset,
}: {
  open: boolean
  onClose: () => void
  colorType: "brand" | "success" | "warning" | "error"
  mainColor: string
  scaleConfig: ColorScaleConfig[]
  generatedColors: Record<
    string,
    { hex: string; oklch: string; params: string }
  >
  onColorChange: (color: string) => void
  onConfigChange: (
    index: number,
    field: "opacity" | "saturationMult",
    value: number
  ) => void
  onReset: () => void
}) {
  const titles = {
    brand: "品牌色参数",
    success: "安全色参数",
    warning: "警告色参数",
    error: "危险色参数",
  }

  const descriptions = {
    brand: "配置品牌色色阶的混合透明度和饱和度系数",
    success: "配置安全色色阶的混合透明度和饱和度系数",
    warning: "配置警告色色阶的混合透明度和饱和度系数",
    error: "配置危险色色阶的混合透明度和饱和度系数",
  }

  const scaleNames = {
    brand: ["brand-1", "brand-2", "brand-3", "brand-4", "brand-5", "brand-6"],
    success: [
      "success-1",
      "success-2",
      "success-3",
      "success-4",
      "success-5",
      "success-6",
    ],
    warning: [
      "warning-1",
      "warning-2",
      "warning-3",
      "warning-4",
      "warning-5",
      "warning-6",
    ],
    error: ["error-1", "error-2", "error-3", "error-4", "error-5", "error-6"],
  }

  const names = scaleNames[colorType]

  // 输入框临时状态，用于处理空值和失焦恢复
  const [inputValues, setInputValues] = React.useState<
    Record<string, { opacity: string; saturationMult: string }>
  >({})

  // 当抽屉打开或配置变化时，同步输入框状态
  React.useEffect(() => {
    if (open) {
      const newValues: Record<
        string,
        { opacity: string; saturationMult: string }
      > = {}
      scaleConfig.forEach((config) => {
        newValues[config.name] = {
          opacity: String(config.opacity),
          saturationMult: String(config.saturationMult),
        }
      })
      setInputValues(newValues)
    }
  }, [open, scaleConfig])

  // 获取默认值
  const getDefaultValues = (index: number) => {
    const defaultConfig = DEFAULT_SCALE_CONFIG[index]
    return {
      opacity: defaultConfig?.opacity ?? 0,
      saturationMult: defaultConfig?.saturationMult ?? 1,
    }
  }

  // 处理输入变化
  const handleInputChange = (
    index: number,
    field: "opacity" | "saturationMult",
    value: string
  ) => {
    const config = scaleConfig[index]
    if (!config) return

    const currentValues = inputValues[config.name] || {
      opacity: String(config.opacity),
      saturationMult: String(config.saturationMult),
    }
    setInputValues({
      ...inputValues,
      [config.name]: {
        opacity: field === "opacity" ? value : currentValues.opacity,
        saturationMult:
          field === "saturationMult" ? value : currentValues.saturationMult,
      },
    })

    // 只有在有效数值时才触发回调
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      onConfigChange(index, field, numValue)
    }
  }

  // 处理失焦恢复默认值
  const handleBlur = (index: number, field: "opacity" | "saturationMult") => {
    const config = scaleConfig[index]
    if (!config) return

    const currentValue = inputValues[config.name]?.[field] ?? ""
    if (currentValue === "" || currentValue === undefined) {
      const defaults = getDefaultValues(index)
      const defaultValue = defaults[field]

      // 恢复输入框状态
      const currentValues = inputValues[config.name] || {
        opacity: "",
        saturationMult: "",
      }
      setInputValues({
        ...inputValues,
        [config.name]: {
          opacity:
            field === "opacity" ? String(defaultValue) : currentValues.opacity,
          saturationMult:
            field === "saturationMult"
              ? String(defaultValue)
              : currentValues.saturationMult,
        },
      })

      // 触发回调
      onConfigChange(index, field, defaultValue)
    }
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent size="wide">
        <DrawerHeader size="wide">
          <DrawerTitle size="wide">{titles[colorType]}</DrawerTitle>
          <DrawerDescription size="wide">
            {descriptions[colorType]}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody size="wide">
          {scaleConfig.map((config, index) => {
            const colorName = names[index]
            if (!colorName) return null

            return (
              <DrawerField size="wide" key={config.name}>
                <div className="flex items-center gap-3 rounded-lg border border-neutral-2 p-3">
                  {/* 色卡区 */}
                  <div
                    className="relative size-12 shrink-0 cursor-pointer rounded-lg"
                    style={{
                      backgroundColor: generatedColors[colorName]?.oklch,
                    }}
                  >
                    {index === 4 && (
                      <input
                        type="color"
                        value={mainColor}
                        onChange={(e) => onColorChange(e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                    )}
                  </div>
                  {/* 色值区 */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <span className="text-sm font-medium text-black-85">
                      {colorName}
                    </span>
                    <span className="font-mono text-xs text-black-55">
                      {generatedColors[colorName]?.hex?.toUpperCase()}{" "}
                      {generatedColors[colorName]?.oklch}
                    </span>
                  </div>
                  {/* 配置区 */}
                  {index !== 4 && (
                    <div className="flex shrink-0 items-center gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-black-55">透明度</span>
                        <Input
                          type="number"
                          value={
                            inputValues[config.name]?.opacity ?? config.opacity
                          }
                          onChange={(e) =>
                            handleInputChange(index, "opacity", e.target.value)
                          }
                          onBlur={() => handleBlur(index, "opacity")}
                          variant="basic"
                          size="base"
                          noSpinner
                          className="w-14"
                          min={0}
                          max={100}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-black-55">饱和度</span>
                        <Input
                          type="number"
                          value={
                            inputValues[config.name]?.saturationMult ??
                            config.saturationMult
                          }
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "saturationMult",
                              e.target.value
                            )
                          }
                          onBlur={() => handleBlur(index, "saturationMult")}
                          variant="basic"
                          size="base"
                          noSpinner
                          className="w-14"
                          min={0}
                          max={3}
                          step={0.1}
                        />
                      </div>
                    </div>
                  )}
                  {index === 4 && (
                    <Button variant="outline" size="base" onClick={onReset}>
                      恢复默认
                    </Button>
                  )}
                </div>
              </DrawerField>
            )
          })}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

// ============================================
// 页面组件
// ============================================

// 颜色页面组件
function ColorPage() {
  // 品牌色状态
  const [brandDrawerOpen, setBrandDrawerOpen] = React.useState(false)
  const [brandColor, setBrandColor] = React.useState(() => {
    return localStorage.getItem("brandColor") || DEFAULT_BRAND_COLOR
  })
  const [brandScaleConfig, setBrandScaleConfig] = React.useState<
    ColorScaleConfig[]
  >(() => {
    const saved = localStorage.getItem("brandScaleConfig")
    return saved ? JSON.parse(saved) : DEFAULT_SCALE_CONFIG
  })
  const [brandScale, setBrandScale] = React.useState(() =>
    generateColorScale(brandColor, brandScaleConfig, "brand")
  )

  // 安全色状态
  const [successDrawerOpen, setSuccessDrawerOpen] = React.useState(false)
  const [successColor, setSuccessColor] = React.useState(() => {
    return localStorage.getItem("successColor") || DEFAULT_SUCCESS_COLOR
  })
  const [successScaleConfig, setSuccessScaleConfig] = React.useState<
    ColorScaleConfig[]
  >(() => {
    const saved = localStorage.getItem("successScaleConfig")
    return saved ? JSON.parse(saved) : DEFAULT_SCALE_CONFIG
  })
  const [successScale, setSuccessScale] = React.useState(() =>
    generateColorScale(successColor, successScaleConfig, "success")
  )

  // 警告色状态
  const [warningDrawerOpen, setWarningDrawerOpen] = React.useState(false)
  const [warningColor, setWarningColor] = React.useState(() => {
    return localStorage.getItem("warningColor") || DEFAULT_WARNING_COLOR
  })
  const [warningScaleConfig, setWarningScaleConfig] = React.useState<
    ColorScaleConfig[]
  >(() => {
    const saved = localStorage.getItem("warningScaleConfig")
    return saved ? JSON.parse(saved) : DEFAULT_SCALE_CONFIG
  })
  const [warningScale, setWarningScale] = React.useState(() =>
    generateColorScale(warningColor, warningScaleConfig, "warning")
  )

  // 危险色状态
  const [errorDrawerOpen, setErrorDrawerOpen] = React.useState(false)
  const [errorColor, setErrorColor] = React.useState(() => {
    return localStorage.getItem("errorColor") || DEFAULT_ERROR_COLOR
  })
  const [errorScaleConfig, setErrorScaleConfig] = React.useState<
    ColorScaleConfig[]
  >(() => {
    const saved = localStorage.getItem("errorScaleConfig")
    return saved ? JSON.parse(saved) : DEFAULT_SCALE_CONFIG
  })
  const [errorScale, setErrorScale] = React.useState(() =>
    generateColorScale(errorColor, errorScaleConfig, "error")
  )

  // 初始化 CSS 变量
  React.useEffect(() => {
    updateCSSVariables(brandScale)
    updateCSSVariables(successScale)
    updateCSSVariables(warningScale)
    updateCSSVariables(errorScale)
  }, [])

  // 创建通用的处理函数
  const createColorHandlers = (
    colorType: "brand" | "success" | "warning" | "error",
    defaultColor: string,
    setColor: React.Dispatch<React.SetStateAction<string>>,
    setScaleConfig: React.Dispatch<React.SetStateAction<ColorScaleConfig[]>>,
    setScale: React.Dispatch<
      React.SetStateAction<
        Record<string, { hex: string; oklch: string; params: string }>
      >
    >,
    currentColor: string,
    currentConfig: ColorScaleConfig[]
  ) => {
    const handleColorChange = (newColor: string) => {
      setColor(newColor)
      const newScale = generateColorScale(newColor, currentConfig, colorType)
      setScale(newScale)
      updateCSSVariables(newScale)
      localStorage.setItem(`${colorType}Color`, newColor)
    }

    const handleConfigChange = (
      index: number,
      field: "opacity" | "saturationMult",
      value: number
    ) => {
      const newConfig = [...currentConfig]
      const current = newConfig[index]
      if (current) {
        newConfig[index] = { ...current, [field]: value }
        setScaleConfig(newConfig)
        const newScale = generateColorScale(currentColor, newConfig, colorType)
        setScale(newScale)
        updateCSSVariables(newScale)
        localStorage.setItem(
          `${colorType}ScaleConfig`,
          JSON.stringify(newConfig)
        )
      }
    }

    const handleReset = () => {
      setColor(defaultColor)
      setScaleConfig(DEFAULT_SCALE_CONFIG)
      const newScale = generateColorScale(
        defaultColor,
        DEFAULT_SCALE_CONFIG,
        colorType
      )
      setScale(newScale)
      updateCSSVariables(newScale)
      localStorage.setItem(`${colorType}Color`, defaultColor)
      localStorage.setItem(
        `${colorType}ScaleConfig`,
        JSON.stringify(DEFAULT_SCALE_CONFIG)
      )
    }

    return { handleColorChange, handleConfigChange, handleReset }
  }

  const brandHandlers = createColorHandlers(
    "brand",
    DEFAULT_BRAND_COLOR,
    setBrandColor,
    setBrandScaleConfig,
    setBrandScale,
    brandColor,
    brandScaleConfig
  )
  const successHandlers = createColorHandlers(
    "success",
    DEFAULT_SUCCESS_COLOR,
    setSuccessColor,
    setSuccessScaleConfig,
    setSuccessScale,
    successColor,
    successScaleConfig
  )
  const warningHandlers = createColorHandlers(
    "warning",
    DEFAULT_WARNING_COLOR,
    setWarningColor,
    setWarningScaleConfig,
    setWarningScale,
    warningColor,
    warningScaleConfig
  )
  const errorHandlers = createColorHandlers(
    "error",
    DEFAULT_ERROR_COLOR,
    setErrorColor,
    setErrorScaleConfig,
    setErrorScale,
    errorColor,
    errorScaleConfig
  )

  const dynamicBrandColors = Object.entries(brandScale).map(
    ([name, value]) => ({
      name,
      value: value.hex.toUpperCase(),
    })
  )

  const dynamicSuccessColors = Object.entries(successScale).map(
    ([name, value]) => ({
      name,
      value: value.hex.toUpperCase(),
    })
  )

  const dynamicWarningColors = Object.entries(warningScale).map(
    ([name, value]) => ({
      name,
      value: value.hex.toUpperCase(),
    })
  )

  const dynamicErrorColors = Object.entries(errorScale).map(
    ([name, value]) => ({
      name,
      value: value.hex.toUpperCase(),
    })
  )

  return (
    <div>
      <SectionTitle title="品牌色" />
      <section className="mb-16">
        <CardGrid>
          {dynamicBrandColors.map((color, i) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{ backgroundColor: `var(--brand-${i + 1})` }}
              onClick={
                color.name === "brand-5"
                  ? () => setBrandDrawerOpen(true)
                  : undefined
              }
            />
          ))}
        </CardGrid>
      </section>

      <ColorConfigDrawer
        open={brandDrawerOpen}
        onClose={() => setBrandDrawerOpen(false)}
        colorType="brand"
        mainColor={brandColor}
        scaleConfig={brandScaleConfig}
        generatedColors={brandScale}
        onColorChange={brandHandlers.handleColorChange}
        onConfigChange={brandHandlers.handleConfigChange}
        onReset={brandHandlers.handleReset}
      />

      <SectionTitle title="安全色" />
      <section className="mb-16">
        <CardGrid>
          {dynamicSuccessColors.map((color, i) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{ backgroundColor: `var(--success-${i + 1})` }}
              onClick={
                color.name === "success-5"
                  ? () => setSuccessDrawerOpen(true)
                  : undefined
              }
            />
          ))}
        </CardGrid>
      </section>

      <ColorConfigDrawer
        open={successDrawerOpen}
        onClose={() => setSuccessDrawerOpen(false)}
        colorType="success"
        mainColor={successColor}
        scaleConfig={successScaleConfig}
        generatedColors={successScale}
        onColorChange={successHandlers.handleColorChange}
        onConfigChange={successHandlers.handleConfigChange}
        onReset={successHandlers.handleReset}
      />

      <SectionTitle title="警告色" />
      <section className="mb-16">
        <CardGrid>
          {dynamicWarningColors.map((color, i) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{ backgroundColor: `var(--warning-${i + 1})` }}
              onClick={
                color.name === "warning-5"
                  ? () => setWarningDrawerOpen(true)
                  : undefined
              }
            />
          ))}
        </CardGrid>
      </section>

      <ColorConfigDrawer
        open={warningDrawerOpen}
        onClose={() => setWarningDrawerOpen(false)}
        colorType="warning"
        mainColor={warningColor}
        scaleConfig={warningScaleConfig}
        generatedColors={warningScale}
        onColorChange={warningHandlers.handleColorChange}
        onConfigChange={warningHandlers.handleConfigChange}
        onReset={warningHandlers.handleReset}
      />

      <SectionTitle title="危险色" />
      <section className="mb-16">
        <CardGrid>
          {dynamicErrorColors.map((color, i) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{ backgroundColor: `var(--error-${i + 1})` }}
              onClick={
                color.name === "error-5"
                  ? () => setErrorDrawerOpen(true)
                  : undefined
              }
            />
          ))}
        </CardGrid>
      </section>

      <ColorConfigDrawer
        open={errorDrawerOpen}
        onClose={() => setErrorDrawerOpen(false)}
        colorType="error"
        mainColor={errorColor}
        scaleConfig={errorScaleConfig}
        generatedColors={errorScale}
        onColorChange={errorHandlers.handleColorChange}
        onConfigChange={errorHandlers.handleConfigChange}
        onReset={errorHandlers.handleReset}
      />

      <SectionTitle title="中性色" />
      <section className="mb-16">
        <CardGrid>
          {neutralColors.map((color, i) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{ backgroundColor: `var(--neutral-${i + 1})` }}
            />
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="黑色透明" />
      <section className="mb-16">
        <CardGrid>
          {blackColors.map((color) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{
                backgroundColor: `var(--black-${color.name.split("-")[1]})`,
              }}
            />
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="白色透明" />
      <section className="mb-16">
        <CardGrid>
          {whiteColors.map((color) => (
            <Card
              key={color.name}
              label={color.name}
              copyText={color.name}
              exampleStyle={{
                backgroundColor: `var(--white-${color.name.split("-")[1]})`,
              }}
            />
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="投影" />
      <section>
        <CardGrid cols={6}>
          <Card label="shadow-1" copyText="shadow-1">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_0_3px_var(--brand-2)]" />
            </div>
          </Card>
          <Card label="shadow-2.1" copyText="shadow-2.1">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]" />
            </div>
          </Card>
          <Card label="shadow-2.2" copyText="shadow-2.2">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_-8px_8px_0_var(--black-5)]" />
            </div>
          </Card>
          <Card label="shadow-2.3" copyText="shadow-2.3">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),8px_0_8px_0_var(--black-5)]" />
            </div>
          </Card>
          <Card label="shadow-2.4" copyText="shadow-2.4">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),-8px_0_8px_0_var(--black-5)]" />
            </div>
          </Card>
          <Card label="shadow-3" copyText="shadow-3">
            <div className="flex h-full items-center justify-center">
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]" />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 排版页面组件
function TypographyPage() {
  return (
    <div>
      <SectionTitle title="常规文字" />
      <section className="mb-16">
        <CardGrid>
          {textSizesRegular.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 400,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="中等文字" />
      <section className="mb-16">
        <CardGrid>
          {textSizesMedium.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 500,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="半粗文字" />
      <section>
        <CardGrid>
          {textSizesSemibold.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 600,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>
    </div>
  )
}

// 图标页面组件
function IconPage() {
  return (
    <div>
      <SectionTitle title="图标 Icon" />
      <section>
        <CardGrid>
          {icons.map((icon) => (
            <Card
              key={icon.name}
              label={icon.name}
              copyText={icon.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <svg
                  className="icon"
                  style={{ color: "var(--neutral-5)" }}
                  aria-hidden="true"
                >
                  <use xlinkHref={`#${icon.name}`} />
                </svg>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>
    </div>
  )
}

// 卡片页面组件
function CardPage() {
  return (
    <div>
      <SectionTitle title="卡片" />
      <section className="mb-16">
        <CardGrid cols={1}>
          <Card name="c-1" />
        </CardGrid>
      </section>

      <section className="mb-16">
        <CardGrid cols={2}>
          <Card name="c-2" />
          <Card name="c-2" />
        </CardGrid>
      </section>

      <section className="mb-16">
        <CardGrid cols={3}>
          <Card name="c-3" />
          <Card name="c-3" />
          <Card name="c-3" />
        </CardGrid>
      </section>

      <section>
        <CardGrid cols={6}>
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
        </CardGrid>
      </section>
    </div>
  )
}

// 按钮页面组件
function ButtonPage() {
  return (
    <div>
      <SectionTitle title="主要按钮 primary" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary">按钮</Button>
              <Button leftIcon="icon-link" variant="primary">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="描边按钮 outline" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline">按钮</Button>
              <Button leftIcon="icon-link" variant="outline">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="幽灵按钮 ghost" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost">按钮</Button>
              <Button leftIcon="icon-link" variant="ghost">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="危险按钮 destructive" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText:
                  "component=Button, variant=destructive, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive">按钮</Button>
              <Button leftIcon="icon-link" variant="destructive">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="destructive">
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconBase"
              />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=destructive, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="destructive" size="sm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="destructive"
                size="sm"
              >
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconSm"
              />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=destructive, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="destructive" size="lg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="destructive"
                size="lg"
              >
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconLg"
              />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="链接按钮 link" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link">按钮</Button>
              <Button leftIcon="icon-link" variant="link">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="表格按钮 cell" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellBase",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellBase, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellBase, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellBase">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellBase">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellBase"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellSm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellSm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellSm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellSm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellSm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellSm"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellLg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellLg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellLg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellLg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellLg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellLg"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁用按钮 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled">按钮</Button>
              <Button leftIcon="icon-link" variant="disabled">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="disabled">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="sm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="disabled"
                size="sm"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="lg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="disabled"
                size="lg"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 输入页面组件
function InputPage() {
  return (
    <div>
      <SectionTitle title="常规输入 basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" className="w-[200px]" />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" size="sm" className="w-[200px]" />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" size="lg" className="w-[200px]" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="无效输入 invalid" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                size="sm"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                size="lg"
                className="w-[200px]"
              />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁止输入 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                size="sm"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                size="lg"
                className="w-[200px]"
              />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 选择页面组件
function SelectPage() {
  return (
    <div>
      <SectionTitle title="常规选择 basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger size="sm" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger size="lg" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="无效选择 invalid" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger variant="invalid" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger
                  variant="invalid"
                  size="sm"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger
                  variant="invalid"
                  size="lg"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁止选择 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger variant="disabled" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger
                  variant="disabled"
                  size="sm"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger
                  variant="disabled"
                  size="lg"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 选项页面组件
function ItemPage() {
  // 导航选项状态
  const [navBase, setNavBase] = React.useState(0)
  const [navSm, setNavSm] = React.useState(0)
  const [navLg, setNavLg] = React.useState(0)

  // 单选状态
  const [radioBase, setRadioBase] = React.useState(1)
  const [radioSm, setRadioSm] = React.useState(1)
  const [radioLg, setRadioLg] = React.useState(1)

  // 多选状态
  const [checkboxBase, setCheckboxBase] = React.useState({
    opt1: false,
    opt2: true,
    opt3: false,
  })
  const [checkboxSm, setCheckboxSm] = React.useState({
    opt1: false,
    opt2: true,
    opt3: false,
  })
  const [checkboxLg, setCheckboxLg] = React.useState({
    opt1: false,
    opt2: true,
    opt3: true,
  })

  // 开关状态
  const [switchBase, setSwitchBase] = React.useState(false)
  const [switchBase2, setSwitchBase2] = React.useState(false)
  const [switchSm, setSwitchSm] = React.useState(false)
  const [switchLg, setSwitchLg] = React.useState(false)

  // 分页器 Demo 组件
  function PaginationBaseDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="base">
        <PaginationPrevious
          size="base"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="base"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="base"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  function PaginationSmDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="sm">
        <PaginationPrevious
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="sm"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  function PaginationLgDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="lg">
        <PaginationPrevious
          size="lg"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="lg"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="lg"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  return (
    <div>
      <SectionTitle title="导航选项 NavigationItem" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                variant={navBase === 0 ? "selected" : "basic"}
                onClick={() => setNavBase(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                variant={navBase === 1 ? "selected" : "basic"}
                onClick={() => setNavBase(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                variant={navBase === 2 ? "selected" : "basic"}
                onClick={() => setNavBase(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                size="sm"
                variant={navSm === 0 ? "selected" : "basic"}
                onClick={() => setNavSm(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                size="sm"
                variant={navSm === 1 ? "selected" : "basic"}
                onClick={() => setNavSm(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                size="sm"
                variant={navSm === 2 ? "selected" : "basic"}
                onClick={() => setNavSm(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                size="lg"
                variant={navLg === 0 ? "selected" : "basic"}
                onClick={() => setNavLg(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                size="lg"
                variant={navLg === 1 ? "selected" : "basic"}
                onClick={() => setNavLg(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                size="lg"
                variant={navLg === 2 ? "selected" : "basic"}
                onClick={() => setNavLg(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="单选项 Radio" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-4">
              <Radio checked={radioBase === 0} onChange={() => setRadioBase(0)}>
                <span className="text-sm text-black-85">选项一</span>
              </Radio>
              <Radio checked={radioBase === 1} onChange={() => setRadioBase(1)}>
                <span className="text-sm text-black-85">选项二</span>
              </Radio>
              <Radio checked={radioBase === 2} onChange={() => setRadioBase(2)}>
                <span className="text-sm text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-3">
              <Radio
                size="sm"
                checked={radioSm === 0}
                onChange={() => setRadioSm(0)}
              >
                <span className="text-xs text-black-85">选项一</span>
              </Radio>
              <Radio
                size="sm"
                checked={radioSm === 1}
                onChange={() => setRadioSm(1)}
              >
                <span className="text-xs text-black-85">选项二</span>
              </Radio>
              <Radio size="sm" checked={false} disabled>
                <span className="text-xs text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-5">
              <Radio
                size="lg"
                checked={radioLg === 0}
                onChange={() => setRadioLg(0)}
              >
                <span className="text-base text-black-85">选项一</span>
              </Radio>
              <Radio
                size="lg"
                checked={radioLg === 1}
                onChange={() => setRadioLg(1)}
              >
                <span className="text-base text-black-85">选项二</span>
              </Radio>
              <Radio size="lg" checked disabled>
                <span className="text-base text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="多选项 Checkbox" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-4">
              <Checkbox
                checked={checkboxBase.opt1}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt1: v })}
              >
                <span className="text-sm text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                checked={checkboxBase.opt2}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt2: v })}
              >
                <span className="text-sm text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                checked={checkboxBase.opt3}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt3: v })}
              >
                <span className="text-sm text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-3">
              <Checkbox
                size="sm"
                checked={checkboxSm.opt1}
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt1: v })}
              >
                <span className="text-xs text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                size="sm"
                checked={checkboxSm.opt2}
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt2: v })}
              >
                <span className="text-xs text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                size="sm"
                checked={checkboxSm.opt3}
                disabled
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt3: v })}
              >
                <span className="text-xs text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-5">
              <Checkbox
                size="lg"
                checked={checkboxLg.opt1}
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt1: v })}
              >
                <span className="text-base text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                size="lg"
                checked={checkboxLg.opt2}
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt2: v })}
              >
                <span className="text-base text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                size="lg"
                checked={checkboxLg.opt3}
                disabled
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt3: v })}
              >
                <span className="text-base text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="开关 Switch" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch checked={switchBase} onChange={setSwitchBase} />
              <Switch checked={switchBase2} onChange={setSwitchBase2} />
            </div>
          </Card>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch size="sm" checked={switchSm} onChange={setSwitchSm} />
              <Switch size="sm" checked={false} disabled />
            </div>
          </Card>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch size="lg" checked={switchLg} onChange={setSwitchLg} />
              <Switch size="lg" checked={true} disabled />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="分页器 Pagination" />
      <section>
        <CardGrid cols={3}>
          <Card label="Pagination" copyText="component=Pagination, size=base">
            <div className="flex h-full items-center justify-center">
              <PaginationBaseDemo />
            </div>
          </Card>
          <Card label="Pagination" copyText="component=Pagination, size=sm">
            <div className="flex h-full items-center justify-center">
              <PaginationSmDemo />
            </div>
          </Card>
          <Card label="Pagination" copyText="component=Pagination, size=lg">
            <div className="flex h-full items-center justify-center">
              <PaginationLgDemo />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// Demo 页面的可编辑菜单默认字段配置
const demoEditFields = [
  { label: "姓名", type: "input", defaultValue: "张三", placeholder: "请输入姓名" },
  { label: "用户名", type: "input", defaultValue: "@zhangsan", placeholder: "请输入用户名" },
  { label: "邮箱", type: "input", defaultValue: "zhangsan@example.com", placeholder: "请输入邮箱" },
] as const

// 菜单页面组件
function MenuPage() {
  const [checkboxItems, setCheckboxItems] = React.useState({
    option1: true,
    option2: false,
    option3: false,
  })
  const [radioValue, setRadioValue] = React.useState("option1")

  // 子菜单可编辑视图状态
  const [submenuEditBase, setSubmenuEditBase] = React.useState(false)
  const [submenuEditSm, setSubmenuEditSm] = React.useState(false)
  const [submenuEditLg, setSubmenuEditLg] = React.useState(false)

  return (
    <div>
      <SectionTitle title="基础菜单 Popover basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverMenuItem closeOnClick>选项一</PopoverMenuItem>
                  <PopoverMenuItem closeOnClick>选项二</PopoverMenuItem>
                  <PopoverMenuItem closeOnClick>选项三</PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm">
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项一
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项二
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项三
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg">
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项一
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项二
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项三
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="带图标菜单 Popover icon" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="多选菜单 Popover checkbox" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverCheckboxItem
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="单选菜单 Popover radio" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem value="option1">选项一</PopoverRadioItem>
                    <PopoverRadioItem value="option2">选项二</PopoverRadioItem>
                    <PopoverRadioItem value="option3">选项三</PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="sm" value="option1">
                      选项一
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option2">
                      选项二
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option3">
                      选项三
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="lg" value="option1">
                      选项一
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option2">
                      选项二
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option3">
                      选项三
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="子菜单 Popover submenu" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => open && setSubmenuEditBase(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditBase ? "hidden" : ""}>
                    <PopoverMenuItem onClick={() => setSubmenuEditBase(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger>更多操作</PopoverSubTrigger>
                      <PopoverSubContent>
                        <PopoverMenuItem closeOnClick>保存</PopoverMenuItem>
                        <PopoverMenuItem closeOnClick>另存为</PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem closeOnClick>导出</PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditBase ? "" : "hidden"}>
                    <PopoverEditContent size="base" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-2 py-1.5">
                      <Button variant="outline" size="base" className="flex-1">取消</Button>
                      <Button variant="primary" size="base" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => !open && setSubmenuEditSm(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditSm ? "hidden" : ""}>
                    <PopoverMenuItem size="sm" onClick={() => setSubmenuEditSm(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger size="sm">更多操作</PopoverSubTrigger>
                      <PopoverSubContent size="sm">
                        <PopoverMenuItem size="sm" closeOnClick>
                          保存
                        </PopoverMenuItem>
                        <PopoverMenuItem size="sm" closeOnClick>
                          另存为
                        </PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem size="sm" closeOnClick>
                          导出
                        </PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditSm ? "" : "hidden"}>
                    <PopoverEditContent size="sm" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-1.5 py-1.5">
                      <Button variant="outline" size="sm" className="flex-1">取消</Button>
                      <Button variant="primary" size="sm" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => !open && setSubmenuEditLg(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditLg ? "hidden" : ""}>
                    <PopoverMenuItem size="lg" onClick={() => setSubmenuEditLg(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger size="lg">更多操作</PopoverSubTrigger>
                      <PopoverSubContent size="lg">
                        <PopoverMenuItem size="lg" closeOnClick>
                          保存
                        </PopoverMenuItem>
                        <PopoverMenuItem size="lg" closeOnClick>
                          另存为
                        </PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem size="lg" closeOnClick>
                          导出
                        </PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditLg ? "" : "hidden"}>
                    <PopoverEditContent size="lg" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-3 py-1.5">
                      <Button variant="outline" size="lg" className="flex-1">取消</Button>
                      <Button variant="primary" size="lg" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="组合菜单 Popover combined" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverLabel>显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel>主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem value="option1">浅色</PopoverRadioItem>
                    <PopoverRadioItem value="option2">深色</PopoverRadioItem>
                    <PopoverRadioItem value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverLabel size="sm">显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel size="sm">主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="sm" value="option1">
                      浅色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option2">
                      深色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverLabel size="lg">显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel size="lg">主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="lg" value="option1">
                      浅色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option2">
                      深色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="可编辑菜单 Popover edit" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=base">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px]">
                  <PopoverEditContent fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-2 py-1.5">
                    <Button variant="outline" size="base" className="flex-1">取消</Button>
                    <Button variant="primary" size="base" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=sm">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[180px]">
                  <PopoverEditContent size="sm" fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-1.5 py-1.5">
                    <Button variant="outline" size="sm" className="flex-1">取消</Button>
                    <Button variant="primary" size="sm" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=lg">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[220px]">
                  <PopoverEditContent size="lg" fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-3 py-1.5">
                    <Button variant="outline" size="lg" className="flex-1">取消</Button>
                    <Button variant="primary" size="lg" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 弹窗页面组件
function DialogPage() {
  return (
    <div>
      <SectionTitle title="基础弹窗 Dialog" />
      <section className="mb-16">
        <CardGrid cols={2}>
          <Card label="Dialog" copyText="component=Dialog, size=base">
            <div className="flex h-full items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">打开弹窗</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>编辑资料</DialogTitle>
                    <DialogDescription>
                      在此修改您的个人资料，完成后点击保存。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <DialogField>
                      <label className="text-sm font-medium text-black-85">
                        姓名
                      </label>
                      <Input defaultValue="张三" />
                    </DialogField>
                    <DialogField>
                      <label className="text-sm font-medium text-black-85">
                        用户名
                      </label>
                      <Input defaultValue="@zhangsan" />
                    </DialogField>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">取消</Button>
                    </DialogClose>
                    <Button>保存</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
          <Card label="Dialog" copyText="component=Dialog, size=lg">
            <div className="flex h-full items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    打开弹窗
                  </Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader size="lg">
                    <DialogTitle size="lg">编辑资料</DialogTitle>
                    <DialogDescription size="lg">
                      在此修改您的个人资料，完成后点击保存。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody size="lg">
                    <DialogField size="lg">
                      <label className="text-base font-medium text-black-85">
                        姓名
                      </label>
                      <Input size="lg" defaultValue="张三" />
                    </DialogField>
                    <DialogField size="lg">
                      <label className="text-base font-medium text-black-85">
                        用户名
                      </label>
                      <Input size="lg" defaultValue="@zhangsan" />
                    </DialogField>
                  </DialogBody>
                  <DialogFooter size="lg">
                    <DialogClose asChild>
                      <Button variant="outline" size="lg">
                        取消
                      </Button>
                    </DialogClose>
                    <Button size="lg">保存</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="抽屉 Drawer" />
      <section>
        <CardGrid cols={2}>
          <Card label="Drawer" copyText="component=Drawer, size=base">
            <div className="flex h-full items-center justify-center">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline">打开抽屉</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>编辑资料</DrawerTitle>
                    <DrawerDescription>
                      在此修改您的个人资料，完成后点击保存。
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <DrawerField>
                      <label className="text-sm font-medium text-black-85">
                        姓名
                      </label>
                      <Input defaultValue="张三" />
                    </DrawerField>
                    <DrawerField>
                      <label className="text-sm font-medium text-black-85">
                        用户名
                      </label>
                      <Input defaultValue="@zhangsan" />
                    </DrawerField>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="flex-1">
                        取消
                      </Button>
                    </DrawerClose>
                    <Button className="flex-1">保存</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </Card>
          <Card label="Drawer" copyText="component=Drawer, size=lg">
            <div className="flex h-full items-center justify-center">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline" size="lg">
                    打开抽屉
                  </Button>
                </DrawerTrigger>
                <DrawerContent size="lg">
                  <DrawerHeader size="lg">
                    <DrawerTitle size="lg">编辑资料</DrawerTitle>
                    <DrawerDescription size="lg">
                      在此修改您的个人资料，完成后点击保存。
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody size="lg">
                    <DrawerField size="lg">
                      <label className="text-base font-medium text-black-85">
                        姓名
                      </label>
                      <Input size="lg" defaultValue="张三" />
                    </DrawerField>
                    <DrawerField size="lg">
                      <label className="text-base font-medium text-black-85">
                        用户名
                      </label>
                      <Input size="lg" defaultValue="@zhangsan" />
                    </DrawerField>
                  </DrawerBody>
                  <DrawerFooter size="lg">
                    <DrawerClose asChild>
                      <Button variant="outline" size="lg" className="flex-1">
                        取消
                      </Button>
                    </DrawerClose>
                    <Button size="lg" className="flex-1">
                      保存
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 布局页面组件
function LayoutPage() {
  // 生成 10x10 表格数据（带 checkbox 列）
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox", width: 40 },
      ...Array.from({ length: 10 }, (_, i) => ({
        id: `col${i + 1}`,
        type: "text",
        title: `列${i + 1}`,
        width: 200,
      })),
    ],
    rows: Array.from({ length: 20 }, (_, rowIndex) => ({
      id: `row${rowIndex + 1}`,
      cells: [
        { id: `cb${rowIndex + 1}`, type: "checkbox", value: false, width: 40 },
        ...Array.from({ length: 10 }, (_, colIndex) => ({
          id: `r${rowIndex + 1}c${colIndex + 1}`,
          type: "text",
          value: "",
          width: 200,
        })),
      ],
    })),
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <SectionTitle title="常规布局" />
      <div className="flex-1 bg-white-100 overflow-auto overscroll-none border-l border-t border-r border-neutral-2">
        <DataTable data={tableData} variant="plain" />
      </div>
    </div>
  )
}

// 表格页面组件
function TablePage() {
  const [cellSelected, setCellSelected] = React.useState(false)

  return (
    <div>
      <SectionTitle title="表头单元格" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card label="Cell" copyText="component=Cell, variant=header">
            <div className="flex h-full items-center justify-center">
              <Cell variant="header">文本单元格</Cell>
            </div>
          </Card>
          <Card label="Cell" copyText="component=Cell, variant=header, child=Button">
            <div className="flex h-full items-center justify-center">
              <Cell variant="header">
                <Button variant="cell" size="cellBase">按钮</Button>
              </Cell>
            </div>
          </Card>
          <Card label="Cell" copyText="component=Cell, variant=header, child=Button, buttonVariant=ghost, size=iconSm">
            <div className="flex h-full items-center justify-center">
              <Cell variant="header">
                <div className="flex items-center justify-between w-full">
                  <span>文本单元格</span>
                  <Button variant="ghost" size="iconSm" leftIcon="icon-chevron-down" />
                </div>
              </Cell>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="表体单元格" />
      <section className="mb-16">
        <CardGrid cols={2}>
          <Card label="Cell" copyText="component=Cell, variant=default">
            <div className="flex h-full items-center justify-center">
              <Cell
                variant={cellSelected ? "selected" : "default"}
                onClick={() => setCellSelected(!cellSelected)}
              >
                文本单元格
              </Cell>
            </div>
          </Card>
          <Card label="Cell" copyText="component=Cell, child=Button">
            <div className="flex h-full items-center justify-center">
              <Cell>
                <Button variant="cell" size="cellBase">按钮</Button>
              </Cell>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="自定义单元格" />
      <section className="mb-16">
        <CardGrid cols={2}>
          <Card label="Cell" copyText="component=Cell, customSlot">
            <div className="flex h-full items-center justify-center">
              <CustomCellDemo />
            </div>
          </Card>
          <Card label="Cell" copyText="component=Cell, customSlot">
            <div className="flex h-full items-center justify-center">
              <CustomCellDemo />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="表格" />
      <section className="mb-16">
        <CardGrid cols={1}>
          <Card label="Table" copyText="component=Table, variant=base">
            <div className="flex h-full items-center justify-center overflow-auto">
              <DataTableDemo />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

// 多选单元格演示组件
function CheckboxCellDemo() {
  const [checked, setChecked] = React.useState(false)
  return <Checkbox checked={checked} onChange={setChecked} />
}

// 自定义单元格演示组件
function CustomCellDemo() {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const [selectedComponent, setSelectedComponent] = React.useState<React.ReactNode | null>(null)

  const handleSelectSelect = () => {
    setSelectedComponent(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="已选择" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">选项一</SelectItem>
          <SelectItem value="option2">选项二</SelectItem>
        </SelectContent>
      </Select>
    )
    setDrawerOpen(false)
  }

  const handleSelectInput = () => {
    setSelectedComponent(<Input placeholder="已选择" />)
    setDrawerOpen(false)
  }

  return (
    <>
      <Cell
        className="group cursor-pointer relative"
        onClick={() => setDrawerOpen(true)}
      >
        <div className="flex items-center gap-1">
          {selectedComponent}
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon="icon-add"
            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
          />
        </div>
      </Cell>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <DrawerContent size="base">
          <DrawerHeader size="base">
            <DrawerTitle size="base">选择组件</DrawerTitle>
            <DrawerDescription size="base">
              点击组件插入到单元格中
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody size="base">
            <DrawerField size="base">
              <div
                className="cursor-pointer hover:bg-neutral-1 rounded-lg p-2 transition-colors"
                onClick={handleSelectSelect}
              >
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select 组件" />
                  </SelectTrigger>
                </Select>
              </div>
            </DrawerField>
            <DrawerField size="base">
              <div
                className="cursor-pointer hover:bg-neutral-1 rounded-lg p-2 transition-colors"
                onClick={handleSelectInput}
              >
                <Input placeholder="Input 组件" />
              </div>
            </DrawerField>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

// 使用新架构的表格示例
function DataTableDemo() {
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox", width: "auto" },
      { id: "col1", type: "text", title: "列1", width: 200 },
      { id: "col2", type: "text", title: "列2", width: 200 },
      { id: "col3", type: "text", title: "列3", width: 200 },
      { id: "col4", type: "text", title: "列4", width: 200 },
      { id: "col5", type: "text", title: "列5", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", type: "checkbox", value: false },
        { id: "r1c1", type: "text", value: "文本内容A" },
        { id: "r1c2", type: "text", value: "文本内容B" },
        { id: "r1c3", type: "text", value: "文本内容C" },
        { id: "r1c4", type: "text", value: "文本内容D" },
        { id: "r1c5", type: "text", value: "文本内容E" },
      ]},
      { id: "row2", cells: [
        { id: "cb2", type: "checkbox", value: false },
        { id: "r2c1", type: "text", value: "第二行A" },
        { id: "r2c2", type: "text", value: "第二行B" },
        { id: "r2c3", type: "text", value: "第二行C" },
        { id: "r2c4", type: "text", value: "第二行D" },
        { id: "r2c5", type: "text", value: "第二行E" },
      ]},
      { id: "row3", cells: [
        { id: "cb3", type: "checkbox", value: false },
        { id: "r3c1", type: "text", value: "第三行A" },
        { id: "r3c2", type: "text", value: "第三行B" },
        { id: "r3c3", type: "text", value: "第三行C" },
        { id: "r3c4", type: "text", value: "第三行D" },
        { id: "r3c5", type: "text", value: "第三行E" },
      ]},
      { id: "row4", cells: [
        { id: "cb4", type: "checkbox", value: false },
        { id: "r4c1", type: "text", value: "第四行A" },
        { id: "r4c2", type: "text", value: "第四行B" },
        { id: "r4c3", type: "text", value: "第四行C" },
        { id: "r4c4", type: "text", value: "第四行D" },
        { id: "r4c5", type: "text", value: "第四行E" },
      ]},
    ],
  }

  return <DataTable data={tableData} />
}

// 可调整列宽的表格组件（保留旧实现供参考）
// ============================================
// 导航和主应用
// ============================================

type PageType =
  | "color"
  | "typography"
  | "icon"
  | "card"
  | "button"
  | "input"
  | "select"
  | "item"
  | "menu"
  | "dialog"
  | "table"
  | "layout"

function App() {
  const [activePage, setActivePage] = React.useState<PageType>(() => {
    const hash = window.location.hash.slice(1) || "/color"
    if (hash === "/typography") return "typography"
    if (hash === "/icon") return "icon"
    if (hash === "/card") return "card"
    if (hash === "/button") return "button"
    if (hash === "/input") return "input"
    if (hash === "/select") return "select"
    if (hash === "/item") return "item"
    if (hash === "/menu") return "menu"
    if (hash === "/dialog") return "dialog"
    if (hash === "/table") return "table"
    if (hash === "/layout") return "layout"
    return "color"
  })

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "/color"
      if (hash === "/typography") setActivePage("typography")
      else if (hash === "/icon") setActivePage("icon")
      else if (hash === "/card") setActivePage("card")
      else if (hash === "/button") setActivePage("button")
      else if (hash === "/input") setActivePage("input")
      else if (hash === "/select") setActivePage("select")
      else if (hash === "/item") setActivePage("item")
      else if (hash === "/menu") setActivePage("menu")
      else if (hash === "/dialog") setActivePage("dialog")
      else if (hash === "/table") setActivePage("table")
      else if (hash === "/layout") setActivePage("layout")
      else setActivePage("color")
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateTo = (page: PageType) => {
    window.location.hash = `/${page}`
  }

  const navItems: { key: PageType; label: string }[] = [
    { key: "color", label: "颜色 color" },
    { key: "typography", label: "排版 typography" },
    { key: "icon", label: "图标 icon" },
    { key: "card", label: "卡片 card" },
    { key: "button", label: "按钮 button" },
    { key: "input", label: "输入 input" },
    { key: "select", label: "选择 select" },
    { key: "item", label: "选项 item" },
    { key: "menu", label: "菜单 menu" },
    { key: "dialog", label: "浮层 floating" },
    { key: "table", label: "表格 table" },
    { key: "layout", label: "布局 layout" },
  ]

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 左侧导航 - 固定 */}
      <nav
        className="w-[200px] shrink-0 overflow-y-auto"
        style={{
          backgroundColor: "var(--white-100)",
          borderRight: "1px solid var(--neutral-2)",
          padding: "12px",
        }}
      >
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavigationItem
              key={item.key}
              variant={activePage === item.key ? "selected" : "basic"}
              className="w-full"
              onClick={() => navigateTo(item.key)}
            >
              {item.label}
            </NavigationItem>
          ))}
        </div>
      </nav>

      {/* 右侧内容区 - 独立滚动 */}
      <main className="flex-1 overflow-y-auto p-8">
        {activePage === "color" && <ColorPage />}
        {activePage === "typography" && <TypographyPage />}
        {activePage === "icon" && <IconPage />}
        {activePage === "card" && <CardPage />}
        {activePage === "button" && <ButtonPage />}
        {activePage === "input" && <InputPage />}
        {activePage === "select" && <SelectPage />}
        {activePage === "item" && <ItemPage />}
        {activePage === "menu" && <MenuPage />}
        {activePage === "dialog" && <DialogPage />}
        {activePage === "table" && <TablePage />}
        {activePage === "layout" && <LayoutPage />}
      </main>
    </div>
  )
}

export default App
