import { Input } from "@/components/ui/input"
import { Card, CardGrid, SectionTitle } from "./shared"

// 输入页面组件
export function InputPage() {
  return (
    <div>
      <SectionTitle title="常规输入 basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" className="w-[200px]" />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" size="sm" className="w-[200px]" />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input placeholder="请输入" size="lg" className="w-[200px]" />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="无效输入 invalid" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                size="sm"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=invalid, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="invalid"
                size="lg"
                className="w-[200px]"
              />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁止输入 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                size="sm"
                className="w-[200px]"
              />
            </div>
          </Card>
          <Card
            label="Input"
            copyText="component=Input, variant=disabled, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Input
                placeholder="请输入"
                variant="disabled"
                size="lg"
                className="w-[200px]"
              />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}