'use client';

import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  asyncDownvoteThread,
  asyncNeutralVoteThread,
  asyncUpvoteThread,
} from '@/states/threads/action';
import { DetailThread } from '@/types/thread';
import { postedAt } from '@/utils';
import { ReplyIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa6';

interface Props {
  thread: DetailThread;
}

const ThreadDetailHeader = ({ thread }: Props) => {
  const threadPostedAt = postedAt(thread.createdAt);
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.authUser?.id) as string;
  const isUpvoted = thread.upVotesBy.includes(currentUserId);
  const isDownvoted = thread.downVotesBy.includes(currentUserId);

  const IconIsUpvoted = isUpvoted ? FaThumbsUp : FaRegThumbsUp;
  const IconIsDownvoted = isDownvoted ? FaThumbsDown : FaRegThumbsDown;

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isUpvoted) {
      dispatch(asyncNeutralVoteThread({ threadId: thread.id }));
    } else {
      dispatch(asyncUpvoteThread({ threadId: thread.id }));
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDownvoted) {
      dispatch(asyncNeutralVoteThread({ threadId: thread.id }));
    } else {
      dispatch(asyncDownvoteThread({ threadId: thread.id }));
    }
  };

  return (
    <>
      <div className="">
        <Link href={`/threads/${thread.id}`}>
          <h2 className="font-bold text-xl mb-1">{thread.title}</h2>
        </Link>

        <div dangerouslySetInnerHTML={{ __html: thread.body }}></div>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => handleUpvote(e)}
        >
          <IconIsUpvoted className="w-4 h-4 mr-1" />
          <span>{thread.upVotesBy.length || 0}</span>
        </div>

        <div
          className="flex items-center cursor-pointer"
          onClick={(e) => handleDownvote(e)}
        >
          <IconIsDownvoted className="w-4 h-4 mr-1" />
          <span>{thread.downVotesBy.length || 0}</span>
        </div>

        <div className="flex items-center">
          <ReplyIcon className="w-4 h-4 mr-1" />
          <span>{thread.comments.length || 0}</span>
        </div>

        <div className="flex items-center gap-2">
          <p>Dibuat oleh </p>
          <Image
            src={thread.owner.avatar}
            className="w-6 h-6 rounded-full"
            alt={thread.owner.name}
            unoptimized
          />
          <strong>{thread.owner.name}</strong>
        </div>

        <div className="flex items-center">
          <p>{threadPostedAt}</p>
        </div>
      </div>
    </>
  );
};

export default ThreadDetailHeader;
