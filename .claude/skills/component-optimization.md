# 组件优化经验总结

本文档总结了 Vdesign 组件库的优化经验，可作为新增组件或优化现有组件的参考指南。

## 零、新增组件推荐工作流

### 1. 安装 Radix UI 底层原语

```bash
pnpm add @radix-ui/react-[component-name]
```

### 2. 参考实现思路（可选）

打开 shadcn 官网查看 API 设计和交互模式：
https://ui.shadcn.com/docs/components/[component-name]

### 3. 按照 Vdesign 规范实现

- 使用 [src/styles.css](src/styles.css) 的 token（品牌色/安全色/警告色/危险色/中性色）
- 使用 CVA 定义变体（只处理 variant，不处理 size）
- CSS 原生处理交互状态（hover/active/disabled/focus-visible）
- 保持代码简洁（50-70 行）

---

## 一、核心优化原则

### 1. 只在真正需要变体的地方使用 CVA

**问题诊断：过度使用 CVA**

```tsx
// ❌ 错误：布局容器不需要 CVA
const dialogHeaderVariants = cva("flex flex-col", {
  variants: {
    size: {
      base: "mb-4 gap-2",
      lg: "mb-5 gap-3",
    },
  },
})

// ✅ 正确：布局容器直接用 Tailwind class
function DialogHeader({ className, ...props }) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]
  
  return <div className={cn("flex flex-col", config.header, className)} {...props} />
}
```

**判断标准：**
- 如果组件只有 `size` 变体，不需要 CVA
- 如果组件有 `variant` 变体（如 primary/outline/ghost），需要 CVA
- 布局容器（Header/Body/Footer/Field）通常不需要 CVA

### 2. 用 Context 自动传递 size

**问题诊断：size 手动传递繁琐**

```tsx
// ❌ 错误：每个子组件都要手动传 size
<DialogContent size={size}>
  <DialogHeader size={size}>
    <DialogTitle size={size}>标题</DialogTitle>
  </DialogHeader>
  <DialogBody size={size}>
    <DialogField size={size}>
      ...
    </DialogField>
  </DialogBody>
</DialogContent>

// ✅ 正确：用 Context 自动传递
<DialogContent size={size}>
  <DialogHeader>
    <DialogTitle>标题</DialogTitle>
  </DialogHeader>
  <DialogBody>
    <DialogField>
      ...
    </DialogField>
  </DialogBody>
</DialogContent>
```

**实现模式：**

```tsx
// 1. 创建 Context
const DialogContext = React.createContext<{ size: "base" | "lg" }>({ size: "base" })

// 2. 根组件提供 Context
function DialogContent({ size = "base", children }) {
  return (
    <DialogContext.Provider value={{ size }}>
      <DialogPrimitive.Content>
        {children}
      </DialogPrimitive.Content>
    </DialogContext.Provider>
  )
}

// 3. 子组件消费 Context
function DialogHeader({ className, ...props }) {
  const { size } = React.useContext(DialogContext)
  const config = sizeConfig[size]
  
  return <div className={cn("flex flex-col", config.header, className)} {...props} />
}
```

### 3. 用 sizeConfig 对象替代 CVA 的 size 变体

**问题诊断：size 样式分散在多个 CVA 中**

```tsx
// ❌ 错误：size 样式分散在多个 CVA
const dialogHeaderVariants = cva("...", { variants: { size: { base: "...", lg: "..." } } })
const dialogBodyVariants = cva("...", { variants: { size: { base: "...", lg: "..." } } })
const dialogFooterVariants = cva("...", { variants: { size: { base: "...", lg: "..." } } })

// ✅ 正确：集中定义 sizeConfig
const sizeConfig = {
  base: {
    content: "max-w-[400px] rounded-xl p-4",
    header: "mb-4 gap-2",
    body: "gap-3",
    footer: "mt-4 gap-2",
    title: "text-base",
  },
  lg: {
    content: "max-w-[480px] rounded-2xl p-5",
    header: "mb-5 gap-3",
    body: "gap-5",
    footer: "mt-5 gap-3",
    title: "text-lg",
  },
} as const
```

**优势：**
- 所有尺寸相关的样式集中在一个对象中，易于维护
- 不需要在每个子组件中定义 CVA
- 子组件只需从 Context 获取 size，然后读取对应的 config

## 二、优化效果对比

| 组件 | 评估 | 对比 shadcn 的分析 |
|------|------|-------------------|
| **Button** | ✅ 合理 | CVA 定义 `variant` + `size`，符合 shadcn 模式。增加 `noShift` 复合变体（防止 popover 中位移） |
| **Input** | ✅ 合理 | 增加图标支持（`leftIcon`/`rightIcon`），`inputVariants` + `sizeConfig` 分开使用，结构清晰 |
| **Select** | ✅ 合理 | Context 传递 size，简化导出，比 shadcn 更简洁 |
| **NavigationItem** | ✅ 合理 | 简单组件，CVA 定义 `variant` + `size` |
| **Tabs** | ✅ 合理 | Context 传递 size，CVA 定义 `variant`（basic/line），符合 shadcn 模式 |
| **Radio/Checkbox/Switch** | ✅ 合理 | CVA 定义 `checked`/`disabled`/`size`，CSS 原生处理交互状态 |
| **Pagination** | ✅ 合理 | 简化为 5 个核心组件，Context 传递 size |
| **Popover** | ✅ 合理 | Context 传递 size + `close` 方法，增加 `PopoverItem` 等增强组件 |
| **Dialog/Drawer** | ✅ 合理 | Context 传递 size，`sizeConfig` 集中管理布局样式 |
| **Sonner/Tooltip** | ✅ 合理 | 简单封装，符合 Radix UI 模式 |

