'use client';

import { Provider } from 'react-redux';
import store from '@/states/index';

import Loading from '@/components/Loading';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log(store);
  return (
    <Provider store={store}>
      <Loading />
      {children}
    </Provider>
  );
}
