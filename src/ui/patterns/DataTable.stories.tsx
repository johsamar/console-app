import { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const BasicTable: Story = {
  args: {
    columns: [
      { key: "title", label: "Title" },
      { key: "year", label: "Year" },
    ],
    data: [
      { title: "Inception", year: 2010 },
      { title: "The Matrix", year: 1999 },
    ],
    page: 1,
    pageSize: 10,
  },
};
