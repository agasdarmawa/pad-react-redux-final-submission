import { Login } from '@/types/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useInput } from '@/hooks/useInput';
import { FaEyeSlash, FaEye } from 'react-icons/fa6';

interface Props {
  onLogin: ({ email, password }: Login) => void;
}

function LoginForm({ onLogin }: Props) {
  const [email, onEmailChange] = useInput('');
  const [isPasswordToggled, setIsPasswordToggled] = useState(false);
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  const IconPasswordToggled = isPasswordToggled ? FaEyeSlash : FaEye;

  return (
    <form className="login-input" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <Input
          type="text"
          value={email}
          placeholder="Email"
          required
          onChange={onEmailChange}
        />

        <div className="relative">
          <Input
            type={isPasswordToggled ? 'text' : 'password'}
            value={password}
            placeholder="Password"
            required
            onChange={onPasswordChange}
          />

          <div
            className="absolute right-3 bottom-0 translate-y-[-10px] cursor-pointer"
            onClick={() => setIsPasswordToggled(!isPasswordToggled)}
          >
            <IconPasswordToggled className="w-4 h-4" />
          </div>
        </div>

        <Button
          type="submit"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600"
        >
          Login
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
