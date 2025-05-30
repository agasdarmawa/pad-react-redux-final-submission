// LoadingBarProvider.tsx
'use client';

import { createContext, useContext, useRef, useEffect } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { setLoadingBarRef } from '@/utils/loading-bar-control'; // import setter here

const LoadingBarContext = createContext<{
  start:() => void;
  complete: () => void;
    } | null>(null);

export const useLoadingBar = () => {
  const context = useContext(LoadingBarContext);
  if (!context) {
    throw new Error('useLoadingBar must be used within LoadingBarProvider');
  }
  return context;
};

export function LoadingBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    setLoadingBarRef(ref.current);
    return () => setLoadingBarRef(null);
  }, []);

  const start = () => ref.current?.continuousStart();
  const complete = () => ref.current?.complete();

  return (
    <LoadingBarContext.Provider value={{ start, complete }}>
      <LoadingBar
        color="#3B82F6"
        height={4}
        style={{
          transform: 'translateY(83px)',
        }}
        ref={ref}
      />
      {children}
    </LoadingBarContext.Provider>
  );
}
