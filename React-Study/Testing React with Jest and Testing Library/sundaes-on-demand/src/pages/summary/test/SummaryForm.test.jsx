import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

test("initial conditions", () => {
  // 체크박스 not checked
  render(<SummaryForm />);
  // order 버튼 disabled
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const orderButton = screen.getByRole("button", { name: /confirm order/i });
  expect(orderButton).toBeDisabled();
});

test("Checkbox enables button on first click and disables on second click", () => {
  // 체크박스 클릭시 order버튼 enabled
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const orderButton = screen.getByRole("button", { name: /confirm order/i });

  userEvent.click(checkbox);
  expect(orderButton).toBeEnabled();

  userEvent.click(checkbox);
  expect(orderButton).toBeDisabled();
});

test("popover respodes to hover", async () => {
  render(<SummaryForm />);
  const popoverRegexp = /No ice cream will actually be delivered/i;
  // 1. 최초 : popover hidden
  const nullPopover = screen.queryByText(popoverRegexp);
  // toBeNull -> notToBeInTheDocument
  expect(nullPopover).not.toBeInTheDocument();

  // 2. hover upon checkbox label : popover appears
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(popoverRegexp);
  // 이부분은 getByText에서 검증되는 부분이지만, 테스트 코드의 가독성(무엇을 테스트하는지)을 위해 작성하는게 좋다.
  expect(popover).toBeInTheDocument();

  // 3. unhover checkbox label : popover disappears
  userEvent.unhover(termsAndConditions);

  // popover가 비동기로 사라진다. -> 테스트는 이미 끝났다 -> testing library가 화를 낸다.
  // const nullPopoverAgain = screen.queryByText(popoverRegexp);
  // expect(screen.queryByText(popoverRegexp)).not.toBeInTheDocument();

  // async/await를 이용해
  await waitForElementToBeRemoved(() => screen.queryByText(popoverRegexp));
});
