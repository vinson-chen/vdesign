import { DataTable } from "@/components/ui/data-table"
import { SectionTitle } from "./shared"

// 表格 table 页面组件
function TablePage() {
  // 生成表格数据：1行5列（checkbox + 文本列 + 数字列 + 选择列 + 链接列 + 附件列）
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "col_text", type: "text" as const, title: "文本列", width: 200 },
      { id: "col_number", type: "number" as const, title: "数字列", width: 200 },
      { id: "col_select", type: "select" as const, title: "选择列", width: 200, options: { items: [] } },
      { id: "col_button", type: "link" as const, title: "链接列", width: 200 },
      { id: "col_attachment", type: "attachment" as const, title: "附件列", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c_text", value: "" },
        { id: "r1c_number", value: "" },
        { id: "r1c_select", value: "" },
        { id: "r1c_button", value: "" },
        { id: "r1c_attachment", value: "" },
      ]},
    ],
  }

  return (
    <div className="flex flex-col min-h-0 max-h-[calc(100vh-64px)]">
      <SectionTitle title="表格 Table" />
      <DataTable data={tableData} variant="base" contained />
    </div>
  )
}

export { TablePage }