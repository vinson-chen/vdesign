import * as React from "react"
import "../styles.css"
import { NavigationItem } from "@/components/ui/navigation-item"

// Demo 页面组件
import { ColorPage } from "./demos/color-demo"
import { TypographyPage } from "./demos/typography-demo"
import { IconPage } from "./demos/icon-demo"
import { CardPage } from "./demos/card-demo"
import { ButtonPage } from "./demos/button-demo"
import { InputPage } from "./demos/input-demo"
import { SelectPage } from "./demos/select-demo"
import { ItemPage } from "./demos/item-demo"
import { MenuPage } from "./demos/menu-demo"
import { DialogPage } from "./demos/dialog-demo"
import { TablePage, LayoutPage } from "./demos/table-demo"

// 页面类型
type PageType = "color" | "typography" | "icon" | "card" | "button" | "input" | "select" | "item" | "menu" | "dialog" | "table" | "layout"

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
      "/item": "item",
      "/menu": "menu",
      "/dialog": "dialog",
      "/table": "table",
      "/layout": "layout",
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
        "/item": "item",
        "/menu": "menu",
        "/dialog": "dialog",
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

  // 页面组件映射
  const pageComponents: Record<PageType, React.ReactNode> = {
    color: <ColorPage />,
    typography: <TypographyPage />,
    icon: <IconPage />,
    card: <CardPage />,
    button: <ButtonPage />,
    input: <InputPage />,
    select: <SelectPage />,
    item: <ItemPage />,
    menu: <MenuPage />,
    dialog: <DialogPage />,
    table: <TablePage />,
    layout: <LayoutPage />,
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
        {pageComponents[activePage]}
      </main>
    </div>
  )
}

export default App