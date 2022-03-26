import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LinkButton from "../LinkButton"


test('Link 버튼 랜더링시 href 속성에 to props 값을 가지는 anchor 태그가 랜더링 된다.', () => {
  const to = '/to/to'
  render(
    <BrowserRouter>
      <LinkButton to={to} variant="dark" >링크</LinkButton>
    </BrowserRouter>
  );
  const anchor = screen.getByRole('link', { name: /링크/ });
  expect(anchor).toHaveAttribute('href', to)
})