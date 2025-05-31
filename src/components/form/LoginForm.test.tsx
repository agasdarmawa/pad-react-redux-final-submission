import { describe, it, expect, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';

/**
 * scenario testing
 *
 * - LoginForm component
 *   - should handle username typing correctly
 *   - should handle password typing correctly
 *   - should call login function when form is submitted
 *   - should toggle password visibility
 */

describe('LoginForm', () => {
  afterEach(() => {
    cleanup(); // optional but safe
  });

  it('should handle username typing correctly', async () => {
    render(<LoginForm onLogin={vi.fn()} />);
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;

    await userEvent.type(emailInput, 'test@example.com', { delay: 0 });

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginForm onLogin={vi.fn()} />);
    const passwordInput = screen.getByPlaceholderText(
      'Password'
    ) as HTMLInputElement;

    await userEvent.type(passwordInput, 'password123');

    expect(passwordInput.value).toBe('password123');
  });

  it('should call login function when form is submitted', async () => {
    const mockOnLogin = vi.fn();
    render(<LoginForm onLogin={mockOnLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const form = screen.getByTestId('login-form');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');

    fireEvent.submit(form);

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

  it('toggles password visibility', async () => {
    render(<LoginForm onLogin={vi.fn()} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Should initially be password type
    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleIcon = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });

    await userEvent.click(toggleIcon);

    // Should be text now
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
