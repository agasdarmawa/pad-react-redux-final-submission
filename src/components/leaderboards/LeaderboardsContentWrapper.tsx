import { Card, CardContent, CardHeader } from '@/components/ui/card';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const LeaderboardsContentWrapper = ({ children }: Props) => {
  return (
    <section className="min-h-screen w-full flex justify-center items-center mb-10 mt-[-40px] ">
      <Card className="w-[800px] text-left">
        <CardHeader>
          <h2 className="font-bold text-2xl">Klaesmen Pengguna Aktif</h2>
        </CardHeader>
        <CardContent>
          <div className="w-full flex justify-between mb-3">
            <h4 className="text-lg">Pengguna</h4>
            <h6 className="text-lg">Skor</h6>
          </div>

          {children}
        </CardContent>
      </Card>
    </section>
  );
};

export default LeaderboardsContentWrapper;
