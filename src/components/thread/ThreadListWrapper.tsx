import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ThreadsList from './ThreadList';
import Link from 'next/link';

const ThreadListWrapper = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-2xl">Semua Diskusi</h2>
        <Link href="/threads/create">
          <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600">
            Tambah Diskusi
          </Button>
        </Link>
      </div>

      <Separator className="mb-8" />

      <ThreadsList />
    </div>
  );
};

export default ThreadListWrapper;
