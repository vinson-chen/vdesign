import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverMenuItem,
  PopoverCheckboxItem,
  PopoverRadioGroup,
  PopoverRadioItem,
  PopoverLabel,
  PopoverSeparator,
  PopoverSub,
  PopoverSubTrigger,
  PopoverSubContent,
} from "@/components/ui/popover"
import { PopoverEditContent } from "@/components/ui/popover-edit-content"
import { Card, CardGrid, SectionTitle } from "./shared"

// 编辑字段数据
const demoEditFields = [
  { label: "姓名", type: "input" as const, defaultValue: "张三", placeholder: "请输入姓名" },
  { label: "用户名", type: "input" as const, defaultValue: "@zhangsan", placeholder: "请输入用户名" },
  { label: "邮箱", type: "input" as const, defaultValue: "zhangsan@example.com", placeholder: "请输入邮箱" },
]

// 菜单页面组件
function MenuPage() {
  const [checkboxItems, setCheckboxItems] = React.useState({
    option1: true,
    option2: false,
    option3: false,
  })
  const [radioValue, setRadioValue] = React.useState("option1")

  // 子菜单可编辑视图状态
  const [submenuEditBase, setSubmenuEditBase] = React.useState(false)
  const [submenuEditSm, setSubmenuEditSm] = React.useState(false)
  const [submenuEditLg, setSubmenuEditLg] = React.useState(false)

  return (
    <div>
      <SectionTitle title="基础菜单 Popover basic" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverMenuItem closeOnClick>选项一</PopoverMenuItem>
                  <PopoverMenuItem closeOnClick>选项二</PopoverMenuItem>
                  <PopoverMenuItem closeOnClick>选项三</PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm">
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项一
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项二
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick>
                    选项三
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=basic, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    打开菜单
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg">
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项一
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项二
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick>
                    选项三
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="带图标菜单 Popover icon" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem closeOnClick className="gap-2">
                    <svg className="size-4" style={{ fill: "currentColor" }}>
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem size="sm" closeOnClick className="gap-1">
                    <svg
                      className="size-[14px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=icon, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    更多操作
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-edit" />
                    </svg>
                    编辑
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-copy" />
                    </svg>
                    复制
                  </PopoverMenuItem>
                  <PopoverMenuItem size="lg" closeOnClick className="gap-2">
                    <svg
                      className="size-[18px]"
                      style={{ fill: "currentColor" }}
                    >
                      <use xlinkHref="#icon-delete" />
                    </svg>
                    删除
                  </PopoverMenuItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="多选菜单 Popover checkbox" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverCheckboxItem
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=checkbox, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    多选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示名称
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示图标
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option3}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option3: c })
                    }
                  >
                    显示描述
                  </PopoverCheckboxItem>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="单选菜单 Popover radio" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem value="option1">选项一</PopoverRadioItem>
                    <PopoverRadioItem value="option2">选项二</PopoverRadioItem>
                    <PopoverRadioItem value="option3">选项三</PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="sm" value="option1">
                      选项一
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option2">
                      选项二
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option3">
                      选项三
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=radio, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    单选选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="lg" value="option1">
                      选项一
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option2">
                      选项二
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option3">
                      选项三
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="子菜单 Popover submenu" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => open && setSubmenuEditBase(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditBase ? "hidden" : ""}>
                    <PopoverMenuItem onClick={() => setSubmenuEditBase(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger>更多操作</PopoverSubTrigger>
                      <PopoverSubContent>
                        <PopoverMenuItem closeOnClick>保存</PopoverMenuItem>
                        <PopoverMenuItem closeOnClick>另存为</PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem closeOnClick>导出</PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditBase ? "" : "hidden"}>
                    <PopoverEditContent size="base" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-2 py-1.5">
                      <Button variant="outline" size="base" className="flex-1">取消</Button>
                      <Button variant="primary" size="base" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => !open && setSubmenuEditSm(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditSm ? "hidden" : ""}>
                    <PopoverMenuItem size="sm" onClick={() => setSubmenuEditSm(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger size="sm">更多操作</PopoverSubTrigger>
                      <PopoverSubContent size="sm">
                        <PopoverMenuItem size="sm" closeOnClick>
                          保存
                        </PopoverMenuItem>
                        <PopoverMenuItem size="sm" closeOnClick>
                          另存为
                        </PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem size="sm" closeOnClick>
                          导出
                        </PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditSm ? "" : "hidden"}>
                    <PopoverEditContent size="sm" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-1.5 py-1.5">
                      <Button variant="outline" size="sm" className="flex-1">取消</Button>
                      <Button variant="primary" size="sm" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=submenu, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover onOpenChange={(open) => !open && setSubmenuEditLg(false)}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" noShift>
                    更多选项
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  {/* 菜单视图 */}
                  <div className={submenuEditLg ? "hidden" : ""}>
                    <PopoverMenuItem size="lg" onClick={() => setSubmenuEditLg(true)}>
                      选项一
                    </PopoverMenuItem>
                    <PopoverSub>
                      <PopoverSubTrigger size="lg">更多操作</PopoverSubTrigger>
                      <PopoverSubContent size="lg">
                        <PopoverMenuItem size="lg" closeOnClick>
                          保存
                        </PopoverMenuItem>
                        <PopoverMenuItem size="lg" closeOnClick>
                          另存为
                        </PopoverMenuItem>
                        <PopoverSeparator />
                        <PopoverMenuItem size="lg" closeOnClick>
                          导出
                        </PopoverMenuItem>
                      </PopoverSubContent>
                    </PopoverSub>
                  </div>
                  {/* 编辑视图 */}
                  <div className={submenuEditLg ? "" : "hidden"}>
                    <PopoverEditContent size="lg" fields={demoEditFields} />
                    <PopoverSeparator />
                    <div className="flex gap-2 px-3 py-1.5">
                      <Button variant="outline" size="lg" className="flex-1">取消</Button>
                      <Button variant="primary" size="lg" className="flex-1">保存</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="组合菜单 Popover combined" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=base"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[160px]">
                  <PopoverLabel>显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel>主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem value="option1">浅色</PopoverRadioItem>
                    <PopoverRadioItem value="option2">深色</PopoverRadioItem>
                    <PopoverRadioItem value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=sm"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[140px]">
                  <PopoverLabel size="sm">显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="sm"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel size="sm">主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="sm" value="option1">
                      浅色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option2">
                      深色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="sm" value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card
            label="Popover"
            copyText="component=Popover, variant=combined, size=lg"
          >
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    rightIcon="icon-chevron-down"
                    noShift
                  >
                    设置
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[180px]">
                  <PopoverLabel size="lg">显示设置</PopoverLabel>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option1}
                    onCheckedChange={(c: boolean) =>
                      setCheckboxItems({ ...checkboxItems, option1: c })
                    }
                  >
                    显示工具栏
                  </PopoverCheckboxItem>
                  <PopoverCheckboxItem
                    size="lg"
                    checked={checkboxItems.option2}
                    onCheckedChange={(c) =>
                      setCheckboxItems({ ...checkboxItems, option2: c })
                    }
                  >
                    显示状态栏
                  </PopoverCheckboxItem>
                  <PopoverSeparator />
                  <PopoverLabel size="lg">主题</PopoverLabel>
                  <PopoverRadioGroup
                    value={radioValue}
                    onValueChange={setRadioValue}
                  >
                    <PopoverRadioItem size="lg" value="option1">
                      浅色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option2">
                      深色
                    </PopoverRadioItem>
                    <PopoverRadioItem size="lg" value="option3">
                      跟随系统
                    </PopoverRadioItem>
                  </PopoverRadioGroup>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="可编辑菜单 Popover edit" />
      <section className="mb-16">
        <CardGrid cols={3}>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=base">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px]">
                  <PopoverEditContent fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-2 py-1.5">
                    <Button variant="outline" size="base" className="flex-1">取消</Button>
                    <Button variant="primary" size="base" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=sm">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="sm" className="w-[180px]">
                  <PopoverEditContent size="sm" fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-1.5 py-1.5">
                    <Button variant="outline" size="sm" className="flex-1">取消</Button>
                    <Button variant="primary" size="sm" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
          <Card label="Popover" copyText="component=Popover, variant=edit, size=lg">
            <div className="flex h-full items-center justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="lg" rightIcon="icon-chevron-down" noShift>
                    编辑资料
                  </Button>
                </PopoverTrigger>
                <PopoverContent size="lg" className="w-[220px]">
                  <PopoverEditContent size="lg" fields={demoEditFields} />
                  <PopoverSeparator />
                  <div className="flex gap-2 px-3 py-1.5">
                    <Button variant="outline" size="lg" className="flex-1">取消</Button>
                    <Button variant="primary" size="lg" className="flex-1">保存</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

export { MenuPage }