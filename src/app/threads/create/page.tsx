import { Metadata } from 'next';
import CreateThreadWrapper from './CreateThreadWrapper';

export const metadata: Metadata = {
  title: 'Tambah Thread',
};

function CreateThreadPage() {
  return <CreateThreadWrapper />;
}

export default CreateThreadPage;
