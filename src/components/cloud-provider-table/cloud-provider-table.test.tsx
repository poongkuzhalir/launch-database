import { render, screen } from "@testing-library/react";
import { cloudProviderMock } from "../../mocks/cloud-provider";
import CloudProviderTable from "./cloud-provider-table";

describe("test CloudProviderTable", () => {
  const props = {
    listsToShow: cloudProviderMock,
    radius: 500000,
  };

  it("renders cloud provider table", () => {
    render(<CloudProviderTable {...props} />);
    const table = screen.getByTestId("cloud-provider-table");
    expect(table).toHaveTextContent("aws-af-south-1");
  });
});
