import { PageHeader } from "./PageHeader";
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PageHeader> = {
  title: "Patterns/PageHeader",
  component: PageHeader,
};
export default meta;

type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {
  args: {
    title: "Movies",
    description: "Browse movies in the system",
  },
};
