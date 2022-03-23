import { screen, render } from "../../../test-utils/testing-library-util";
import userEvent from "@testing-library/user-event";
import Options from "../Options";

test("scoop의 subtotal 업데이트 테스트", async () => {
  render(<Options optionType="scoops" />);

  // subtotal의 초기값은 $0.00
  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  // vanilla scoop 선택시 subtotal update
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  // chocolate scoop 선택시 subtotal update
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});
