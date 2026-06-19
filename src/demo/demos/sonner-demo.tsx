import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { createToastWithSize } from "@/components/ui/sonner"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle, DemoTableWrapper } from "./shared"

// ============================================
// 自定义单元格渲染器
// ============================================

type ToastType = "default" | "success" | "info" | "warning" | "error" | "promise"

function ToastCellRenderer({ value, options }: CellRendererProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const copyText = String(value)
  const size = (options?.size as "base" | "lg") || "base"
  const toastType = (options?.toastType as ToastType) || "default"

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  const triggerToast = (e: React.MouseEvent) => {
    e.stopPropagation()
    const api = createToastWithSize(size)

    switch (toastType) {
      case "default":
        api.default("这是一条默认通知")
        break
      case "success":
        api.success("操作成功完成")
        break
      case "info":
        api.info("请注意查看详细信息")
        break
      case "warning":
        api.warning("请注意潜在风险")
        break
      case "error":
        api.error("操作失败，请重试")
        break
      case "promise":
        // 模拟文件上传
        const uploadPromise = new Promise<{ filename: string; success: boolean }>((resolve, reject) => {
          setTimeout(() => {
            // 80% 成功率
            if (Math.random() > 0.2) {
              resolve({ filename: "document.pdf", success: true })
            } else {
              reject(new Error("网络错误"))
            }
          }, 2000)
        })
        api.promise(uploadPromise, {
          loading: "正在上传文件...",
          success: (data) => `${data.filename} 上传成功`,
          error: "上传失败，请检查网络连接",
        })
        break
    }
  }

  return (
    <div className="flex items-center w-full h-full">
      <Button variant="outline" size={size} noShift onClick={triggerToast}>
        触发通知
      </Button>
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
        <TooltipContent side="top" size="base">
          <p>{copyText}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

// ============================================
// 表格数据生成
// ============================================

const toastTypes: { id: ToastType; label: string }[] = [
  { id: "default", label: "默认 Default" },
  { id: "success", label: "成功 Success" },
  { id: "info", label: "信息 Info" },
  { id: "warning", label: "警告 Warning" },
  { id: "error", label: "错误 Error" },
  { id: "promise", label: "异步 Promise" },
]

const sizeConfigs = ["base", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 100 },
    ...toastTypes.map((t) => ({
      id: t.id,
      type: "reference" as const,
      title: t.label,
      width: 200,
    })),
  ]

  const rows = sizeConfigs.map((size) => ({
    id: `row-${size}`,
    cells: [
      { id: `cb-${size}`, value: false },
      { id: `c-size-${size}`, value: size },
      ...toastTypes.map((t) => ({
        id: `c-${t.id}-${size}`,
        value: `sonner-${t.id}-${size}`,
        type: "toastCell" as const,
        options: { size, toastType: t.id },
      })),
    ],
  }))

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function SonnerPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      toastCell: ToastCellRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="通知 Sonner" />
      <DemoTableWrapper>
        <DataTable
          data={tableData}
          variant="plain"
          cellRenderers={cellRenderers}
          readOnly
        />
      </DemoTableWrapper>
    </div>
  )
}