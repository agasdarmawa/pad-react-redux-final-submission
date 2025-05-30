import { Metadata } from 'next';
import ThreadDetailWrapper from './ThreadDetailWrapper';

interface Props {
  params: Promise<{
    threadId: string;
  }>;
}

export const metadata: Metadata = {
  title: 'Detail Thread',
};

async function ThreadDetailPage(props: Props) {
  const params = await props.params;
  return (
    <div className="px-10 mb-10 mt-[-30px]">
      <ThreadDetailWrapper threadId={params.threadId} />
    </div>
  );
}

export default ThreadDetailPage;
