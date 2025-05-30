import ThreadListWrapper from '@/components/thread/ThreadListWrapper';

export default function Home() {
  return (
    <main className="flex container py-6 px-10 justify-center items-center sm:items-start">
      <ThreadListWrapper />
    </main>
  );
}
