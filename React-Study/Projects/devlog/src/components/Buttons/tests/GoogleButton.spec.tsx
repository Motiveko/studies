import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import GoogleButton from "../GoogleButton"

test('구글 버튼 클릭시 onClick 핸들러를 호출한다', () => {
  const mockGoogleAuthHandler = jest.fn();  
  render(<GoogleButton onClick={mockGoogleAuthHandler}>구글계정으로 시작하기</GoogleButton>)

  const button = screen.getByRole('button', { name: /구글계정으로 시작하기/});
  expect(button).toBeInTheDocument();

  const image = screen.getByRole('img', {name: 'google icon'});
  expect(image).toBeInTheDocument();

  userEvent.click(button);
  expect(mockGoogleAuthHandler).toHaveBeenCalledTimes(1);
})