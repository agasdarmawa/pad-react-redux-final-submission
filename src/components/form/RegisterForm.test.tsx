import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';

/**
 * scenario testing
 *
 * - RegisterForm component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when form is submitted
 *   - should toggle password visibility
 */

describe('RegisterForm', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    render(<RegisterForm onRegister={vi.fn()} />);
    const nameInput = screen.getByPlaceholderText(
      /masukkan nama/i
    ) as HTMLInputElement;

    await userEvent.type(nameInput, 'John Doe', { delay: 0 });
    expect(nameInput.value).toBe('John Doe');
  });

  it('should handle email typing correctly', async () => {
    render(<RegisterForm onRegister={vi.fn()} />);
    const emailInput = screen.getByPlaceholderText(
      /masukkan email/i
    ) as HTMLInputElement;

    await userEvent.type(emailInput, 'john@example.com');
    expect(emailInput.value).toBe('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<RegisterForm onRegister={vi.fn()} />);
    const passwordInput = screen.getByPlaceholderText(
      /masukkan password/i
    ) as HTMLInputElement;

    await userEvent.type(passwordInput, 'secret123');
    expect(passwordInput.value).toBe('secret123');
  });

  it('should call register function when form is submitted', async () => {
    const mockOnRegister = vi.fn();
    render(<RegisterForm onRegister={mockOnRegister} />);

    const nameInput = screen.getByPlaceholderText(/masukkan nama/i);
    const emailInput = screen.getByPlaceholderText(/masukkan email/i);
    const passwordInput = screen.getByPlaceholderText(/masukkan password/i);
    const form = screen.getByTestId('register-form');

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(passwordInput, 'secret123');

    fireEvent.submit(form);

    expect(mockOnRegister).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'secret123',
    });
  });

  it('should toggle password visibility', async () => {
    render(<RegisterForm onRegister={vi.fn()} />);
    const passwordInput = screen.getByPlaceholderText(
      /masukkan password/i
    ) as HTMLInputElement;

    expect(passwordInput).toHaveAttribute('type', 'password');

    const toggleIcon = screen.getByRole('button', {
      name: /toggle password visibility/i,
    });

    await userEvent.click(toggleIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });
});
