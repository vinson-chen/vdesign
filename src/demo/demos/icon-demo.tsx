import * as React from "react"
import { CardGrid, SectionTitle } from "./shared"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"
import { Input } from "@/components/ui/input"

// 图标分类列表（仅包含实际存在的图标）
const iconCategories = [
  {
    name: "品牌 Logo",
    icons: [
      { name: "icon-vcell-logo" },
      { name: "icon-v-cell" },
    ],
  },
  {
    name: "箭头方向",
    icons: [
      { name: "icon-arrow-left" },
      { name: "icon-arrow-right" },
      { name: "icon-arrow-up" },
      { name: "icon-arrow-down" },
      { name: "icon-arrow-left-up" },
      { name: "icon-arrow-left-down" },
      { name: "icon-arrow-right-up" },
      { name: "icon-arrow-right-down" },
      { name: "icon-arrow-triangle-up" },
      { name: "icon-arrow-triangle-up-filled" },
      { name: "icon-arrow-triangle-down" },
      { name: "icon-arrow-triangle-down-filled" },
      { name: "icon-chevron-left" },
      { name: "icon-chevron-right" },
      { name: "icon-chevron-up" },
      { name: "icon-chevron-down" },
      { name: "icon-a-chevron-leftdouble" },
      { name: "icon-a-chevron-rightdouble" },
      { name: "icon-chevron-up-double" },
      { name: "icon-chevron-down-double" },
      { name: "icon-chevron-left-circle" },
      { name: "icon-chevron-left-circle-filled" },
      { name: "icon-chevron-right-circle" },
      { name: "icon-chevron-right-circle-filled" },
      { name: "icon-chevron-up-circle" },
      { name: "icon-chevron-up-circle-filled" },
      { name: "icon-chevron-down-circle" },
      { name: "icon-chevron-down-circle-filled" },
      { name: "icon-chevron-left-rectangle" },
      { name: "icon-chevron-right-rectangle" },
      { name: "icon-chevron-up-rectangle" },
      { name: "icon-chevron-down-rectangle" },
      { name: "icon-caret-left-small" },
      { name: "icon-caret-right-small" },
      { name: "icon-caret-up-small" },
      { name: "icon-caret-down-small" },
      { name: "icon-swap" },
      { name: "icon-swap-left" },
      { name: "icon-swap-right" },
      { name: "icon-move" },
      { name: "icon-move-1" },
      { name: "icon-jump" },
      { name: "icon-expand-horizontal" },
      { name: "icon-expand-vertical" },
      { name: "icon-shrink-horizontal" },
      { name: "icon-unfold-more" },
      { name: "icon-unfold-less" },
    ],
  },
  {
    name: "操作按钮",
    icons: [
      { name: "icon-add" },
      { name: "icon-add-circle" },
      { name: "icon-add-circle-filled" },
      { name: "icon-add-rectangle" },
      { name: "icon-remove" },
      { name: "icon-minus-circle" },
      { name: "icon-minus-circle-filled" },
      { name: "icon-minus-rectangle" },
      { name: "icon-check" },
      { name: "icon-check-sm" },
      { name: "icon-check-circle" },
      { name: "icon-check-circle-filled" },
      { name: "icon-close" },
      { name: "icon-close-sm" },
      { name: "icon-close-circle" },
      { name: "icon-close-circle-filled" },
      { name: "icon-edit" },
      { name: "icon-edit-filled" },
      { name: "icon-delete" },
      { name: "icon-delete-filled" },
      { name: "icon-copy" },
      { name: "icon-file-copy" },
      { name: "icon-file-copy-filled" },
      { name: "icon-save" },
      { name: "icon-save-filled" },
      { name: "icon-clear" },
      { name: "icon-clear-filled" },
      { name: "icon-clear-formatting" },
      { name: "icon-clear-formatting-filled" },
      { name: "icon-more" },
      { name: "icon-ellipsis" },
      { name: "icon-refresh" },
      { name: "icon-rollback" },
      { name: "icon-rollfront" },
      { name: "icon-scan" },
      { name: "icon-attach" },
      { name: "icon-link" },
      { name: "icon-link-filled" },
      { name: "icon-link-unlink" },
      { name: "icon-download" },
      { name: "icon-cloud-download" },
      { name: "icon-upload" },
      { name: "icon-cloud-upload" },
    ],
  },
  {
    name: "状态反馈",
    icons: [
      { name: "icon-error" },
      { name: "icon-error-circle" },
      { name: "icon-error-circle-filled" },
      { name: "icon-error-triangle" },
      { name: "icon-error-triangle-filled" },
      { name: "icon-stop-circle" },
      { name: "icon-stop-circle-filled" },
      { name: "icon-pause-circle" },
      { name: "icon-pause-circle-filled" },
      { name: "icon-play-circle" },
      { name: "icon-play-circle-filled" },
      { name: "icon-Info" },
      { name: "icon-info-circle" },
      { name: "icon-info-circle-filled" },
      { name: "icon-help" },
      { name: "icon-help-circle" },
      { name: "icon-help-circle-filled" },
      { name: "icon-tips" },
      { name: "icon-tips-filled" },
      { name: "icon-no-result" },
      { name: "icon-no-result-filled" },
      { name: "icon-load" },
    ],
  },
  {
    name: "文件文档",
    icons: [
      { name: "icon-file-1" },
      { name: "icon-file-1-filled" },
      { name: "icon-folder" },
      { name: "icon-folder-filled" },
      { name: "icon-folder-open-1" },
      { name: "icon-folder-open-1-filled" },
      { name: "icon-book-open" },
      { name: "icon-book-open-filled" },
      { name: "icon-book-unknown" },
      { name: "icon-book-unknown-filled" },
      { name: "icon-catalog" },
      { name: "icon-catalog-filled" },
      { name: "icon-form" },
      { name: "icon-form-filled" },
      { name: "icon-bill" },
      { name: "icon-bill-filled" },
      { name: "icon-certificate-1" },
      { name: "icon-certificate-1-filled" },
      { name: "icon-ticket" },
      { name: "icon-ticket-filled" },
      { name: "icon-tag" },
      { name: "icon-tag-filled" },
      { name: "icon-bookmark" },
      { name: "icon-bookmark-filled" },
      { name: "icon-browse" },
      { name: "icon-browse-filled" },
      { name: "icon-browse-off" },
      { name: "icon-browse-off-filled" },
    ],
  },
  {
    name: "搜索放大",
    icons: [
      { name: "icon-search" },
      { name: "icon-search-filled" },
      { name: "icon-zoom-in" },
      { name: "icon-zoom-in-filled" },
      { name: "icon-zoom-out" },
      { name: "icon-zoom-out-filled" },
      { name: "icon-fullscreen" },
      { name: "icon-fullscreen-1" },
      { name: "icon-fullscreen-exit" },
      { name: "icon-fullscreen-exit-1" },
    ],
  },
  {
    name: "排版编辑",
    icons: [
      { name: "icon-textformat-bold" },
      { name: "icon-textformat-italic" },
      { name: "icon-textformat-underline" },
      { name: "icon-textformat-strikethrough" },
      { name: "icon-textformat-color" },
      { name: "icon-align-top" },
      { name: "icon-align-bottom" },
      { name: "icon-align-vertical" },
      { name: "icon-format-vertical-align-left" },
      { name: "icon-format-vertical-align-center" },
      { name: "icon-format-vertical-align-right" },
      { name: "icon-indent-left" },
      { name: "icon-indent-right" },
      { name: "icon-line-height" },
      { name: "icon-bulletpoint" },
      { name: "icon-hashtag" },
      { name: "icon-slash" },
    ],
  },
  {
    name: "媒体图标",
    icons: [
      { name: "icon-image" },
      { name: "icon-image-filled" },
      { name: "icon-image-1" },
      { name: "icon-image-1-filled" },
      { name: "icon-video-camera" },
      { name: "icon-video-camera-filled" },
      { name: "icon-camera" },
      { name: "icon-camera-filled" },
      { name: "icon-microphone-1" },
      { name: "icon-microphone-1-filled" },
      { name: "icon-sound-low" },
      { name: "icon-sound-low-filled" },
      { name: "icon-sound-mute-1" },
      { name: "icon-sound-mute-1-filled" },
      { name: "icon-airplay-wave" },
      { name: "icon-airplay-wave-filled" },
      { name: "icon-sonic" },
    ],
  },
  {
    name: "通信联系",
    icons: [
      { name: "icon-call" },
      { name: "icon-call-1" },
      { name: "icon-call-1-filled" },
      { name: "icon-call-filled" },
      { name: "icon-call-off" },
      { name: "icon-call-off-filled" },
      { name: "icon-mail" },
      { name: "icon-mail-filled" },
      { name: "icon-chat-message" },
      { name: "icon-chat-filled" },
      { name: "icon-chat-double" },
      { name: "icon-chat-double-filled" },
      { name: "icon-send" },
      { name: "icon-send-filled" },
      { name: "icon-notification" },
      { name: "icon-notification-filled" },
      { name: "icon-address-book" },
      { name: "icon-address-book-filled" },
    ],
  },
  {
    name: "用户相关",
    icons: [
      { name: "icon-user" },
      { name: "icon-user-filled" },
      { name: "icon-user-add" },
      { name: "icon-user-add-filled" },
      { name: "icon-user-checked" },
      { name: "icon-user-checked-filled" },
      { name: "icon-user-list" },
      { name: "icon-user-list-filled" },
      { name: "icon-user-setting" },
      { name: "icon-user-setting-filled" },
      { name: "icon-user-transmit" },
      { name: "icon-user-transmit-filled" },
      { name: "icon-login" },
      { name: "icon-logout" },
    ],
  },
  {
    name: "设备硬件",
    icons: [
      { name: "icon-desktop" },
      { name: "icon-desktop-filled" },
      { name: "icon-mobile" },
      { name: "icon-mobile-filled" },
      { name: "icon-device" },
      { name: "icon-device-filled" },
      { name: "icon-keyboard" },
      { name: "icon-keyboard-filled" },
      { name: "icon-mouse" },
      { name: "icon-mouse-filled" },
      { name: "icon-cpu" },
      { name: "icon-cpu-filled" },
      { name: "icon-usb" },
      { name: "icon-usb-filled" },
      { name: "icon-bluetooth" },
      { name: "icon-base-station" },
      { name: "icon-sensors" },
      { name: "icon-sensors-1" },
      { name: "icon-object-storage" },
      { name: "icon-server" },
      { name: "icon-hotspot-wave" },
      { name: "icon-hotspot-wave-filled" },
      { name: "icon-remote-wave" },
      { name: "icon-remote-wave-filled" },
    ],
  },
  {
    name: "时间日期",
    icons: [
      { name: "icon-calendar-1" },
      { name: "icon-calendar-1-filled" },
      { name: "icon-calendar-2" },
      { name: "icon-calendar-2-filled" },
      { name: "icon-time" },
      { name: "icon-time-filled" },
      { name: "icon-history" },
    ],
  },
  {
    name: "数据图表",
    icons: [
      { name: "icon-chart" },
      { name: "icon-chart-filled" },
      { name: "icon-chart-pie" },
      { name: "icon-chart-pie-filled" },
      { name: "icon-chart-combo" },
      { name: "icon-chart-combo-filled" },
      { name: "icon-chart-analytics" },
      { name: "icon-chart-line-data-1" },
      { name: "icon-data-filled" },
      { name: "icon-activity" },
      { name: "icon-activity-filled" },
      { name: "icon-task" },
      { name: "icon-task-filled" },
    ],
  },
  {
    name: "导航菜单",
    icons: [
      { name: "icon-home" },
      { name: "icon-home-filled" },
      { name: "icon-menu-application" },
      { name: "icon-app" },
      { name: "icon-app-filled" },
      { name: "icon-control-platform" },
      { name: "icon-control-platform-filled" },
      { name: "icon-system-application" },
      { name: "icon-system-application-filled" },
      { name: "icon-view-list" },
      { name: "icon-grid-view" },
      { name: "icon-grid-view-filled" },
      { name: "icon-grid-all" },
      { name: "icon-grid-row" },
      { name: "icon-grid-cell" },
      { name: "icon-grid-column" },
      { name: "icon-grid-add" },
      { name: "icon-grid-add-filled" },
    ],
  },
  {
    name: "安全锁相关",
    icons: [
      { name: "icon-lock-on" },
      { name: "icon-lock-on-filled" },
      { name: "icon-lock-off" },
      { name: "icon-lock-off-filled" },
      { name: "icon-secured" },
      { name: "icon-secured-filled" },
      { name: "icon-shield-error" },
      { name: "icon-shield-error-filled" },
      { name: "icon-verify" },
      { name: "icon-verify-filled" },
    ],
  },
  {
    name: "购物支付",
    icons: [
      { name: "icon-cart" },
      { name: "icon-cart-filled" },
      { name: "icon-shop" },
      { name: "icon-shop-filled" },
      { name: "icon-store" },
      { name: "icon-store-filled" },
      { name: "icon-wallet" },
      { name: "icon-wallet-filled" },
      { name: "icon-creditcard" },
      { name: "icon-creditcard-filled" },
      { name: "icon-barcode-1" },
      { name: "icon-qrcode" },
      { name: "icon-gift" },
      { name: "icon-gift-filled" },
    ],
  },
  {
    name: "社交分享",
    icons: [
      { name: "icon-share" },
      { name: "icon-share-filled" },
      { name: "icon-heart" },
      { name: "icon-heart-filled" },
      { name: "icon-thumb-up" },
      { name: "icon-thumb-up-filled" },
      { name: "icon-thumb-down" },
      { name: "icon-thumb-down-filled" },
    ],
  },
  {
    name: "位置地图",
    icons: [
      { name: "icon-location" },
      { name: "icon-location-filled" },
      { name: "icon-map" },
      { name: "icon-map-filled" },
      { name: "icon-map-ruler" },
      { name: "icon-map-ruler-filled" },
      { name: "icon-map-information-2" },
      { name: "icon-map-information-2-filled" },
      { name: "icon-compass" },
      { name: "icon-compass-filled" },
      { name: "icon-pin" },
      { name: "icon-pin-filled" },
    ],
  },
  {
    name: "网络连接",
    icons: [
      { name: "icon-wifi" },
      { name: "icon-wifi-1-filled" },
      { name: "icon-wifi-no" },
      { name: "icon-wifi-no-filled" },
      { name: "icon-wifi-off" },
      { name: "icon-wifi-off-1-filled" },
      { name: "icon-internet" },
    ],
  },
  {
    name: "设置工具",
    icons: [
      { name: "icon-setting" },
      { name: "icon-setting-filled" },
      { name: "icon-adjustment" },
      { name: "icon-adjustment-filled" },
      { name: "icon-a-order-adjustmentcolumn" },
      { name: "icon-filter" },
      { name: "icon-filter-filled" },
      { name: "icon-filter-2" },
      { name: "icon-filter-2-filled" },
      { name: "icon-order-ascending" },
      { name: "icon-order-descending" },
      { name: "icon-translate" },
      { name: "icon-print" },
      { name: "icon-print-filled" },
    ],
  },
  {
    name: "开关选择",
    icons: [
      { name: "icon-switch" },
      { name: "icon-switch-off" },
    ],
  },
  {
    name: "其他图标",
    icons: [
      { name: "icon-alarm" },
      { name: "icon-alarm-filled" },
      { name: "icon-lightbulb" },
      { name: "icon-lightbulb-filled" },
      { name: "icon-rocket" },
      { name: "icon-rocket-filled" },
      { name: "icon-fork" },
      { name: "icon-fork-filled" },
      { name: "icon-flag" },
      { name: "icon-flag-filled" },
      { name: "icon-palette" },
      { name: "icon-palette-filled" },
      { name: "icon-tree-round-dot" },
      { name: "icon-tree-round-dot-filled" },
      { name: "icon-tree-round-dot-vertical" },
      { name: "icon-tree-round-dot-vertical-filled" },
      { name: "icon-course" },
      { name: "icon-course-filled" },
      { name: "icon-service" },
      { name: "icon-service-filled" },
      { name: "icon-mode-light" },
      { name: "icon-mode-light-filled" },
      { name: "icon-mode-dark" },
      { name: "icon-mode-dark-filled" },
      { name: "icon-view-in-ar" },
    ],
  },
]

