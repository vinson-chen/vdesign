import { Card, CardGrid, SectionTitle } from "./shared"

// 常规文字字号
const textSizesRegular = [
  { name: "r-xs", value: "12/20" },
  { name: "r-sm", value: "14/24" },
  { name: "r-base", value: "16/24" },
  { name: "r-lg", value: "20/28" },
  { name: "r-xl", value: "24/32" },
  { name: "r-2xl", value: "28/36" },
]

// 中等文字字号
const textSizesMedium = [
  { name: "m-xs", value: "12/20" },
  { name: "m-sm", value: "14/24" },
  { name: "m-base", value: "16/24" },
  { name: "m-lg", value: "20/28" },
  { name: "m-xl", value: "24/32" },
  { name: "m-2xl", value: "28/36" },
]

// 半粗文字字号
const textSizesSemibold = [
  { name: "s-xs", value: "12/20" },
  { name: "s-sm", value: "14/24" },
  { name: "s-base", value: "16/24" },
  { name: "s-lg", value: "20/28" },
  { name: "s-xl", value: "24/32" },
  { name: "s-2xl", value: "28/36" },
]

// 字号映射表
const fontSizeMap: Record<string, string> = {
  "r-xs": "12px",
  "r-sm": "14px",
  "r-base": "16px",
  "r-lg": "20px",
  "r-xl": "24px",
  "r-2xl": "28px",
  "m-xs": "12px",
  "m-sm": "14px",
  "m-base": "16px",
  "m-lg": "20px",
  "m-xl": "24px",
  "m-2xl": "28px",
  "s-xs": "12px",
  "s-sm": "14px",
  "s-base": "16px",
  "s-lg": "20px",
  "s-xl": "24px",
  "s-2xl": "28px",
}

// 排版页面组件
export function TypographyPage() {
  return (
    <div>
      <SectionTitle title="常规文字" />
      <section className="mb-16">
        <CardGrid>
          {textSizesRegular.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 400,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="中等文字" />
      <section className="mb-16">
        <CardGrid>
          {textSizesMedium.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 500,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>

      <SectionTitle title="半粗文字" />
      <section>
        <CardGrid>
          {textSizesSemibold.map((text) => (
            <Card
              key={text.name}
              label={text.name}
              copyText={text.name}
              exampleStyle={{ backgroundColor: "var(--neutral-1)" }}
            >
              <div className="flex h-full items-center justify-center">
                <span
                  style={{
                    color: "var(--neutral-5)",
                    fontSize: fontSizeMap[text.name],
                    fontWeight: 600,
                  }}
                >
                  示例文字
                </span>
              </div>
            </Card>
          ))}
        </CardGrid>
      </section>
    </div>
  )
}