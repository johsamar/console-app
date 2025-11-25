import { Meta, StoryObj } from "@storybook/react";
import { PageSection } from "./PageSection";

const meta: Meta<typeof PageSection> = {
  title: "Patterns/PageSection",
  component: PageSection,
};
export default meta;

type Story = StoryObj<typeof PageSection>;

export const Default: Story = {
  render: () => (
    <PageSection>
      <p>This is a section inside the page.</p>
    </PageSection>
  ),
};
