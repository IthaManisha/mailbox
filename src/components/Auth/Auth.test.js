import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth'; // Update the import path

import AuthForm from './AuthForm';

// Mock useDispatch
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('AuthForm Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

  test('renders correctly', async () => {
    const { getByText } = render(<AuthForm />);
    
    // Use waitFor to handle asynchronous rendering
    await waitFor(() => {
      // eslint-disable-next-line testing-library/prefer-screen-queries
      expect(getByText('Login')).toBeInTheDocument();
    });
  });
  

  test('can switch between Login and Sign Up', () => {
    const { getByText } = render(<AuthForm />);
    
    // Click the switch button
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('Create new account'));
    
    // Now, it should show "Login with existing account"
    // eslint-disable-next-line testing-library/prefer-screen-queries
    expect(getByText('Login with existing account')).toBeInTheDocument();
  });

  test('dispatches login action on form submission', async () => {
    const mockedDispatch = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);

    const { getByLabelText, getByText } = render(<AuthForm />);

    // Set email and password inputs
    fireEvent.change(getByLabelText('Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Your Password'), { target: { value: 'testpassword' } });

    // Mock fetch response for successful authentication
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({
        idToken: 'testToken',
        email: 'test@example.com',
      }),
    });

    // Submit the form
    fireEvent.click(getByText('Login'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      expect(mockedDispatch).toHaveBeenCalledWith(
        login({ token: 'testToken', email: 'test@example.com' })
      );
    });
  });

  test('displays error message on failed authentication', async () => {
    const { getByLabelText, getByText } = render(<AuthForm />);

    // Set email and password inputs
    fireEvent.change(getByLabelText('Your Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Your Password'), { target: { value: 'testpassword' } });

    // Mock fetch response for failed authentication
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({
        error: {
          message: 'Authentication failed',
        },
      }),
    });

    // Submit the form
    fireEvent.click(getByText('Login'));

    // Wait for the asynchronous operations to complete
    await waitFor(() => {
      expect(getByText('Authentication Failed')).toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
