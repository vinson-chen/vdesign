# Vdesign 组件库开发规范

核心原则：**轻量、专业、规范化**

## 必须遵循

1. **使用 CVA 定义变体** - 通过 `class-variance-authority` 配置 variant/size 等属性
2. **CSS 原生处理交互状态** - 使用 `hover:`、`active:`、`disabled:`、`focus-visible:` 伪类，禁止 JS 事件处理
3. **data-slot 标识组件** - 每个组件根元素添加 `data-slot="component-name"`
4. **导出组件和 variants** - `export { Component, componentVariants }`
5. **代码控制在 50-70 行** - 保持简洁，避免过度封装
6. **优先复用现有组件** - 避免用原生元素 + 手写 class 模拟已有组件的行为

## 禁止事项

- ❌ inline style 处理交互状态（特殊情况如动态颜色值除外）
- ❌ JS 事件处理 hover/active/disabled 状态
- ❌ 打补丁式代码（逻辑分散、临时修复）
- ❌ 过度封装不必要的抽象

## 组件模板

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva("base-styles", {
  variants: {
    variant: { primary: "...", outline: "..." },
    size: { sm: "...", base: "...", lg: "..." },
  },
  defaultVariants: { variant: "primary", size: "base" },
})

function Component({ className, variant, size, ...props }: React.ComponentProps<"element"> &
  VariantProps<typeof componentVariants>) {
  return (
    <element
      data-slot="component"
      className={cn(componentVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Component, componentVariants }
```

## 响应式断点

使用 Tailwind 默认断点：`sm`(640px)、`md`(768px)、`lg`(1024px)、`xl`(1280px)

## Demo 页面布局规范

每个页面由多个 section 组成，遵循以下间距规则：

1. **SectionTitle 大标题** - 标识每个组件类型分组
2. **section 容器** - 包裹 CardGrid，除最后一个外必须有 `mb-16` 间距
3. **最后一组 section** - 无间距，避免底部空白

```tsx
<SectionTitle title="标题" />
<section className="mb-16">  // 有间距
  <CardGrid cols={3}>...</CardGrid>
</section>

<SectionTitle title="标题" />
<section>  // 最后一组，无间距
  <CardGrid cols={3}>...</CardGrid>
</section>
```