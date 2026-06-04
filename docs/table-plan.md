# 表格 Table 基建规划

目标是把当前的 Table/Row/Cell 零件推进到类似飞书多维表格的基础能力：字段驱动、记录驱动、视图驱动，同时保持组件库轻量、专业、规范化。

## 1. 数据模型层

- `Field`：定义字段的 `key/name/type/width/options/readonly`，先覆盖 `text/select/number/date/checkbox`。
- `Record`：使用稳定 `id` 承载行数据，单元格值按字段 key 读取。
- `View`：保存筛选、排序、隐藏字段、字段顺序，先从本地状态开始，后续可接入服务端。
- `Selection`：独立维护选中行、聚焦单元格、编辑中单元格，避免把 UI 状态写进记录数据。

## 2. 组件层

- `Table`：负责表格容器、边框、圆角、滚动承载，已用 CVA 暴露 `variant/radius`。
- `TableRow`：负责行状态，后续补充 hover、selected、active 等视觉变体。
- `Cell`：负责单元格基础尺寸、对齐、状态，后续按字段类型组合编辑器。
- `FieldHeaderCell`：建议作为下一步新增组件，承载字段类型图标、字段名、列宽拖拽、字段菜单。
- `EditableCell`：保留轻量文本编辑能力；多字段编辑建议逐步拆为 `TextCell/SelectCell/DateCell/CheckboxCell`。

## 3. 交互层

- 第一阶段：本地增删行、编辑单元格、行选择、视图切换、列宽调整。
- 第二阶段：排序、筛选、字段隐藏、字段重排、批量操作。
- 第三阶段：键盘导航、复制粘贴、区域选择、撤销重做、虚拟滚动。
- 第四阶段：协同编辑、服务端分页、权限、公式/关联/查找字段。

## 4. Demo 验收标准

- 示例区展示真实表格工作流，而不是只展示静态 Cell。
- 用户可以切换视图、新增记录、勾选行、直接编辑文本/数字/日期/选项/布尔字段。
- 示例必须复用现有 Button/Checkbox/Table/Row/Cell，不用原生元素模拟已有组件行为。
