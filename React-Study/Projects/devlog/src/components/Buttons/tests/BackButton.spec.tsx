import React from 'react';
import { render, screen, waitFor } from "@testing-library/react";
import * as Router from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import BackButton from '../BackButton';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({ useNavigate: () => mockUseNavigate }));

test('backbutton 누르면 뒤로가기 호출된다.', () => {
  expect(1).toBe(1);

  render(<BackButton variant="primary">안뇽</BackButton>);

  const backButton = screen.queryByRole('button', { name: '안뇽' });
  expect(backButton).toBeInTheDocument();
  userEvent.click(backButton as HTMLButtonElement)

  expect(mockUseNavigate).toHaveBeenCalledTimes(1);
  expect(mockUseNavigate).toHaveBeenCalledWith(-1);
});
