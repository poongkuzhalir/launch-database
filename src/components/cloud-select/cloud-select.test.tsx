import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CloudSelect from "./cloud-select";

describe("<CloudSelect />", () => {
  const props = {
    isMultiple: true,
    lists: ["aws", "azure", "google", "do", "upcloud"],
    labelName: "Cloud Provider",
    selectedValue: ["google"],
    handleChange: jest.fn(),
    selectLabelId: "cloud-provider-label",
  };

  it("Renders search dropdown", () => {
    render(<CloudSelect {...props} />);
    expect(screen.getByTestId("cloud-select")).toBeDefined();
  });

  it("Opens the dropdown menu on clicking the input", () => {
    render(<CloudSelect {...props} />);
    fireEvent.click(screen.getByTestId("cloud-select"));
    expect(screen.getByText(/google/)).toBeDefined();
  });
});
