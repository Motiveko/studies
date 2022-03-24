import { render, screen } from "@testing-library/react";
import * as orderDetails from "../../../context/OrderDetails";

import OrderSummary from "../OrderSummary";

// jest.mock("../../../context/OrderDetails", () => ({
//   useOrderDetails: () => [{scoops, toppings, totals}];
// }));
test("심플 테스트", () => {
  const { scoops, toppings, totals } = {
    scoops: new Map().set("vanilla", 1),
    toppings: new Map(),
    totals: {
      scoops: "$2.00",
      toppings: "$0.00",
      grandTotal: "$2.00",
    },
  };

  jest
    .spyOn(orderDetails, "useOrderDetails")
    .mockImplementation(() => [{ scoops, toppings, totals }]);

  render(<OrderSummary />);

  const toppingsHeading = screen.queryByRole("heading", {
    name: /Toppings: /i,
  });
  expect(toppingsHeading).not.toBeInTheDocument();
  const toppingList = screen.queryByRole("list", { name: "topping-list" });
  expect(toppingList).not.toBeInTheDocument();
});
