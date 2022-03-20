import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('button has correct initial color', () => {
  render(<App />);
  
  // find an element with a role of button and text of 'Chage to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue'});
  
  expect(colorButton).toHaveStyle({backgroundColor : 'MediumVioletRed'});

  // click button => functional test
  // fireEvent(colorButton, new MouseEvent('click', { bubbles: true, cancelable: true}));
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
  expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
});

test('initial conditions', () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue'});
  expect(colorButton).toBeEnabled()

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
})

test('if checkbox checked, button should be disabled', () => {
  
  render(<App />);

  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' });
  // checkbox의 option.name은 label의 textcontent를 의미한다. role에 따라 option.name이 의미하는 바가 다르다!
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});

  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})


test('disable 버튼 클릭시 이전 버튼 색깔이 gray로 변하고, 다시 클릭시 blue로 변한다.', () => {
  render(<App />)  ;
  const colorButton = screen.getByRole('button', {name: 'Change to Midnight Blue'});
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button'});
  
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'})

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: 'MidnightBlue'})
})

describe('spaces before camel-case capital letters', () => {

  test('대문자가 없다', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('대문자가 1개', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  })

  test('대문자가 여러개', ()=> {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  })
})