/**
 * 颜色色阶生成工具
 * 流程：HEX 主色 + 白/黑混合 + 饱和度调整 → oklch 色阶
 */

import { oklch } from 'culori'

/**
 * 色阶配置
 */
export interface ColorScaleConfig {
  name: string
  mixColor: string      // 混合色（#000000 或 #FFFFFF）
  opacity: number       // 透明度 0-100（百分比）
  saturationMult: number // 饱和度系数
}

/**
 * 默认色阶配置（基于 Vcell）
 * name 使用数字序号，在生成时会被替换为实际色阶名称
 */
export const DEFAULT_SCALE_CONFIG: ColorScaleConfig[] = [
  { name: '1', mixColor: '#FFFFFF', opacity: 92, saturationMult: 1.4 },
  { name: '2', mixColor: '#FFFFFF', opacity: 88, saturationMult: 1.3 },
  { name: '3', mixColor: '#FFFFFF', opacity: 76, saturationMult: 1.2 },
  { name: '4', mixColor: '#FFFFFF', opacity: 16, saturationMult: 1.1 },
  { name: '5', mixColor: '', opacity: 0, saturationMult: 1 },
  { name: '6', mixColor: '#000000', opacity: 8, saturationMult: 1 },
]

/**
 * HEX 转 RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw new Error(`Invalid hex color: ${hex}`)
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  }
}

/**
 * RGB 转 HEX
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * RGB 转 HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

/**
 * HSL 转 RGB
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

/**
 * 混合颜色（HEX + 透明度叠加）
 */
function mixColor(baseHex: string, mixColor: string, opacity: number): string {
  const base = hexToRgb(baseHex)
  const mix = hexToRgb(mixColor)

  const r = base.r * (1 - opacity) + mix.r * opacity
  const g = base.g * (1 - opacity) + mix.g * opacity
  const b = base.b * (1 - opacity) + mix.b * opacity

  return rgbToHex(r, g, b)
}

/**
 * 调整饱和度
 */
function adjustSaturation(hex: string, saturateMultiplier: number): string {
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  hsl.s = Math.min(100, Math.max(0, hsl.s * saturateMultiplier))

  const newRgb = hslToRgb(hsl.h, hsl.s, hsl.l)
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b)
}

/**
 * HEX 转 oklch 字符串
 */
function hexToOklchString(hex: string): string {
  const oklchColor = oklch(hex)
  if (!oklchColor) return hex

  const l = oklchColor.l.toFixed(2)
  const c = oklchColor.c.toFixed(2)
  const h = (oklchColor.h ?? 0).toFixed(0)

  return `oklch(${l} ${c} ${h})`
}

/**
 * 生成色阶（输出 oklch）
 * @param baseHex - 主色 HEX 值
 * @param config - 色阶配置数组
 * @param colorType - 色阶类型前缀（brand/warning/error/success），默认为 brand
 */
export function generateColorScale(
  baseHex: string,
  config: ColorScaleConfig[] = DEFAULT_SCALE_CONFIG,
  colorType: 'brand' | 'warning' | 'error' | 'success' = 'brand'
): Record<string, { hex: string; oklch: string; params: string }> {
  const result: Record<string, { hex: string; oklch: string; params: string }> = {}

  for (const item of config) {
    const scaleName = `${colorType}-${item.name}`
    if (item.name === '5') {
      // 主色直接使用
      result[scaleName] = {
        hex: baseHex.toUpperCase(),
        oklch: hexToOklchString(baseHex),
        params: '主色',
      }
    } else {
      // 流程：混合 → 加饱和度 → 转 oklch
      const opacityDecimal = item.opacity / 100  // 转换为 0-1
      const mixed = mixColor(baseHex, item.mixColor, opacityDecimal)
      const saturated = adjustSaturation(mixed, item.saturationMult)
      result[scaleName] = {
        hex: saturated.toUpperCase(),
        oklch: hexToOklchString(saturated),
        params: `${item.mixColor === '#FFFFFF' ? '白' : '黑'}${item.opacity}% sat${item.saturationMult}x`,
      }
    }
  }

  return result
}

/**
 * 动态更新 CSS 变量
 * 同时更新 --color-X（:root）和 --color-color-X（Tailwind @theme）
 * @param scale - 色阶对象，键名包含 brand/warning/error
 */
export function updateCSSVariables(scale: Record<string, { oklch: string }>): void {
  Object.entries(scale).forEach(([name, value]) => {
    // 更新 :root 变量（如 --brand-5, --warning-5, --error-5）
    document.documentElement.style.setProperty(`--${name}`, value.oklch)
    // 更新 Tailwind @theme 变量（如 --color-brand-5, --color-warning-5, --color-error-5）
    document.documentElement.style.setProperty(`--color-${name}`, value.oklch)
  })
}

/**
 * 获取默认主色
 */
export const DEFAULT_BRAND_COLOR = '#0888FF'
export const DEFAULT_WARNING_COLOR = '#FFBD34'
export const DEFAULT_ERROR_COLOR = '#EC4B4B'
export const DEFAULT_SUCCESS_COLOR = '#07BB85'