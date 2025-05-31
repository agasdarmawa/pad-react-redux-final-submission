import { Metadata } from 'next';
import CreateThreadWrapper from './CreateThreadWrapper';

export const metadata: Metadata = {
  title: 'Tambah Diskusi',
};

function CreateThreadPage() {
  return <CreateThreadWrapper />;
}

export default CreateThreadPage;
