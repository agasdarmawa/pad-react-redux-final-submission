'use client';

import {
  asyncDownvoteCommentThread,
  asyncNeutralCommentThread,
  asyncUpvoteCommentThread,
} from '@/states/threads/action';
import { DetailThread } from '@/types/thread';
import { postedAt } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa6';
import Image from 'next/image';

interface Props {
  detailThread: DetailThread;
}

const ThreadCommentList = ({ detailThread }: Props) => {
  const dispatch = useAppDispatch();

  const currentUserId = useAppSelector((state) => state.authUser?.id) as string;
  const isUpvoted = detailThread.comments.find((x) =>
    x.upVotesBy.includes(currentUserId)
  );
  const isDownvoted = detailThread.comments.find((x) =>
    x.downVotesBy.includes(currentUserId)
  );

  const handleUpvoteComment = (commentId: string) => {
    if (isUpvoted) {
      dispatch(
        asyncNeutralCommentThread({ threadId: detailThread.id, commentId })
      );
    } else {
      dispatch(
        asyncUpvoteCommentThread({ threadId: detailThread.id, commentId })
      );
    }
  };

  const handleDownvoteComment = (commentId: string) => {
    if (isDownvoted) {
      dispatch(
        asyncNeutralCommentThread({ threadId: detailThread.id, commentId })
      );
    } else {
      dispatch(
        asyncDownvoteCommentThread({ threadId: detailThread.id, commentId })
      );
    }
  };

  return (
    <>
      <h5 className="text-xl font-bold mb-3">
        Komentar ({detailThread.comments.length || 0})
      </h5>
      {detailThread.comments.map((comment) => {
        const isSelectedCommentUpvoted =
          comment.upVotesBy.includes(currentUserId);
        const isSelectedCommentDownvoted =
          comment.downVotesBy.includes(currentUserId);

        const IconIsUpvoted = isSelectedCommentUpvoted
          ? FaThumbsUp
          : FaRegThumbsUp;
        const IconIsDownvoted = isSelectedCommentDownvoted
          ? FaThumbsDown
          : FaRegThumbsDown;

        return (
          <div key={comment.id} className="w-full mb-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="rounded-full w-8 h-8 overflow-hidden mr-2">
                  <Image
                    src={comment.owner.avatar}
                    alt={comment.owner.name}
                    unoptimized
                  />
                </div>
                <h2>{comment.owner.name}</h2>
              </div>
              <p>{postedAt(comment.createdAt)}</p>
            </div>

            <div
              className="my-1"
              dangerouslySetInnerHTML={{ __html: comment.content }}
            />

            <div className="flex items-center gap-2">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleUpvoteComment(comment.id)}
              >
                <IconIsUpvoted className="w-4 h-4 mr-1" />
                <span>{comment.upVotesBy.length || 0}</span>
              </div>

              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleDownvoteComment(comment.id)}
              >
                <IconIsDownvoted className="w-4 h-4 mr-1" />
                <span>{comment.downVotesBy.length || 0}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ThreadCommentList;
