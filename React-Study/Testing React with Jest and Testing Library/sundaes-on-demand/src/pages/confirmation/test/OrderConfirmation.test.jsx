import { rest } from "msw";
import { server } from "../../../mocks/server";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-util";
import OrderConfirmation from "../OrderConfirmation";
test("서버에서 order API 응답 오기 전까지 loading이 표시된다.", async () => {
  render(<OrderConfirmation />);

  let loading = screen.getByText(/loading../i);
  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole("heading", {
    name: /Thank you/,
  });
  expect(thankYouHeader).toBeInTheDocument();

  loading = screen.queryByText(/loading../i);
  expect(loading).not.toBeInTheDocument();
});

test("order API 에러 응답시 alert이 랜더링된다.", async () => {
  server.resetHandlers([
    rest.post("http://localhost:3030/orders", (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  ]);
  render(<OrderConfirmation handleNext={jest.fn()} />);

  await waitFor(() => {
    const thankYouHeader = screen.queryByRole("heading", {
      name: /Thank you/i,
    });
    expect(thankYouHeader).not.toBeInTheDocument();
    const alerts = screen.getByRole("alert", {
      name: "An unexpected error occureed. Please try again later",
    });
  });
});
