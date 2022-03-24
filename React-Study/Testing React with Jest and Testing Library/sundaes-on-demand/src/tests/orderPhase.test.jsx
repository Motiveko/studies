import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { click } from "@testing-library/user-event/dist/click";

import App from "../App";

test("order phase for happy path(끝까지 잘 가는 테스트)", async () => {
  render(<App />);

  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  const cherriesToppingInput = await screen.findByRole("checkbox", {
    name: /Cherries/,
  });

  // 1. [OrderEntry] add icecream, topping, then click order button
  userEvent.type(vanillaScoopInput, "1");
  userEvent.click(cherriesToppingInput);
  let orderButton = screen.getByRole("button", { name: /Order Sundae!/i });
  userEvent.click(orderButton);

  // 2. [OrderSummary] check summary based on order and accept term and click order button
  orderButton = screen.queryByRole("button", { name: "Order Sundae!" });
  expect(orderButton).not.toBeInTheDocument();

  const orderListItems = screen.getAllByRole("listitem");
  expect(orderListItems.map((element) => element.textContent)).toEqual([
    "1 Vanilla",
    "Cherries",
  ]);

  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(confirmOrderButton);

  // 3. [Confirmation] order number on confirmation page/ "new order" button to 1. [OrderEntry]
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();
  const thankyou = await screen.findByRole("heading", { name: "Thank you!" });
  const orderNumber = await screen.findByText(/order number is/i);
  expect(thankyou).toBeInTheDocument();
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole("button", { name: "new order" });
  userEvent.click(newOrderButton);

  // 4. [OrderEntry] check order entry has been reset
  await waitFor(async () => {
    const toppings = await screen.findAllByRole("checkbox");
    expect(toppings).toHaveLength(3);
    toppings.forEach((topping) => expect(topping).not.toBeChecked());
  });

  await waitFor(async () => {
    const scoops = await screen.findAllByRole("spinbutton");
    expect(scoops).toHaveLength(2);
    scoops.forEach((scoop) => expect(scoop.value).toBe("0"));
  });

  const scoopsTotal = screen.getByText(/Scoops total:/i);
  expect(scoopsTotal).toHaveTextContent("$0.00");
  const toppingsTotal = screen.getByText(/Toppings total:/i);
  expect(toppingsTotal).toHaveTextContent("$0.00");
  const grandTotal = screen.getByRole("heading", { name: /Grand total:/ });
  expect(grandTotal).toHaveTextContent("$0.00");
});
