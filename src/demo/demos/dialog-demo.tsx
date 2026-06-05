import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogField,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerField,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer"
import { Card, CardGrid, SectionTitle } from "./shared"

function DialogPage() {
  return (
    <div>
      <SectionTitle title="基础弹窗 Dialog" />
      <section className="mb-16">
        <CardGrid cols={2}>
          <Card label="Dialog" copyText="component=Dialog, size=base">
            <div className="flex h-full items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">打开弹窗</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>编辑资料</DialogTitle>
                    <DialogDescription>
                      在此修改您的个人资料，完成后点击保存。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <DialogField>
                      <label className="text-sm font-medium text-black-85">
                        姓名
                      </label>
                      <Input defaultValue="张三" />
                    </DialogField>
                    <DialogField>
                      <label className="text-sm font-medium text-black-85">
                        用户名
                      </label>
                      <Input defaultValue="@zhangsan" />
                    </DialogField>
                  </DialogBody>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">取消</Button>
                    </DialogClose>
                    <Button>保存</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
          <Card label="Dialog" copyText="component=Dialog, size=lg">
            <div className="flex h-full items-center justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg">
                    打开弹窗
                  </Button>
                </DialogTrigger>
                <DialogContent size="lg">
                  <DialogHeader size="lg">
                    <DialogTitle size="lg">编辑资料</DialogTitle>
                    <DialogDescription size="lg">
                      在此修改您的个人资料，完成后点击保存。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody size="lg">
                    <DialogField size="lg">
                      <label className="text-base font-medium text-black-85">
                        姓名
                      </label>
                      <Input size="lg" defaultValue="张三" />
                    </DialogField>
                    <DialogField size="lg">
                      <label className="text-base font-medium text-black-85">
                        用户名
                      </label>
                      <Input size="lg" defaultValue="@zhangsan" />
                    </DialogField>
                  </DialogBody>
                  <DialogFooter size="lg">
                    <DialogClose asChild>
                      <Button variant="outline" size="lg">
                        取消
                      </Button>
                    </DialogClose>
                    <Button size="lg">保存</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </CardGrid>
      </section>

      <SectionTitle title="抽屉 Drawer" />
      <section>
        <CardGrid cols={2}>
          <Card label="Drawer" copyText="component=Drawer, size=base">
            <div className="flex h-full items-center justify-center">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline">打开抽屉</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>编辑资料</DrawerTitle>
                    <DrawerDescription>
                      在此修改您的个人资料，完成后点击保存。
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody>
                    <DrawerField>
                      <label className="text-sm font-medium text-black-85">
                        姓名
                      </label>
                      <Input defaultValue="张三" />
                    </DrawerField>
                    <DrawerField>
                      <label className="text-sm font-medium text-black-85">
                        用户名
                      </label>
                      <Input defaultValue="@zhangsan" />
                    </DrawerField>
                  </DrawerBody>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline" className="flex-1">
                        取消
                      </Button>
                    </DrawerClose>
                    <Button className="flex-1">保存</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </Card>
          <Card label="Drawer" copyText="component=Drawer, size=lg">
            <div className="flex h-full items-center justify-center">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline" size="lg">
                    打开抽屉
                  </Button>
                </DrawerTrigger>
                <DrawerContent size="lg">
                  <DrawerHeader size="lg">
                    <DrawerTitle size="lg">编辑资料</DrawerTitle>
                    <DrawerDescription size="lg">
                      在此修改您的个人资料，完成后点击保存。
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerBody size="lg">
                    <DrawerField size="lg">
                      <label className="text-base font-medium text-black-85">
                        姓名
                      </label>
                      <Input size="lg" defaultValue="张三" />
                    </DrawerField>
                    <DrawerField size="lg">
                      <label className="text-base font-medium text-black-85">
                        用户名
                      </label>
                      <Input size="lg" defaultValue="@zhangsan" />
                    </DrawerField>
                  </DrawerBody>
                  <DrawerFooter size="lg">
                    <DrawerClose asChild>
                      <Button variant="outline" size="lg" className="flex-1">
                        取消
                      </Button>
                    </DrawerClose>
                    <Button size="lg" className="flex-1">
                      保存
                    </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </Card>
        </CardGrid>
      </section>
    </div>
  )
}

export { DialogPage }