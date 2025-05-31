'use client';

import { asyncSetAuthUser } from '@/states/authUser/action';
import LoginForm from '@/components/form/LoginForm';
import { Login } from '@/types/auth';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch } from '@/states/hooks';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPageWrapper = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onLogin = async ({ email, password }: Login) => {
    try {
      await dispatch(asyncSetAuthUser({ email, password }));

      alert('Login berhasil');
      router.push('/');
    } catch (error) {
      alert(error || 'Login gagal');
    }
  };

  return (
    <>
      <section className="min-h-screen w-full flex justify-center items-center mt-[-80px] ">
        <Card className="w-[400px] text-left">
          <CardContent>
            <div className="mb-4">
              <h2 className="font-bold text-xl mb-1">Login Akun</h2>
              <p className="text-neutral-500 text-sm">
                Login untuk masuk ke akun anda
              </p>
            </div>

            <LoginForm onLogin={onLogin} />

            <p className="text-center mt-3">
              Belum punya akun?{' '}
              <Link href="/register" className="text-blue-500 underline">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default LoginPageWrapper;
