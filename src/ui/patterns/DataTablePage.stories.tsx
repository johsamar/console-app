import { Meta, StoryObj } from "@storybook/react";
import { DataTablePage } from "./DataTablePage";
import { DataTable } from "../components/DataTable";

const meta: Meta<typeof DataTablePage> = {
  title: "Patterns/DataTablePage",
  component: DataTablePage,
};
export default meta;

type Story = StoryObj<typeof DataTablePage>;

export const WithTable: Story = {
  render: () => (
    <DataTablePage
      title="Movies"
      description="Browse movies"
      table={
        <DataTable
          columns={[
            { key: "title", label: "Title" },
            { key: "year", label: "Year" },
          ]}
          data={[
            { title: "Avatar", year: 2009 },
            { title: "Interstellar", year: 2014 },
          ]}
          page={1}
          pageSize={10}
        />
      }
    />
  ),
};
