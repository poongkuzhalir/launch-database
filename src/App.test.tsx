import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./store";

test("renders react app", () => {
  render(<App store={store} />);
});
