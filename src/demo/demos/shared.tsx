import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerField,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import type { ColorScaleConfig } from "@/lib/color-scale"

// ============================================
// 公共 Demo 组件
// ============================================

// 卡片组件
interface CardProps {
  children?: React.ReactNode // 示例内容
  exampleStyle?: React.CSSProperties // 示例区样式
  onClick?: () => void
  label?: string // 左侧显示的标签（单按钮场景）
  copyText?: string // 点击复制的内容（单按钮场景）
  items?: { label: string; copyText: string }[] // 多按钮场景
}

export function Card({
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
        {/* 左侧：单按钮或多按钮 */}
        {items && items.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {items.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => handleCopy(item.copyText, e)}
                  >
                    {item.label}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" size="base">
                  <p>{item.copyText}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleCopy(copyText || label || "", e)}
              >
                {label}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="top" size="base">
              <p>{copyText || label}</p>
            </TooltipContent>
          </Tooltip>
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
      </div>
    </div>
  )
}

// 卡片网格容器组件
interface CardGridProps {
  cols?: 1 | 2 | 3 | 6
  children: React.ReactNode
}

export function CardGrid({ cols = 6, children }: CardGridProps) {
  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6",
  }
  return <div className={`grid ${gridClass[cols]} gap-4`}>{children}</div>
}

// 纯展示表格容器组件：自适应内容宽度，不超过父容器
export function DemoTableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink min-h-0 bg-white-100 overflow-auto overscroll-none border border-neutral-2 w-fit max-w-full">
      {children}
    </div>
  )
}

// 区块标题组件
export function SectionTitle({
  title,
  rightElement,
}: {
  title: string
  rightElement?: React.ReactNode
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ marginBottom: "32px" }}
    >
      <h2
        style={{
          color: "var(--neutral-5)",
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: 600,
        }}
      >
        {title}
      </h2>
      {rightElement}
    </div>
  )
}

// 色阶配置抽屉组件（用于 ColorPage）
const DEFAULT_SCALE_CONFIG: ColorScaleConfig[] = [
  { name: "1", mixColor: "#FFFFFF", opacity: 0, saturationMult: 0.3 },
  { name: "2", mixColor: "#FFFFFF", opacity: 10, saturationMult: 0.5 },
  { name: "3", mixColor: "#FFFFFF", opacity: 25, saturationMult: 0.7 },
  { name: "4", mixColor: "#FFFFFF", opacity: 45, saturationMult: 0.85 },
  { name: "5", mixColor: "", opacity: 100, saturationMult: 1 },
  { name: "6", mixColor: "#000000", opacity: 100, saturationMult: 1.2 },
]

export function ColorConfigDrawer({
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

  // 输入框临时状态
  const [inputValues, setInputValues] = React.useState<
    Record<string, { opacity: string; saturationMult: string }>
  >({})

  // 同步输入框状态
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
                            inputValues[config.name]?.saturationMult ?? config.saturationMult
                          }
                          onChange={(e) =>
                            handleInputChange(index, "saturationMult", e.target.value)
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