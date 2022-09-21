import { fireEvent, render, screen } from "@testing-library/react";
import CloudSelect from "./cloud-select";

describe("<CloudSelect />", () => {
  const props = {
    isMultiple: true,
    lists: ["aws", "azure", "google", "do", "upcloud"],
    labelName: "Cloud Provider",
    selectedValue: ["google"],
    handleChange: () => null,
    selectLabelId: "cloud-provider-label",
  };

  it("Renders search dropdown", () => {
    render(<CloudSelect {...props} />);
    expect(screen.getByTestId("cloud-select")).toBeDefined();
  });

  it("Opens the dropdown menu on clicking the input", () => {
    const action = jest.fn();
    render(<CloudSelect {...props} />);
    fireEvent.click(screen.getByTestId("cloud-select"));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it("Calls the onSelectHandler on selection of a value", () => {
    render(<CloudSelect {...props} />);
    fireEvent.click(screen.getByTestId("cloud-select"));
    fireEvent.click(screen.getByText(new RegExp(props.lists[0])));

    expect(props.handleChange).toHaveBeenCalledTimes(1);
  });
});
