import { Page } from "./Page";
import { PageHeader } from "./PageHeader";
import { PageSection } from "./PageSection";

export function DataTablePage({ title, description, table }: { title: string; description?: string; table: React.ReactNode }) {
  return (
    <Page>
      <PageHeader title={title} description={description} />
      <PageSection>{table}</PageSection>
    </Page>
  );
}
