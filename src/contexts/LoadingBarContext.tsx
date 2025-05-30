'use client';

import { createContext, useContext, useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';

const LoadingBarContext = createContext<{
  start: () => void;
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

  const start = () => ref.current?.continuousStart();
  const complete = () => ref.current?.complete();

  return (
    <LoadingBarContext.Provider value={{ start, complete }}>
      <LoadingBar color="#3B82F6" ref={ref} />
      {children}
    </LoadingBarContext.Provider>
  );
}
