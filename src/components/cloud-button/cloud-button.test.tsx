import { fireEvent, render, screen } from "@testing-library/react";
import CloudButton from "./cloud-button";

describe("<CloudButton />", () => {
  it("Renders the component", () => {
    render(
      <CloudButton text="Reset filters" handleChange={() => null}></CloudButton>
    );
    expect(screen.getByTestId("cloud-button")).toBeDefined();
  });

  it("Calls onClick prop when clicked", () => {
    const action = jest.fn();

    render(
      <CloudButton text="Reset filters" handleChange={action}></CloudButton>
    );
    expect(action).toHaveBeenCalledTimes(0);
    fireEvent.click(screen.getByTestId("cloud-button"));
    expect(action).toHaveBeenCalledTimes(1);
  });
});
