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
    expect(screen.getByTestId("cloud-provider-table")).toHaveLength(1);
    expect(screen.getByTestId("cloud-provider-row")).toHaveLength(10);
  });
});
