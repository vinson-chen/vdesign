import { DataTable } from "@/components/ui/data-table"
import { SectionTitle, DemoTableWrapper } from "./shared"

// 表格 table 页面组件
function TablePage() {
  // 生成表格数据：1行4列（checkbox + 文本列 + 单选列 + 按钮列 + 附件列）
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "col1", type: "text" as const, title: "文本列", width: 200 },
      { id: "col2", type: "select" as const, title: "单选列", width: 200, options: { items: [] } },
      { id: "col3", type: "button" as const, title: "按钮列", width: 200 },
      { id: "col4", type: "attachment" as const, title: "附件列", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c1", value: "" },
        { id: "r1c2", value: "" },
        { id: "r1c3", value: "" },
        { id: "r1c4", value: "" },
      ]},
    ],
  }

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="表格 Table" />
      <DemoTableWrapper>
        <DataTable data={tableData} variant="plain" />
      </DemoTableWrapper>
    </div>
  )
}

export { TablePage }