'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { asyncCreateThread } from '@/states/threads/action';
import { useAppDispatch } from '@/states/hooks';
import { useRouter } from 'next/navigation';

const CreateThreadWrapper = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(asyncCreateThread({ title, category, body }));

    router.push('/');

    clearForms();
  };

  const clearForms = () => {
    setTitle('');
    setCategory('');
    setBody('');
  };

  return (
    <section className="min-h-screen w-full flex justify-center items-center mt-[-50px] ">
      <Card className="w-[800px] text-left">
        <CardContent>
          <div className="mb-4">
            <h2 className="font-bold text-xl mb-1">Buat Diskusi Baru</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Input
                type="text"
                value={title}
                placeholder="Judul"
                required
                onChange={(e) => setTitle(e.target.value)}
              />

              <Input
                type="text"
                value={category}
                placeholder="Kategori"
                onChange={(e) => setCategory(e.target.value)}
              />

              <Textarea
                value={body}
                placeholder="Tuliskan pikiranmu..."
                className="resize-none min-h-[80px]"
                required
                onChange={(e) => setBody(e.target.value)}
              />

              <Button
                type="submit"
                className="cursor-pointer bg-blue-500 hover:bg-blue-600"
              >
                Buat
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default CreateThreadWrapper;
