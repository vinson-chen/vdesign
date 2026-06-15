import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Context 自动传递 size
const TabsContext = React.createContext<{ size: "sm" | "base" | "lg" }>({ size: "base" })

function Tabs({ className, size = "base", children, ...props }: React.ComponentProps<typeof TabsPrimitive.Root> & { size?: "sm" | "base" | "lg" }) {
  return (
    <TabsContext.Provider value={{ size }}>
      <TabsPrimitive.Root data-slot="tabs" className={cn(className)} {...props}>
        {children}
      </TabsPrimitive.Root>
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        basic: "bg-neutral-1 p-1",
        line: "bg-transparent border-b border-neutral-2 gap-0 p-0",
      },
      size: {
        sm: "h-8 rounded-md",
        base: "h-10 rounded-lg",
        lg: "h-12 rounded-xl",
      },
    },
    compoundVariants: [
      // line 模式：TabsList 高度与 TabsTrigger 一致，确保底部描边对齐
      { variant: "line", size: "sm", class: "h-6 rounded-none" },
      { variant: "line", size: "base", class: "h-8 rounded-none" },
      { variant: "line", size: "lg", class: "h-10 rounded-none" },
    ],
    defaultVariants: { variant: "basic" },
  }
)

function TabsList({ className, variant, ...props }: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  const { size } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(tabsListVariants({ variant, size }), className)}
      {...props}
    />
  )
}

const tabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap transition-all outline-none select-none",
  {
    variants: {
      variant: {
        basic: "text-black-55 hover:text-black-85 data-[state=active]:bg-white-100 data-[state=active]:text-black-85 data-[state=active]:shadow-sm",
        line: "text-black-55 border-b-2 border-transparent hover:text-black-85 data-[state=active]:text-brand-5 data-[state=active]:border-brand-5 px-1",
      },
      size: {
        sm: "h-6 px-2 text-xs gap-1 rounded-md",
        base: "h-8 px-3 text-sm gap-1.5 rounded-lg",
        lg: "h-10 px-4 text-base gap-2 rounded-xl",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer",
      },
    },
    compoundVariants: [
      { variant: "line", size: "sm", class: "rounded-none" },
      { variant: "line", size: "base", class: "rounded-none" },
      { variant: "line", size: "lg", class: "rounded-none" },
    ],
    defaultVariants: { variant: "basic", disabled: false },
  }
)

function TabsTrigger({ className, variant, disabled, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  const { size } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      disabled={disabled}
      className={cn(tabsTriggerVariants({ variant, size, disabled }), className)}
      {...props}
    />
  )
}

const tabsContentVariants = cva(
  "outline-none focus-visible:ring-2 focus-visible:ring-brand-5 focus-visible:ring-offset-2",
  {
    variants: {
      size: {
        sm: "mt-2 text-xs",
        base: "mt-3 text-sm",
        lg: "mt-4 text-base",
      },
    },
    defaultVariants: { size: "base" },
  }
)

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  const { size } = React.useContext(TabsContext)

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(tabsContentVariants({ size }), className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants, tabsContentVariants, TabsContext }