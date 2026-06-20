import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Upload } from "@/components/ui/upload"
import { DataTable } from "@/components/ui/data-table"
import type { TableData, CellRendererProps } from "@/types/table"
import { SectionTitle } from "./shared"

// ============================================
// Upload 渲染器
// ============================================

function UploadRenderer({ value, options }: CellRendererProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const size = (options?.size as "base" | "lg") || "base"
  const copyText = String(value)

  const handleFiles = (newFiles: File[]) => {
    setFiles((prev) => [...prev, ...newFiles])
  }

  const handleChange = (newFile: File, index: number) => {
    setFiles((prev) => {
      const next = [...prev]
      next[index] = newFile
      return next
    })
  }

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center w-full h-full p-2">
      <Upload
        size={size}
        files={files}
        multiple
        onFiles={handleFiles}
        onChange={handleChange}
        onRemove={handleRemove}
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="iconSm"
            leftIcon={copied ? "icon-check" : "icon-copy"}
            onClick={handleCopy}
            className={cn("ml-2 shrink-0", copied ? "text-success-5" : "text-black-55")}
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

const sizeConfigs = ["base", "lg"] as const

function generateTableData(): TableData {
  const columns = [
    { id: "checkbox", type: "checkbox" as const, width: 40 },
    { id: "size", type: "text" as const, title: "尺寸", width: 100 },
    { id: "upload", type: "reference" as const, title: "文件上传", width: 400 },
  ]

  const rows = sizeConfigs.map((size) => ({
    id: `row-${size}`,
    cells: [
      { id: `cb-${size}`, value: false },
      { id: `c-size-${size}`, value: size },
      {
        id: `c-upload-${size}`,
        value: `upload-${size}`,
        type: "upload" as const,
        options: { size },
      },
    ],
  }))

  return { columns, rows, groupColumnId: "size" }
}

// ============================================
// 页面组件
// ============================================

export function UploadPage() {
  const tableData = React.useMemo(() => generateTableData(), [])

  const cellRenderers = React.useMemo(
    () => ({
      upload: UploadRenderer,
    }),
    []
  )

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="上传 Upload" />
      <section>
                  <DataTable
            data={tableData}
            variant="base" contained
            cellRenderers={cellRenderers}
            readOnly
          />
              </section>
    </div>
  )
}