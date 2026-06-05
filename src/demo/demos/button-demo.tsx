import { Button } from "@/components/ui/button"
import { Card, CardGrid, SectionTitle } from "./shared"

// 按钮页面组件
export function ButtonPage() {
  return (
    <div>
      <SectionTitle title="主要按钮 primary" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary">按钮</Button>
              <Button leftIcon="icon-link" variant="primary">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=primary, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=primary, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=primary, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=primary, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="primary" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="primary" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="primary" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="描边按钮 outline" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline">按钮</Button>
              <Button leftIcon="icon-link" variant="outline">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=outline, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=outline, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=outline, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=outline, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="outline" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="outline" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="outline" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="幽灵按钮 ghost" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost">按钮</Button>
              <Button leftIcon="icon-link" variant="ghost">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=ghost, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=ghost, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=ghost, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=ghost, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="ghost" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="ghost" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="ghost" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="危险按钮 destructive" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText:
                  "component=Button, variant=destructive, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive">按钮</Button>
              <Button leftIcon="icon-link" variant="destructive">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="destructive">
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconBase"
              />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=destructive, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="destructive" size="sm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="destructive"
                size="sm"
              >
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconSm"
              />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=destructive, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=destructive, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=destructive, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=destructive, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="destructive" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="destructive" size="lg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="destructive"
                size="lg"
              >
                按钮
              </Button>
              <Button
                leftIcon="icon-link"
                variant="destructive"
                size="iconLg"
              />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="链接按钮 link" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link">按钮</Button>
              <Button leftIcon="icon-link" variant="link">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="sm">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=link, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=link, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=link, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=link, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="link" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="lg">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="link" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="link" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="表格按钮 cell" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellBase",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellBase, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellBase, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellBase">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellBase">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellBase"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellSm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellSm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellSm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellSm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellSm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellSm"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=cell, size=cellLg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=cell, size=cellLg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=cell, size=cellLg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=cell, size=cellIconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="cell" size="cellLg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellLg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="cell"
                size="cellLg"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="cell" size="cellIconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁用按钮 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=base",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=base, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=base, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconBase",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled">按钮</Button>
              <Button leftIcon="icon-link" variant="disabled">
                按钮
              </Button>
              <Button rightIcon="icon-chevron-down" variant="disabled">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconBase" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=sm",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=sm, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=sm, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconSm",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled" size="sm">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="sm">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="disabled"
                size="sm"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconSm" />
            </div>
          </Card>
          <Card
            items={[
              {
                label: "text",
                copyText: "component=Button, variant=disabled, size=lg",
              },
              {
                label: "leftIcon",
                copyText:
                  "component=Button, variant=disabled, size=lg, leftIcon=icon-link",
              },
              {
                label: "rightIcon",
                copyText:
                  "component=Button, variant=disabled, size=lg, rightIcon=icon-chevron-down",
              },
              {
                label: "icon",
                copyText: "component=Button, variant=disabled, size=iconLg",
              },
            ]}
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Button variant="disabled" size="lg">
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="lg">
                按钮
              </Button>
              <Button
                rightIcon="icon-chevron-down"
                variant="disabled"
                size="lg"
              >
                按钮
              </Button>
              <Button leftIcon="icon-link" variant="disabled" size="iconLg" />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}