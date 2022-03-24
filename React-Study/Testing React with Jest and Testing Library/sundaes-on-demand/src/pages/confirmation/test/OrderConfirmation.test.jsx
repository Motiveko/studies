import { render, screen } from "../../../test-utils/testing-library-util";
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
