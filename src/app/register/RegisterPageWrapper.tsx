'use client';

import { Card, CardContent } from '@/components/ui/card';

import RegisterForm from '@/components/form/RegisterForm';
import { Register } from '@/types/auth';
import { useAppDispatch } from '@/states/hooks';
import { asyncRegisterUser } from '@/states/users/action';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function RegisterPageWrapper() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onRegister = async ({ name, email, password }: Register) => {
    try {
      const response = await dispatch(
        asyncRegisterUser({ name, email, password })
      );
      if (response) {
        alert('Register berhasil!');
        router.push('/login');
      }
    } catch (error) {
      console.error(error);
      alert(error || 'Register failed.');
    }
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center mt-[-80px]">
      <Card className="w-[400px] text-left">
        <CardContent>
          <div className="mb-4">
            <h2 className="font-bold text-xl mb-1">Register</h2>
            <p className="text-neutral-500 text-sm">Buat akun anda sekarang</p>
          </div>

          <RegisterForm onRegister={onRegister} />

          <p className="text-center mt-3">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default RegisterPageWrapper;
