import { render } from "@testing-library/react";
import OrderDetailsProvider from "../context/OrderDetails";

const custumRender = (ui, options) =>
  render(ui, { wrapper: OrderDetailsProvider, ...options });

// re-export everything
export * from "@testing-library/react";
// overrides render
export { custumRender as render };
