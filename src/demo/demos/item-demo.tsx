import * as React from "react"
import { NavigationItem } from "@/components/ui/navigation-item"
import { Switch } from "@/components/ui/switch"
import { Radio } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationInfo,
} from "@/components/ui/pagination"
import { Card, CardGrid, SectionTitle } from "./shared"

// 选项页面组件
export function ItemPage() {
  // 导航选项状态
  const [navBase, setNavBase] = React.useState(0)
  const [navSm, setNavSm] = React.useState(0)
  const [navLg, setNavLg] = React.useState(0)

  // 单选状态
  const [radioBase, setRadioBase] = React.useState(1)
  const [radioSm, setRadioSm] = React.useState(1)
  const [radioLg, setRadioLg] = React.useState(1)

  // 多选状态
  const [checkboxBase, setCheckboxBase] = React.useState({
    opt1: false,
    opt2: true,
    opt3: false,
  })
  const [checkboxSm, setCheckboxSm] = React.useState({
    opt1: false,
    opt2: true,
    opt3: false,
  })
  const [checkboxLg, setCheckboxLg] = React.useState({
    opt1: false,
    opt2: true,
    opt3: true,
  })

  // 开关状态
  const [switchBase, setSwitchBase] = React.useState(false)
  const [switchBase2, setSwitchBase2] = React.useState(false)
  const [switchSm, setSwitchSm] = React.useState(false)
  const [switchLg, setSwitchLg] = React.useState(false)

  // 分页器 Demo 组件
  function PaginationBaseDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="base">
        <PaginationPrevious
          size="base"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="base"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="base"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  function PaginationSmDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="sm">
        <PaginationPrevious
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="sm"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  function PaginationLgDemo() {
    const [page, setPage] = React.useState(1)
    const totalPages = 3
    return (
      <Pagination size="lg">
        <PaginationPrevious
          size="lg"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        <PaginationInfo
          size="lg"
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <PaginationNext
          size="lg"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        />
      </Pagination>
    )
  }

  return (
    <div>
      <SectionTitle title="导航选项 NavigationItem" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                variant={navBase === 0 ? "selected" : "basic"}
                onClick={() => setNavBase(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                variant={navBase === 1 ? "selected" : "basic"}
                onClick={() => setNavBase(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                variant={navBase === 2 ? "selected" : "basic"}
                onClick={() => setNavBase(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                size="sm"
                variant={navSm === 0 ? "selected" : "basic"}
                onClick={() => setNavSm(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                size="sm"
                variant={navSm === 1 ? "selected" : "basic"}
                onClick={() => setNavSm(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                size="sm"
                variant={navSm === 2 ? "selected" : "basic"}
                onClick={() => setNavSm(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
          <Card
            label="NavigationItem"
            copyText="component=NavigationItem, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-2 px-4">
              <NavigationItem
                size="lg"
                variant={navLg === 0 ? "selected" : "basic"}
                onClick={() => setNavLg(0)}
              >
                选项一
              </NavigationItem>
              <NavigationItem
                size="lg"
                variant={navLg === 1 ? "selected" : "basic"}
                onClick={() => setNavLg(1)}
              >
                选项二
              </NavigationItem>
              <NavigationItem
                size="lg"
                variant={navLg === 2 ? "selected" : "basic"}
                onClick={() => setNavLg(2)}
              >
                选项三
              </NavigationItem>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="单选项 Radio" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-4">
              <Radio checked={radioBase === 0} onChange={() => setRadioBase(0)}>
                <span className="text-sm text-black-85">选项一</span>
              </Radio>
              <Radio checked={radioBase === 1} onChange={() => setRadioBase(1)}>
                <span className="text-sm text-black-85">选项二</span>
              </Radio>
              <Radio checked={radioBase === 2} onChange={() => setRadioBase(2)}>
                <span className="text-sm text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-3">
              <Radio
                size="sm"
                checked={radioSm === 0}
                onChange={() => setRadioSm(0)}
              >
                <span className="text-xs text-black-85">选项一</span>
              </Radio>
              <Radio
                size="sm"
                checked={radioSm === 1}
                onChange={() => setRadioSm(1)}
              >
                <span className="text-xs text-black-85">选项二</span>
              </Radio>
              <Radio size="sm" checked={false} disabled>
                <span className="text-xs text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
          <Card
            label="Radio"
            copyText="component=Radio, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-5">
              <Radio
                size="lg"
                checked={radioLg === 0}
                onChange={() => setRadioLg(0)}
              >
                <span className="text-base text-black-85">选项一</span>
              </Radio>
              <Radio
                size="lg"
                checked={radioLg === 1}
                onChange={() => setRadioLg(1)}
              >
                <span className="text-base text-black-85">选项二</span>
              </Radio>
              <Radio size="lg" checked disabled>
                <span className="text-base text-black-85">选项三</span>
              </Radio>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="多选项 Checkbox" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-4">
              <Checkbox
                checked={checkboxBase.opt1}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt1: v })}
              >
                <span className="text-sm text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                checked={checkboxBase.opt2}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt2: v })}
              >
                <span className="text-sm text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                checked={checkboxBase.opt3}
                onChange={(v) => setCheckboxBase({ ...checkboxBase, opt3: v })}
              >
                <span className="text-sm text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-3">
              <Checkbox
                size="sm"
                checked={checkboxSm.opt1}
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt1: v })}
              >
                <span className="text-xs text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                size="sm"
                checked={checkboxSm.opt2}
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt2: v })}
              >
                <span className="text-xs text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                size="sm"
                checked={checkboxSm.opt3}
                disabled
                onChange={(v) => setCheckboxSm({ ...checkboxSm, opt3: v })}
              >
                <span className="text-xs text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
          <Card
            label="Checkbox"
            copyText="component=Checkbox, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-5">
              <Checkbox
                size="lg"
                checked={checkboxLg.opt1}
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt1: v })}
              >
                <span className="text-base text-black-85">选项一</span>
              </Checkbox>
              <Checkbox
                size="lg"
                checked={checkboxLg.opt2}
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt2: v })}
              >
                <span className="text-base text-black-85">选项二</span>
              </Checkbox>
              <Checkbox
                size="lg"
                checked={checkboxLg.opt3}
                disabled
                onChange={(v) => setCheckboxLg({ ...checkboxLg, opt3: v })}
              >
                <span className="text-base text-black-85">选项三</span>
              </Checkbox>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="开关 Switch" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=base"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch checked={switchBase} onChange={setSwitchBase} />
              <Switch checked={switchBase2} onChange={setSwitchBase2} />
            </div>
          </Card>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=sm"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch size="sm" checked={switchSm} onChange={setSwitchSm} />
              <Switch size="sm" checked={false} disabled />
            </div>
          </Card>
          <Card
            label="Switch"
            copyText="component=Switch, variant=unchecked, size=lg"
          >
            <div className="flex h-full items-center justify-center gap-2">
              <Switch size="lg" checked={switchLg} onChange={setSwitchLg} />
              <Switch size="lg" checked={true} disabled />
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="分页器 Pagination" />
      <section>
        <CardGrid cols={3}>
          <Card label="Pagination" copyText="component=Pagination, size=base">
            <div className="flex h-full items-center justify-center">
              <PaginationBaseDemo />
            </div>
          </Card>
          <Card label="Pagination" copyText="component=Pagination, size=sm">
            <div className="flex h-full items-center justify-center">
              <PaginationSmDemo />
            </div>
          </Card>
          <Card label="Pagination" copyText="component=Pagination, size=lg">
            <div className="flex h-full items-center justify-center">
              <PaginationLgDemo />
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}