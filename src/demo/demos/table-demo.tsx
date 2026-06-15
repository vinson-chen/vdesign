import { DataTable } from "@/components/ui/data-table"
import { SectionTitle, DemoTableWrapper } from "./shared"

// 表格 table 页面组件
function TablePage() {
  // 生成表格数据：1行2列数据列（checkbox + 列1 + 列2）
  const tableData = {
    columns: [
      { id: "checkbox", type: "checkbox" as const, width: 40 },
      { id: "col1", type: "text" as const, title: "列1", width: 200 },
      { id: "col2", type: "text" as const, title: "列2", width: 200 },
    ],
    rows: [
      { id: "row1", cells: [
        { id: "cb1", value: false },
        { id: "r1c1", value: "" },
        { id: "r1c2", value: "" },
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