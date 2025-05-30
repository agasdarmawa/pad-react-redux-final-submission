import { Metadata } from 'next';
import LoginPageWrapper from './LoginPageWrapper';

export const metadata: Metadata = {
  title: 'Login',
};

function LoginPage() {
  return <LoginPageWrapper />;
}

export default LoginPage;
