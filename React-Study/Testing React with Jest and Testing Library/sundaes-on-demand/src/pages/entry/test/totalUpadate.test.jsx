import {
  screen,
  render,
  waitFor,
} from "../../../test-utils/testing-library-util";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

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

test("topping의 subtotal 업데이트 테스트", async () => {
  render(<Options optionType="toppings" />);

  // subtotal : 0

  const toppginsSubtotal = await screen.findByText("Toppings total: $", {
    exact: false,
  });
  expect(toppginsSubtotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  const MnMsInput = screen.getByRole("checkbox", { name: /M&Ms/i });
  const hotFudgesInput = screen.getByRole("checkbox", {
    name: /Hot fudge/i,
  });

  userEvent.clear(cherriesInput);
  userEvent.clear(MnMsInput);
  userEvent.clear(hotFudgesInput);

  // 체크박스 한개씩 클릭할 때마다 subtotal 1.50달러씩 증가
  userEvent.click(cherriesInput);
  expect(toppginsSubtotal).toHaveTextContent("$1.50");
  userEvent.click(MnMsInput);
  expect(toppginsSubtotal).toHaveTextContent("$3.00");
  userEvent.click(hotFudgesInput);
  expect(toppginsSubtotal).toHaveTextContent("$4.50");

  // 체크박스 한개 체크해제하면 subtotal 1.50달러 감소
  userEvent.click(hotFudgesInput);
  expect(toppginsSubtotal).toHaveTextContent("$3.00");
});

describe.only("grand total update 테스트", () => {
  test("scoop 선택시 grand total도 업데이트 된다.", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total:/i,
    });
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");
  });
  test("topping 선택시 grand total도 업데이트 된다.", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total:/i });

    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesInput);

    expect(grandTotal).toHaveTextContent("1.50");
  });
  test("item 없어지면 grand total도 업데이트 될것이다", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /Grand total:/i,
    });
    const cherriesInput = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesInput);
    userEvent.click(cherriesInput);
    expect(grandTotal).toHaveTextContent("0.00");
  });
});
