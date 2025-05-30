import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useInput } from '@/hooks/useInput';
import { Register } from '@/types/auth';
import { useState } from 'react';

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

  return (
    <form className="register-input" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <Input
          type="text"
          placeholder="Masukkan nama"
          value={name}
          required
          onChange={onNameChange}
        />

        <Input
          type="email"
          placeholder="Masukkan email"
          value={email}
          required
          onChange={onEmailChange}
        />

        <div className="relative">
          <Input
            type={isPasswordToggled ? 'text' : 'password'}
            value={password}
            required
            onChange={onPasswordChange}
            placeholder="Masukkan password"
          />

          <div
            className="absolute right-3 bottom-0 translate-y-[-5px] cursor-pointer"
            onClick={() => setIsPasswordToggled(!isPasswordToggled)}
          >
            <i
              className={`fa ${isPasswordToggled ? 'fa-eye' : 'fa-eye-slash'} `}
            ></i>
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
