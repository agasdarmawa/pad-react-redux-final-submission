import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInput } from '@/hooks/useInput';
import { Register } from '@/types/auth';
import { useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';

interface Props {
  onRegister: ({ name, email, password }: Register) => void;
}

function RegisterForm({ onRegister }: Props) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onRegister({ name, email, password });
  };

  const IconPasswordToggled = isPasswordToggled ? FaEyeSlash : FaEye;

  return (
    <form
      className="register-input"
      id="register-form"
      data-testid="register-form"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4">
        <label htmlFor="name" className="sr-only">
          Masukkan nama
        </label>
        <Input
          type="text"
          id="name"
          placeholder="Masukkan nama"
          value={name}
          required
          onChange={onNameChange}
        />

        <label htmlFor="email" className="sr-only">
          Masukkan email
        </label>
        <Input
          type="email"
          id="email"
          placeholder="Masukkan email"
          value={email}
          required
          onChange={onEmailChange}
        />

        <div className="relative">
          <label htmlFor="password" className="sr-only">
            Masukkan password
          </label>
          <Input
            type={isPasswordToggled ? 'text' : 'password'}
            value={password}
            id="password"
            required
            onChange={onPasswordChange}
            placeholder="Masukkan password"
          />

          <div
            className="absolute right-3 bottom-0 translate-y-[-10px] cursor-pointer"
            onClick={() => setIsPasswordToggled(!isPasswordToggled)}
            aria-label="Toggle password visibility"
            role="button"
          >
            <IconPasswordToggled className="w-4 h-4" />
          </div>
        </div>

        <Button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600"
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
