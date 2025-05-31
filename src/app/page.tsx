import { Metadata } from 'next';
import MainThreadWrapper from './MainThreadWrapper';

export const metadata: Metadata = {
  title: 'Forum App | Semua Diskusi',
};

function HomePage() {
  return <MainThreadWrapper />;
}

export default HomePage;
