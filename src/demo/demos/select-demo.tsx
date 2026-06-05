import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardGrid, SectionTitle } from "./shared"

// 选择页面组件
export function SelectPage() {
  return (
    <div>
      <SectionTitle title="常规选择 basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger size="sm" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger size="lg" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="无效选择 invalid" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger variant="invalid" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger
                  variant="invalid"
                  size="sm"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=invalid, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select>
                <SelectTrigger
                  variant="invalid"
                  size="lg"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="禁止选择 disabled" />
      <section>
        <CardGrid cols={3}>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger variant="disabled" className="w-[200px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">选项一</SelectItem>
                  <SelectItem value="option2">选项二</SelectItem>
                  <SelectItem value="option3">选项三</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger
                  variant="disabled"
                  size="sm"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="sm">
                  <SelectItem size="sm" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="sm" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="sm" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
          <Card
            label="Select"
            copyText="component=Select, variant=disabled, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Select variant="disabled">
                <SelectTrigger
                  variant="disabled"
                  size="lg"
                  className="w-[200px]"
                >
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent size="lg">
                  <SelectItem size="lg" value="option1">
                    选项一
                  </SelectItem>
                  <SelectItem size="lg" value="option2">
                    选项二
                  </SelectItem>
                  <SelectItem size="lg" value="option3">
                    选项三
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}