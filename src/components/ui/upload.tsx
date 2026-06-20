import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

const uploadVariants = cva(
  "relative flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors outline-none",
  {
    variants: {
      size: {
        base: "rounded-lg border-2 border-dashed border-neutral-3 px-6 py-5",
        lg: "rounded-xl border-2 border-dashed border-neutral-3 px-8 py-6",
      },
    },
    defaultVariants: { size: "base" },
  }
)

// ============================================
// 工具函数
// ============================================

function isImageFile(file: File): boolean {
  return file.type.startsWith("image/")
}

function getFilePreviewUrl(file: File): string | null {
  if (isImageFile(file)) {
    return URL.createObjectURL(file)
  }
  return null
}

// ============================================
// UploadThumbnail - 文件缩略图
// ============================================

interface UploadThumbnailProps {
  file: File
  size?: "base" | "lg"
  onChange?: (file: File) => void
  onRemove?: () => void
  slotId?: string
}

function UploadThumbnail({ file, size = "base", onChange, onRemove, slotId }: UploadThumbnailProps) {
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = React.useState(false)

  React.useEffect(() => {
    const url = getFilePreviewUrl(file)
    setPreviewUrl(url)
    return () => {
      if (url) URL.revokeObjectURL(url)
    }
  }, [file])

  const handleClick = () => {
    if (isImageFile(file) && previewUrl) {
      setPreviewOpen(true)
    }
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    inputRef.current?.click()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0]
    if (newFile) {
      onChange?.(newFile)
    }
    e.target.value = ""
  }

  // 尺寸配置
  const thumbSize = size === "lg" ? "size-10" : "size-8"
  const iconSize = size === "lg" ? "size-5" : "size-4"
  const tooltipHeight = size === "lg" ? "h-12" : "h-10"
  const buttonSize = size === "lg" ? "iconLg" : "iconBase"

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* 缩略图容器 */}
          <div
            data-slot="upload-thumbnail"
            data-slot-id={slotId ?? id}
            className={cn(
              "group relative shrink-0 rounded-lg overflow-hidden cursor-pointer bg-neutral-1 border border-neutral-2",
              thumbSize
            )}
            onClick={handleClick}
          >
            {/* 图片/文件图标 */}
            {previewUrl ? (
              <img src={previewUrl} alt={file.name} className="size-full object-cover" />
            ) : (
              <div className="size-full flex items-center justify-center">
                <svg className={cn(iconSize, "text-black-55")} fill="currentColor">
                  <use xlinkHref="#icon-file-1" />
                </svg>
              </div>
            )}

            {/* hover 蒙层 + 预览图标（仅图片文件） */}
            {isImageFile(file) && (
              <div className="absolute inset-0 bg-black-55 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className={cn(iconSize, "text-white-100")} fill="currentColor">
                  <use xlinkHref="#icon-browse" />
                </svg>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top" sideOffset={4} className={cn(tooltipHeight, "flex items-center px-0.5")}>
          <Button
            variant="ghost"
            size={buttonSize}
            leftIcon="icon-edit"
            onClick={handleEditClick}
            className="text-white-60 hover:text-white-100"
          />
          <Button
            variant="ghost"
            size={buttonSize}
            leftIcon="icon-delete"
            onClick={handleDeleteClick}
            className="text-white-60 hover:text-white-100"
          />
        </TooltipContent>
      </Tooltip>

      {/* 隐藏的更换 input */}
      <input ref={inputRef} type="file" className="hidden" onChange={handleChange} />

      {/* 图片预览 Dialog */}
      {previewUrl && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent size="lg" className="max-w-[600px] p-2">
            <img src={previewUrl} alt={file.name} className="w-full rounded-lg" />
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

// ============================================
// Upload - 组合组件
// ============================================

interface UploadProps extends VariantProps<typeof uploadVariants> {
  files?: File[]
  accept?: string
  multiple?: boolean
  disabled?: boolean
  onFiles?: (files: File[]) => void
  onChange?: (file: File, index: number) => void
  onRemove?: (index: number) => void
  className?: string
  slotId?: string
}

function Upload({
  files,
  size,
  accept,
  multiple,
  disabled,
  onFiles,
  onChange,
  onRemove,
  className,
  slotId,
}: UploadProps) {
  const id = React.useId()
  const inputRef = React.useRef<HTMLInputElement>(null)

  // 尺寸配置
  const buttonSize = size === "lg" ? "iconLg" : "iconBase"

  const handleButtonClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    if (newFiles.length > 0 && onFiles) {
      onFiles(newFiles)
    }
    e.target.value = ""
  }

  const handleFileChange = (newFile: File, index: number) => {
    onChange?.(newFile, index)
  }

  const handleFileRemove = (index: number) => {
    onRemove?.(index)
  }

  return (
    <div data-slot="upload" data-slot-id={slotId ?? id} className={cn("flex items-center gap-2", className)}>
      {/* 上传按钮 */}
      <Button
        variant="outline"
        size={buttonSize}
        leftIcon="icon-upload"
        disabled={disabled}
        onClick={handleButtonClick}
      />

      {/* 隐藏的 file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />

      {/* 文件缩略图列表 */}
      {files && files.length > 0 && (
        <div className="flex items-center gap-2">
          {files.map((file, index) => (
            <UploadThumbnail
              key={`${file.name}-${file.size}-${index}`}
              file={file}
              size={size ?? undefined}
              onChange={(newFile) => handleFileChange(newFile, index)}
              onRemove={() => handleFileRemove(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { Upload, UploadThumbnail, uploadVariants }