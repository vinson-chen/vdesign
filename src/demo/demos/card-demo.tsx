import { Card, CardGrid, SectionTitle } from "./shared"

// 卡片页面组件
export function CardPage() {
  return (
    <div>
      <SectionTitle title="卡片" />
      <section className="mb-16">
        <CardGrid cols={1}>
          <Card name="c-1" />
        </CardGrid>
      </section>

      <section className="mb-16">
        <CardGrid cols={2}>
          <Card name="c-2" />
          <Card name="c-2" />
        </CardGrid>
      </section>

      <section className="mb-16">
        <CardGrid cols={3}>
          <Card name="c-3" />
          <Card name="c-3" />
          <Card name="c-3" />
        </CardGrid>
      </section>

      <section>
        <CardGrid cols={6}>
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
          <Card name="c-6" />
        </CardGrid>
      </section>
    </div>
  )
}