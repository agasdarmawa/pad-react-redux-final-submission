'use client';

import { useAppSelector, useAppDispatch } from '@/states/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import { asyncUnsetAuthUser } from '@/states/authUser/action';
import { asyncPreloadProcess } from '@/states/isPreload/action';
import LoginPageWrapper from '@/app/login/LoginPageWrapper';

export default function AppLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const authUser = useAppSelector((state) => state.authUser);
  const isPreload = useAppSelector((state) => state.isPreload);

  const authPages = ['/login', '/register'];
  const protectedAppRoutes = ['/', '/threads', '/leaderboards'];

  const normalizedPathname =
    pathname !== '/' && pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;

  const isAuthPage = authPages.includes(normalizedPathname);
  const isProtectedAppPage = protectedAppRoutes.some(
    (route) =>
      normalizedPathname === route || normalizedPathname.startsWith(route + '/')
  );

  useEffect(() => {
    if (!authUser && isProtectedAppPage) {
      router.replace('/login');
    }

    if (authUser && isAuthPage) {
      router.replace('/');
    }
  }, [authUser, pathname, router, isAuthPage, isProtectedAppPage]);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const handleSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) return null;

  return (
    <div className="app-container min-h-screen pt-24">
      <main>
        {authUser ? (
          <>
            <Navbar authUser={authUser} onSignOut={handleSignOut} />
            {children}
          </>
        ) : isAuthPage ? (
          children
        ) : (
          <LoginPageWrapper />
        )}
      </main>
    </div>
  );
}