// 图标页面组件
export function IconPage() {
  const [searchQuery, setSearchQuery] = React.useState("")

  // 模糊搜索过滤图标
  const filteredCategories = React.useMemo(() => {
    if (!searchQuery.trim()) return iconCategories
    const query = searchQuery.toLowerCase()
    return iconCategories
      .map((category) => ({
        ...category,
        icons: category.icons.filter((icon) =>
          icon.name.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.icons.length > 0)
  }, [searchQuery])

  return (
    <div>
      <SectionTitle
        title="图标 Icon"
        rightElement={
          <div className="relative">
            <svg
              className="icon absolute left-2 top-1/2 -translate-y-1/2"
              style={{ color: "var(--neutral-4)" }}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-search" />
            </svg>
            <Input
              variant="basic"
              size="base"
              placeholder="搜索图标..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-8"
            />
          </div>
        }
      />
      {filteredCategories.map((category) => (
        <section key={category.name} className="mb-16">
          <h3
            style={{
              color: "var(--neutral-4)",
              fontSize: "14px",
              lineHeight: "22px",
              fontWeight: 500,
              marginBottom: "16px",
            }}
          >
            {category.name}
          </h3>
          <CardGrid>
            {category.icons.map((icon) => (
              <Card key={icon.name}>
                <CardContent>
                  <svg
                      className="icon"
                      style={{ color: "var(--neutral-5)" }}
                      aria-hidden="true"
                    >
                      <use xlinkHref={`#${icon.name}`} />
                    </svg>
                </CardContent>
                <CardFooter className="justify-between">
                  <span className="text-sm text-black-85">{icon.name}</span>
                  <CopyButton text={icon.name} />
                </CardFooter>
              </Card>
            ))}
          </CardGrid>
        </section>
      ))}
    </div>
  )
}