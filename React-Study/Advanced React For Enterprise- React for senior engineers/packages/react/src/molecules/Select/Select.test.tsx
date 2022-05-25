import React from "react";
import Select from "./Select";

import {
  screen,
  render,
  fireEvent,
  getAllByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const options = [
  {
    label: "Strict Black",
    value: "strict-black",
  },
  {
    label: "Heavenly Green",
    value: "heavenly-green",
  },
  {
    label: "Sweet Pink",
    value: "pink",
  },
];

test("renders all options passed to it", () => {
  const { getAllByRole, getByTestId } = render(<Select options={options} />);

  const button = getByTestId("DseSelectButton");
  userEvent.click(button);

  expect(getAllByRole("menuitemradio")).toHaveLength(options.length);
});

test("renders options using custom renderOption method if passed as prop", () => {
  // TODO : 테스트

  render(
    <Select
      options={options}
      renderOption={({ option, getOptionRecommendedProps }) => (
        <li {...getOptionRecommendedProps({ "data-testid": "optionTest" })}>
          {option.label}
        </li>
      )}
    />
  );

  const button = screen.getByTestId("DseSelectButton");
  userEvent.click(button);

  expect(screen.getAllByTestId("optionTest")).toEqual(
    screen.getAllByRole("menuitemradio")
  );
});

test("calls the onOptionSelected prop with the selected option and its index if passed", async () => {
  const mockOnOptionSelected = jest.fn();
  render(<Select options={options} onOptionSelected={mockOnOptionSelected} />);
  const button = screen.getByTestId("DseSelectButton");

  // when option 을 전부다 한번씩 눌러본다.
  let index = 0;
  while (index < options.length) {
    userEvent.click(button);
    const option = await screen.getAllByRole("menuitemradio")[index];
    userEvent.click(option);
    index++;
  }

  // then
  const mockOnOptionSelectedArgs = options.map((option, i) => [option, i]);
  expect(mockOnOptionSelected.mock.calls).toEqual(mockOnOptionSelectedArgs);
});

test("the button label changes to the selected option label", () => {
  // TODO : 과제
  render(<Select options={options} />);

  const button = screen.getByTestId("DseSelectButton");

  userEvent.click(button);

  const selectedLabel = options[0].label;
  const option = screen.getByLabelText(selectedLabel);
  userEvent.click(option);

  // then
  expect(button).toHaveTextContent(selectedLabel);
});

test("snapshot of the selected option state", () => {
  const { getAllByRole, getByTestId, asFragment } = render(
    <Select options={options} />
  );

  const button = getByTestId("DseSelectButton");
  userEvent.click(button);
  userEvent.click(getAllByRole("menuitemradio")[0]);

  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of the base state", () => {
  const { asFragment } = render(<Select options={options} />);

  expect(asFragment()).toMatchSnapshot();
});

test("snapshot of the options menu open state", () => {
  const { asFragment } = render(<Select options={options} />);

  const button = screen.getByTestId("DseSelectButton");
  userEvent.click(button);

  expect(asFragment()).toMatchSnapshot();
});

test("can customize select label", () => {
  const customLabel = "CUSTOM LABEL";
  render(<Select options={options} label={customLabel} />);

  expect(screen.getByText(/CUSTOM LABEL/)).toBeInTheDocument();
});
