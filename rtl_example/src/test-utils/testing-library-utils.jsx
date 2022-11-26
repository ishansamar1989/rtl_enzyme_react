import { render } from "@testing-library/react";
import { OrderDetailsProvider } from "../context/OrderDetails";
const renderWithContext = (ui, options) =>
  render(ui, {
    wrapper: OrderDetailsProvider,
    ...options,
  });
//re-export everything because u  may want other methods like screen to be used
export * from "@testing-library/react";
//override render with renderWithContext
export { renderWithContext as render };
