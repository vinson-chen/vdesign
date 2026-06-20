import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { SectionTitle, getDisplaySize } from "./shared"
import type { SlotConfig } from "./shared"

// ============================================
// 本体论命名工具
// ============================================

function ontoName(slot: string, size: string): string {
  return ["dialog", slot, size].join("-")
}
// ============================================
// 自定义单元格渲染器
// ============================================

// 弹窗渲染器
function DialogCellRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex items-center w-full h-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size={size} noShift>
            打开弹窗
          </Button>
        </DialogTrigger>
        <DialogContent size={size}>
          <DialogHeader>
            <DialogTitle>编辑资料</DialogTitle>
            <DialogDescription>
              在此修改您的个人资料，完成后点击保存。
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <DialogField>
              <label className="font-medium text-black-85">姓名</label>
              <Input defaultValue="张三" size={size} />
            </DialogField>
            <DialogField>
              <label className="font-medium text-black-85">用户名</label>
              <Input defaultValue="@zhangsan" size={size} />
            </DialogField>
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" size={size}>取消</Button>
            </DialogClose>
            <Button size={size}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon={copied ? "icon-check" : "icon-copy"}
            onClick={handleCopy}
            className={cn("ml-auto", copied ? "text-success-5" : "text-black-55")}
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{copyText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// 抽屉渲染器
function DrawerCellRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="flex items-center w-full h-full">
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button variant="outline" size={size} noShift>
            打开抽屉
          </Button>
        </DrawerTrigger>
        <DrawerContent size={size}>
          <DrawerHeader>
            <DrawerTitle>编辑资料</DrawerTitle>
            <DrawerDescription>
              在此修改您的个人资料，完成后点击保存。
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <DrawerField>
              <label className="font-medium text-black-85">姓名</label>
              <Input defaultValue="张三" size={size} />
            </DrawerField>
            <DrawerField>
              <label className="font-medium text-black-85">用户名</label>
              <Input defaultValue="@zhangsan" size={size} />
            </DrawerField>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" size={size} className="flex-1">取消</Button>
            </DrawerClose>
            <Button size={size} className="flex-1">保存</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon={copied ? "icon-check" : "icon-copy"}
            onClick={handleCopy}
            className={cn("ml-auto", copied ? "text-success-5" : "text-black-55")}
          />
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{copyText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// ============================================
// 表格数据生成
// ============================================


const slotConfigs: SlotConfig[] = [
  { name: "dialog", renderer: "dialogCell", props: {} },
  { name: "drawer", renderer: "drawerCell", props: {} },
]

const sizeConfigs = ["base", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 200 },
    { id: "dialog", type: "reference" as const, title: "弹窗 Dialog", width: 200 },
    { id: "drawer", type: "reference" as const, title: "抽屉 Drawer", width: 200 },
  ]

  const rows = sizeConfigs.map((size) => {
    const displaySize = getDisplaySize(size)
    return {
      id: `row-${size}`,
      cells: [
        { id: `cb-${size}`, value: false },
        { id: `c-size-${size}`, value: displaySize },
        ...slotConfigs.map((slot) => ({
          id: `c-${slot.name}-${size}`,
          value: ontoName(slot.name, size),
          type: slot.renderer as "dialogCell" | "drawerCell",
          options: {
            size,
            ...slot.props,
          },
        })),
      ],
    }
  })

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function DialogPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      dialogCell: DialogCellRenderer,
      drawerCell: DrawerCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="浮层 Floating" />
              <DataTable
          data={tableData}
          variant="base" contained
          cellRenderers={cellRenderers}
          readOnly
        />
          </div>
  )
}
