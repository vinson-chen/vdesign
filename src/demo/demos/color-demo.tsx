import * as React from "react"
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
import { CardGrid, SectionTitle, ColorConfigDrawer } from "./shared"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { CopyButton } from "@/components/ui/copy-button"

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

export function ColorPage() {
  // 品牌色状态
  const [brandDrawerOpen, setBrandDrawerOpen] = React.useState(false)
  const [brandColor, setBrandColor] = React.useState(() => {
    return localStorage.getItem("brandColor") || DEFAULT_BRAND_COLOR
  })
  const [brandScaleConfig, setBrandScaleConfig] = React.useState<ColorScaleConfig[]>(() => {
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
  const [successScaleConfig, setSuccessScaleConfig] = React.useState<ColorScaleConfig[]>(() => {
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
  const [warningScaleConfig, setWarningScaleConfig] = React.useState<ColorScaleConfig[]>(() => {
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
  const [errorScaleConfig, setErrorScaleConfig] = React.useState<ColorScaleConfig[]>(() => {
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
    setScale: React.Dispatch<React.SetStateAction<Record<string, { hex: string; oklch: string; params: string }>>>,
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

    const handleConfigChange = (index: number, field: "opacity" | "saturationMult", value: number) => {
      const newConfig = [...currentConfig]
      const current = newConfig[index]
      if (current) {
        newConfig[index] = { ...current, [field]: value }
        setScaleConfig(newConfig)
        const newScale = generateColorScale(currentColor, newConfig, colorType)
        setScale(newScale)
        updateCSSVariables(newScale)
        localStorage.setItem(`${colorType}ScaleConfig`, JSON.stringify(newConfig))
      }
    }

    const handleReset = () => {
      setColor(defaultColor)
      setScaleConfig(DEFAULT_SCALE_CONFIG)
      const newScale = generateColorScale(defaultColor, DEFAULT_SCALE_CONFIG, colorType)
      setScale(newScale)
      updateCSSVariables(newScale)
      localStorage.setItem(`${colorType}Color`, defaultColor)
      localStorage.setItem(`${colorType}ScaleConfig`, JSON.stringify(DEFAULT_SCALE_CONFIG))
    }

    return { handleColorChange, handleConfigChange, handleReset }
  }

  const brandHandlers = createColorHandlers("brand", DEFAULT_BRAND_COLOR, setBrandColor, setBrandScaleConfig, setBrandScale, brandColor, brandScaleConfig)
  const successHandlers = createColorHandlers("success", DEFAULT_SUCCESS_COLOR, setSuccessColor, setSuccessScaleConfig, setSuccessScale, successColor, successScaleConfig)
  const warningHandlers = createColorHandlers("warning", DEFAULT_WARNING_COLOR, setWarningColor, setWarningScaleConfig, setWarningScale, warningColor, warningScaleConfig)
  const errorHandlers = createColorHandlers("error", DEFAULT_ERROR_COLOR, setErrorColor, setErrorScaleConfig, setErrorScale, errorColor, errorScaleConfig)

  const dynamicBrandColors = Object.entries(brandScale).map(([name, value]) => ({ name, value: value.hex.toUpperCase() }))
  const dynamicSuccessColors = Object.entries(successScale).map(([name, value]) => ({ name, value: value.hex.toUpperCase() }))
  const dynamicWarningColors = Object.entries(warningScale).map(([name, value]) => ({ name, value: value.hex.toUpperCase() }))
  const dynamicErrorColors = Object.entries(errorScale).map(([name, value]) => ({ name, value: value.hex.toUpperCase() }))

  return (
    <div>
      <SectionTitle title="品牌色" />
      <section className="mb-16">
        <CardGrid>
          {dynamicBrandColors.map((color, i) => (
            <Card
              key={color.name}
              onClick={color.name === "brand-5" ? () => setBrandDrawerOpen(true) : undefined}
            >
              <CardContent
                style={{ backgroundColor: `var(--brand-${i + 1})` }}
              />
              <CardFooter className="justify-between">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
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
              onClick={color.name === "success-5" ? () => setSuccessDrawerOpen(true) : undefined}
            >
              <CardContent
                style={{ backgroundColor: `var(--success-${i + 1})` }}
              />
              <CardFooter className="justify-between">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
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
              onClick={color.name === "warning-5" ? () => setWarningDrawerOpen(true) : undefined}
            >
              <CardContent
                style={{ backgroundColor: `var(--warning-${i + 1})` }}
              />
              <CardFooter className="justify-between">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
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
              onClick={color.name === "error-5" ? () => setErrorDrawerOpen(true) : undefined}
            >
              <CardContent
                style={{ backgroundColor: `var(--error-${i + 1})` }}
              />
              <CardFooter className="justify-between">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
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
            <Card key={color.name}>
              <CardContent
                style={{ backgroundColor: `var(--neutral-${i + 1})` }}
              />
              <CardFooter className="justify-between">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="黑色透明" />
      <section className="mb-16">
        <CardGrid>
          {blackColors.map((color) => (
            <Card key={color.name} className="bg-transparent">
              <CardContent
                className="bg-transparent"
                style={{ backgroundColor: `var(--black-${color.name.split("-")[1]})` }}
              />
              <CardFooter className="justify-between bg-white-100">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="白色透明" />
      <section className="mb-16">
        <CardGrid>
          {whiteColors.map((color) => (
            <Card key={color.name} className="bg-transparent">
              <CardContent
                className="bg-transparent"
                style={{ backgroundColor: `var(--white-${color.name.split("-")[1]})` }}
              />
              <CardFooter className="justify-between bg-white-100">
                <span className="text-sm text-black-85">{color.name}</span>
                <CopyButton text={color.name} />
              </CardFooter>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="投影" />
      <section>
        <CardGrid cols={6}>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_0_3px_var(--brand-2)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-1</span>
              <CopyButton text="shadow-1" />
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_8px_8px_0_var(--black-5)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-2.1</span>
              <CopyButton text="shadow-2.1" />
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),0_-8px_8px_0_var(--black-5)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-2.2</span>
              <CopyButton text="shadow-2.2" />
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),8px_0_8px_0_var(--black-5)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-2.3</span>
              <CopyButton text="shadow-2.3" />
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_4px_1px_var(--black-5),-8px_0_8px_0_var(--black-5)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-2.4</span>
              <CopyButton text="shadow-2.4" />
            </CardFooter>
          </Card>
          <Card>
            <CardContent>
              <div className="size-10 rounded-lg bg-white-100 shadow-[0_0_8px_1px_var(--black-5),0_12px_24px_-4px_var(--black-10)]" />
            </CardContent>
            <CardFooter className="justify-between">
              <span className="text-sm text-black-85">shadow-3</span>
              <CopyButton text="shadow-3" />
            </CardFooter>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}