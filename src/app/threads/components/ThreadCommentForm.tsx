'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAppDispatch } from '@/states/hooks';
import { asyncCreateThreadReply } from '@/states/threads/action';
import { useState } from 'react';
import {
  startLoadingBar,
  completeLoadingBar,
} from '@/utils/loading-bar-control';

interface Props {
  threadId: string;
}

const ThreadCommentForm = ({ threadId }: Props) => {
  const [content, setContent] = useState('');

  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoadingBar();
    try {
      dispatch(asyncCreateThreadReply({ threadId, content }));

      setContent('');
    } finally {
      completeLoadingBar();
    }
  };

  return (
    <>
      <div className="mt-5">
        <h3 className="font-bold mb-1">Beri Komentar</h3>
        <form onSubmit={handleSubmit}>
          <Textarea
            id="message"
            placeholder="Tulis komentar"
            required
            className="resize-none min-h-[80px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button className="w-full my-5 cursor-pointer">Submit</Button>
        </form>
      </div>
    </>
  );
};

export default ThreadCommentForm;
