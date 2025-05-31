'use client';

import {
  asyncGetDetailThread,
  unsetDetailThreadActionCreator,
} from '@/states/threads/action';
import ThreadCardWrapper from '../components/ThreadCardWrapper';
import ThreadCommentForm from '../components/ThreadCommentForm';
import ThreadCommentList from '../components/ThreadCommentList';
import ThreadDetailHeader from '../components/ThreadDetailHeader';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import {
  startLoadingBar,
  completeLoadingBar,
} from '@/utils/loading-bar-control';
import { useEffect } from 'react';

interface Props {
  threadId: string;
}

const ThreadDetailWrapper = ({ threadId }: Props) => {
  const detailThread = useAppSelector((state) => state.threadData.detailThread);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      startLoadingBar();
      try {
        await dispatch(asyncGetDetailThread(threadId));
      } catch {
      } finally {
        completeLoadingBar();
      }
    };

    fetchData();

    return () => {
      dispatch(unsetDetailThreadActionCreator());
    };
  }, [dispatch, threadId]);

  if (!detailThread) return <p>Loading...</p>;

  return (
    <>
      <section className="w-full mx-auto mt-20">
        <ThreadCardWrapper>
          <ThreadDetailHeader thread={detailThread} />
          <ThreadCommentForm threadId={threadId as string} />
          <ThreadCommentList detailThread={detailThread} />
        </ThreadCardWrapper>
      </section>
    </>
  );
};

export default ThreadDetailWrapper;
