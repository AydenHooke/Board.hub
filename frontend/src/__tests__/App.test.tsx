import React from 'react';
import { render } from '@testing-library/react';
import SignInLogic from '../Components/SignIn/SignInLogic';
import { AccountProvider } from '../Context/AccountContext';
import { MemoryRouter } from 'react-router-dom';

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