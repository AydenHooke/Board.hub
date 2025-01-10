import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import SignInLogic from '../Components/SignIn/SignInLogic';
import { AccountProvider } from '../Context/AccountContext';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import ProfileLogic from '../Components/Profile/ProfileLogic';
import '@testing-library/jest-dom'

jest.mock('axios');

test('demo', () => {
  expect(true).toBe(true);
});

test('Render SignInLogic', () => {
  const { container } = render(
    <MemoryRouter>
      <AccountProvider>
        <SignInLogic />
      </AccountProvider>
    </MemoryRouter>
  );
  expect(container).toBeTruthy();
});

describe('ProfileLogic', () => {
  test('handleProfileEdit updates state and shows success message', async () => {
    const mockResponse = {
      data: {
        email: 'newemail@example.com',
        username: 'newusername',
        accountId: '12345',
      },
      headers: {
        'Authorization': 'newToken'
      }
    };

    (axios.patch as jest.Mock).mockResolvedValue(mockResponse);

    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <AccountProvider>
          <ProfileLogic />
        </AccountProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText(/email/i), { target: { value: 'newemail@example.com' } });
    fireEvent.change(getByLabelText(/^Username:$/i), { target: { value: 'newusername' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'newpassword' } });
    fireEvent.change(getByLabelText(/bgg username/i), { target: { value: 'newbggusername' } });

    fireEvent.click(getByText(/save changes/i));

    await waitFor(() => {
      expect(getByText(/success/i)).toBeInTheDocument();
    });

    expect(axios.patch).toHaveBeenCalledWith(
      'http://18.224.45.201:8080/account/',
      {
        accountId: '',
        email: 'newemail@example.com',
        username: 'newusername',
        passwordHash: 'newpassword',
        bggAccount: 'newbggusername'
      },
      {
        headers: {
          'Authorization': ''
        }
      }
    );
  });
});


