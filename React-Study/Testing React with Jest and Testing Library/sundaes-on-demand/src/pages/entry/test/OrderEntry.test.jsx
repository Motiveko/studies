import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-util";
import OrderEntry from "../OrderEntry";

import { rest } from "msw";
import { server } from "../../../mocks/server";
import userEvent from "@testing-library/user-event";

test("주문하기 버튼은 scoop을 추가해야 enabled 상태로 변한다.", async () => {
  render(<OrderEntry />);

  // 초기상태
  const orderButton = screen.getByRole("button", { name: "Order Sundae!" });
  expect(orderButton).toBeDisabled();

  // 토핑만 추가
  const cherriesToppingInput = await screen.findByRole("checkbox", {
    name: /Cherries/i,
  });
  userEvent.click(cherriesToppingInput);
  expect(orderButton).toBeDisabled();

  // scoop 추가 -> enabled
  const vanillaScoopInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.type(vanillaScoopInput, "1");
  expect(orderButton).toBeEnabled();
});

test("handles error for scoops and toppings routes", async () => {
  // 기본 설정한 서버를 에러를 던지도록 reset
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry handleNext={jest.fn()} />);

  await waitFor(
    async () => {
      const alerts = await screen.findAllByRole("alert", {
        name: "An unexpected error occureed. Please try again later",
      });
      expect(alerts).toHaveLength(2);
    },
    { timeout: 100 }
  );
});
