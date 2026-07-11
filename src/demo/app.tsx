import * as React from "react"
import "../styles.css"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Toaster } from "@/components/ui/sonner"

// Demo 页面组件
import { ColorPage } from "./demos/color-demo"
import { TypographyPage } from "./demos/typography-demo"
import { IconPage } from "./demos/icon-demo"
import { CardPage } from "./demos/card-demo"
import { ButtonPage } from "./demos/button2-demo"
import { InputPage } from "./demos/input-demo"
import { SelectPage } from "./demos/select-demo"
import { NavigationPage } from "./demos/navigation-demo"
import { TabsPage } from "./demos/tabs-demo"
import { RadioPage } from "./demos/radio-demo"
import { CheckboxPage } from "./demos/checkbox-demo"
import { SwitchPage } from "./demos/switch-demo"
import { PaginationPage } from "./demos/pagination-demo"
import { PopoverPage } from "./demos/popover-demo"
import { DialogPage } from "./demos/dialog-demo"
import { SonnerPage } from "./demos/sonner-demo"
import { TooltipPage } from "./demos/tooltip-demo"
import { UploadPage } from "./demos/upload-demo"
import { TablePage } from "./demos/table-demo"
import { TooltipProvider } from "@/components/ui/tooltip"

// 页面类型
type PageType = "color" | "typography" | "icon" | "card" | "button" | "input" | "select" | "navigation" | "tabs" | "radio" | "checkbox" | "switch" | "pagination" | "popover" | "dialog" | "sonner" | "tooltip" | "upload" | "table"

function App() {
  const [activePage, setActivePage] = React.useState<PageType>(() => {
    const hash = window.location.hash.slice(1) || "/color"
    const pageMap: Record<string, PageType> = {
      "/color": "color",
      "/typography": "typography",
      "/icon": "icon",
      "/card": "card",
      "/button": "button",
      "/input": "input",
      "/select": "select",
      "/navigation": "navigation",
      "/tabs": "tabs",
      "/radio": "radio",
      "/checkbox": "checkbox",
      "/switch": "switch",
      "/pagination": "pagination",
      "/popover": "popover",
      "/dialog": "dialog",
      "/sonner": "sonner",
      "/tooltip": "tooltip",
      "/upload": "upload",
      "/table": "table",
    }
    return pageMap[hash] || "color"
  })

  // 监听 hash 变化
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || "/color"
      const pageMap: Record<string, PageType> = {
        "/color": "color",
        "/typography": "typography",
        "/icon": "icon",
        "/card": "card",
        "/button": "button",
        "/input": "input",
        "/select": "select",
        "/navigation": "navigation",
        "/tabs": "tabs",
        "/radio": "radio",
        "/checkbox": "checkbox",
        "/switch": "switch",
        "/pagination": "pagination",
        "/popover": "popover",
        "/dialog": "dialog",
        "/sonner": "sonner",
        "/tooltip": "tooltip",
        "/upload": "upload",
        "/table": "table",
        "/layout": "layout",
      }
      setActivePage(pageMap[hash] || "color")
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const navigateTo = (page: PageType) => {
    window.location.hash = `/${page}`
  }

  const navItems: { key: PageType; label: string }[] = [
    { key: "color", label: "颜色 Color" },
    { key: "typography", label: "排版 Typography" },
    { key: "icon", label: "图标 Icon" },
    { key: "card", label: "卡片 Card" },
    { key: "button", label: "按钮 Button" },
    { key: "input", label: "输入 Input" },
    { key: "select", label: "选择 Select" },
    { key: "navigation", label: "导航 NavigationItem" },
    { key: "tabs", label: "切换 Tabs" },
    { key: "radio", label: "单选 Radio" },
    { key: "checkbox", label: "多选 Checkbox" },
    { key: "switch", label: "开关 Switch" },
    { key: "pagination", label: "分页 Pagination" },
    { key: "popover", label: "面板 Popover" },
    { key: "dialog", label: "浮层 Floating" },
    { key: "sonner", label: "通知 Sonner" },
    { key: "tooltip", label: "提示 Tooltip" },
    { key: "upload", label: "上传 Upload" },
    { key: "table", label: "表格 Table" },
  ]

  // 页面组件映射
  const pageComponents: Record<PageType, React.ReactNode> = {
    color: <ColorPage />,
    typography: <TypographyPage />,
    icon: <IconPage />,
    card: <CardPage />,
    button: <ButtonPage />,
    input: <InputPage />,
    select: <SelectPage />,
    navigation: <NavigationPage />,
    tabs: <TabsPage />,
    radio: <RadioPage />,
    checkbox: <CheckboxPage />,
    switch: <SwitchPage />,
    pagination: <PaginationPage />,
    popover: <PopoverPage />,
    dialog: <DialogPage />,
    sonner: <SonnerPage />,
    tooltip: <TooltipPage />,
    upload: <UploadPage />,
    table: <TablePage />,
  }

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
        <TooltipProvider>
          {pageComponents[activePage]}
        </TooltipProvider>
      </main>
      <Toaster />
    </div>
  )
}

export default App