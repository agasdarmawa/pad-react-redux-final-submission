import { Metadata } from 'next';
import RegisterPageWrapper from './RegisterPageWrapper';

export const metadata: Metadata = {
  title: 'Register',
};

function RegisterPage() {
  return <RegisterPageWrapper />;
}

export default RegisterPage;
