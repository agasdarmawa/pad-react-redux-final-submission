'use client';

import {
  asyncGetAllCategories,
  asyncGetThreadsList,
} from '@/states/threads/action';
import { useEffect, useState } from 'react';
import ThreadItemHeader from './ThreadItemHeader';
import ThreadCardWrapper from './ThreadCardWrapper';
import { Thread } from '@/types/thread';
import { useAppDispatch, useAppSelector } from '@/states/hooks';
import { Button } from '@/components/ui/button';
// import { hideLoading, showLoading } from 'react-redux-loading-bar';

const ThreadsList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const threads = useAppSelector(
    (state) => state.threadData.threads as Thread[]
  );

  const categories = useAppSelector(
    (state) => state.threadData.categories as string[]
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const load = async () => {
      // dispatch(showLoading());
      try {
        await dispatch(asyncGetThreadsList());
        await dispatch(asyncGetAllCategories());
      } finally {
        // dispatch(hideLoading());
      }
    };

    load();
  }, [dispatch]);

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-5 ">
        <Button
          className="cursor-pointer"
          variant={selectedCategory === '' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('')}
        >
          All
        </Button>
        {categories.map((category, index) => (
          <Button
            key={index}
            className="cursor-pointer"
            variant={category === selectedCategory ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            #{category}
          </Button>
        ))}
      </div>

      {filteredThreads.length ? (
        <div className="space-y-4">
          {filteredThreads.map((thread, idx) => (
            <ThreadCardWrapper key={idx}>
              <ThreadItemHeader thread={thread} />
            </ThreadCardWrapper>
          ))}
        </div>
      ) : (
        <div className="w-full flex items-center justify-center text-gray-500 mt-5">
          <p>Threads tidak ditemukan</p>
        </div>
      )}
    </div>
  );
};

export default ThreadsList;
