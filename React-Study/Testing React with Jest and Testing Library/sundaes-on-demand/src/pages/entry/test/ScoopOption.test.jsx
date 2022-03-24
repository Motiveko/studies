import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ScoopOtion from "../ScoopOption";

test("올바르지 않은 값을 입력하면 form이 invalid상태가 된다.", () => {
  render(
    <ScoopOtion name="testscoop" imagePath="" updateItemCount={jest.fn()} />
  );

  const testScoopInput = screen.getByRole("spinbutton", { name: /testscoop/i });
  // 음수
  userEvent.type(testScoopInput, "-1");
  expect(testScoopInput).toHaveClass("is-invalid");

  // 올바른 값
  userEvent.type(testScoopInput, "1");
  expect(testScoopInput).not.toHaveClass("is-invalid");

  // 10 초과인 수
  userEvent.type(testScoopInput, "11");
  expect(testScoopInput).toHaveClass("is-invalid");

  // 자연수가 아닌 수
  userEvent.type(testScoopInput, "9.3");
  expect(testScoopInput).toHaveClass("is-invalid");
});

test("올바르지 않은 scoop값 입력시 scoop total은 업데이트 되지 않아야 한다.", () => {
  const mockUpdateItemCount = jest.fn();
  render(
    <ScoopOtion
      name="testscoop"
      imagePath=""
      updateItemCount={mockUpdateItemCount}
    />
  );
  const testScoopInput = screen.getByRole("spinbutton", { name: /testscoop/i });
  expect(mockUpdateItemCount).not.toHaveBeenCalled();

  // 올바른 값 입력 -> update 호출
  userEvent.type(testScoopInput, "1");
  expect(mockUpdateItemCount).toHaveBeenCalledTimes(1);

  // 올바르지 않은 값 입력 -> update 호출하지 않는다(횟수 그대로)
  userEvent.type(testScoopInput, "-1");
  expect(mockUpdateItemCount).toHaveBeenCalledTimes(1);
});