**所有组件都是合理实现**，符合最佳实践：CVA 用于 variant，sizeConfig 用于 size，Context 自动传递，CSS 原生交互。

## 三、优化模板

### 模板 A：简单组件（只有 size 变体）

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const sizeConfig = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", text: "text-xs" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base" },
} as const

const ComponentContext = React.createContext<{ size: "sm" | "base" | "lg" }>({ size: "base" })

function Component({ size = "base", children }) {
  return (
    <ComponentContext.Provider value={{ size }}>
      <div data-slot="component">
        {children}
      </div>
    </ComponentContext.Provider>
  )
}

function ComponentChild({ className, ...props }) {
  const { size } = React.useContext(ComponentContext)
  const config = sizeConfig[size]
  
  return <div className={cn(config.height, config.text, className)} {...props} />
}

export { Component, ComponentChild }
```

### 模板 B：复杂组件（有 variant + size）

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const sizeConfig = {
  sm: { height: "h-6", rounded: "rounded-md", px: "px-1.5", gap: "gap-1", text: "text-xs" },
  base: { height: "h-8", rounded: "rounded-lg", px: "px-2", gap: "gap-1.5", text: "text-sm" },
  lg: { height: "h-10", rounded: "rounded-xl", px: "px-3", gap: "gap-2", text: "text-base" },
} as const

const ComponentContext = React.createContext<{ size: "sm" | "base" | "lg" }>({ size: "base" })

// 只在根组件使用 CVA（处理 variant）
const componentVariants = cva("base-styles", {
  variants: {
    variant: {
      primary: "bg-brand-5 text-white-90",
      outline: "border-neutral-2 bg-white-100",
    },
  },
  defaultVariants: { variant: "primary" },
})

function Component({ variant, size = "base", children }) {
  const config = sizeConfig[size]
  
  return (
    <ComponentContext.Provider value={{ size }}>
      <div
        data-slot="component"
        className={cn(
          componentVariants({ variant }),
          config.height,
          config.rounded
        )}
      >
        {children}
      </div>
    </ComponentContext.Provider>
  )
}

function ComponentChild({ className, ...props }) {
  const { size } = React.useContext(ComponentContext)
  const config = sizeConfig[size]
  
  return <div className={cn(config.text, className)} {...props} />
}

export { Component, ComponentChild, componentVariants }
```

## 四、判断是否需要优化的标准

### 需要优化的信号

1. **代码行数超过 100 行** - 通常意味着过度封装
2. **有多个 CVA 只处理 size 变体** - 应该用 sizeConfig
3. **子组件需要手动传递 size prop** - 应该用 Context
4. **CVA 只有布局样式（gap、padding、margin）** - 应该直接用 Tailwind

### 不需要优化的信号

1. **代码行数在 50-70 行** - 已经很简洁
2. **组件只有 variant 变体（无 size）** - CVA 是正确的
3. **组件是叶子节点（没有子组件）** - 不需要 Context
4. **组件是独立使用（不在复合组件中）** - 不需要 Context

## 五、优化后的代码风格

### 使用体验

```tsx
// 优化前
<DialogContent size={size}>
  <DialogHeader size={size}>
    <DialogTitle size={size}>标题</DialogTitle>
  </DialogHeader>
  <DialogBody size={size}>
    <DialogField size={size}>
      <Input size={size} />
    </DialogField>
  </DialogBody>
  <DialogFooter size={size}>
    <Button size={size}>保存</Button>
  </DialogFooter>
</DialogContent>

// 优化后
<DialogContent size={size}>
  <DialogHeader>
    <DialogTitle>标题</DialogTitle>
  </DialogHeader>
  <DialogBody>
    <DialogField>
      <Input />
    </DialogField>
  </DialogBody>
  <DialogFooter>
    <Button>保存</Button>
  </DialogFooter>
</DialogContent>
```

### 代码结构

```tsx
// 组件文件结构（优化后）
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 1. Context（如果有子组件）
const ComponentContext = React.createContext<{ size: "..." }>({ size: "..." })

// 2. sizeConfig（如果有 size 变体）
const sizeConfig = { sm: {...}, base: {...}, lg: {...} } as const

// 3. CVA（只处理 variant，不处理 size）
const componentVariants = cva("...", { variants: { variant: {...} } })

// 4. 根组件
function Component({ size, variant, children }) {
  return (
    <ComponentContext.Provider value={{ size }}>
      <div className={cn(componentVariants({ variant }), sizeConfig[size])}>
        {children}
      </div>
    </ComponentContext.Provider>
  )
}

// 5. 子组件（从 Context 获取 size）
function ComponentChild({ className, ...props }) {
  const { size } = React.useContext(ComponentContext)
  const config = sizeConfig[size]
  return <div className={cn(config.xxx, className)} {...props} />
}

export { Component, ComponentChild, componentVariants }
```

## 六、总结

| 场景 | 方案 |
|------|------|
| 只有 size 变体 | 用 sizeConfig + Context |
| 有 variant + size | CVA 处理 variant，sizeConfig 处理 size |
| 布局容器（Header/Body/Footer） | 直接用 Tailwind class |
| 叶子组件（Button/Input） | CVA 处理 variant，size 直接传 prop |
| 复合组件（Dialog/Drawer） | Context 自动传递 size |

**核心思想：减少不必要的抽象，只在真正需要的地方使用 CVA 和 Context。**