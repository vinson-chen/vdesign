import * as React from "react"
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerField,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { Cell } from "@/components/ui/cell"
import { DataTable } from "@/components/ui/data-table"
import { Card, CardGrid, SectionTitle } from "./shared"

// 维思 Vcell 布局页面组件
function LayoutPage() {
  // 生成表格数据：1行2列数据列（checkbox + 列1 + 列2）
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "col1", type: "text" as const, title: "列1", width: 200 },
      { id: "col2", type: "text" as const, title: "列2", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c1", value: "" },
        { id: "r1c2", value: "" },
      ]},
    ],
  }

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="维思 Vcell" />
      <div className="shrink min-h-0 bg-white-100 overflow-auto overscroll-none border border-neutral-2">
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
                <Button variant="ghost" size="base">按钮</Button>
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
                <Button variant="ghost" size="base">按钮</Button>
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

      <SectionTitle title="多列类型表格" />
      <section>
        <CardGrid cols={1}>
          <Card label="Table" copyText="component=Table, columnTypes=text/select/input/button/icon">
            <div className="flex h-full items-center justify-center overflow-auto">
              <ColumnTypeDemo />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
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

// 多列类型演示组件
function ColumnTypeDemo() {
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "name", type: "text" as const, title: "名称", width: 160 },
      { id: "status", type: "select" as const, title: "状态", width: 120,
        options: {
          items: [
            { value: "active", label: "进行中" },
            { value: "done", label: "已完成" },
            { value: "paused", label: "已暂停" },
          ]
        }
      },
      { id: "note", type: "input" as const, title: "备注", width: 180 },
      { id: "action", type: "button" as const, title: "操作", width: 80,
        options: { variant: "outline", label: "编辑" }
      },
      { id: "star", type: "icon" as const, title: "标记", width: 50,
        options: { iconName: "icon-star" }
      },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c1", value: "任务 A" },
        { id: "r1c2", value: "active" },
        { id: "r1c3", value: "" },
        { id: "r1c4", value: "编辑" },
        { id: "r1c5", value: "icon-star" },
      ]},
      { id: "row2", cells: [
        { id: "cb2", value: false },
        { id: "r2c1", value: "任务 B" },
        { id: "r2c2", value: "done" },
        { id: "r2c3", value: "已完成备注" },
        { id: "r2c4", value: "编辑" },
        { id: "r2c5", value: "icon-star" },
      ]},
      { id: "row3", cells: [
        { id: "cb3", value: false },
        { id: "r3c1", value: "任务 C" },
        { id: "r3c2", value: "paused" },
        { id: "r3c3", value: "" },
        { id: "r3c4", value: "编辑" },
        { id: "r3c5", value: "icon-star-outline" },
      ]},
    ],
  }

  return <DataTable data={tableData} />
}

// 使用新架构的表格示例
function DataTableDemo() {
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "col1", type: "text" as const, title: "列1", width: 200 },
      { id: "col2", type: "text" as const, title: "列2", width: 200 },
      { id: "col3", type: "text" as const, title: "列3", width: 200 },
      { id: "col4", type: "text" as const, title: "列4", width: 200 },
      { id: "col5", type: "text" as const, title: "列5", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c1", value: "文本内容A" },
        { id: "r1c2", value: "文本内容B" },
        { id: "r1c3", value: "文本内容C" },
        { id: "r1c4", value: "文本内容D" },
        { id: "r1c5", value: "文本内容E" },
      ]},
      { id: "row2", cells: [
        { id: "cb2", value: false },
        { id: "r2c1", value: "第二行A" },
        { id: "r2c2", value: "第二行B" },
        { id: "r2c3", value: "第二行C" },
        { id: "r2c4", value: "第二行D" },
        { id: "r2c5", value: "第二行E" },
      ]},
      { id: "row3", cells: [
        { id: "cb3", value: false },
        { id: "r3c1", value: "第三行A" },
        { id: "r3c2", value: "第三行B" },
        { id: "r3c3", value: "第三行C" },
        { id: "r3c4", value: "第三行D" },
        { id: "r3c5", value: "第三行E" },
      ]},
      { id: "row4", cells: [
        { id: "cb4", value: false },
        { id: "r4c1", value: "第四行A" },
        { id: "r4c2", value: "第四行B" },
        { id: "r4c3", value: "第四行C" },
        { id: "r4c4", value: "第四行D" },
        { id: "r4c5", value: "第四行E" },
      ]},
    ],
  }

  return <DataTable data={tableData} />
}

export { LayoutPage, TablePage, DataTableDemo, ColumnTypeDemo }