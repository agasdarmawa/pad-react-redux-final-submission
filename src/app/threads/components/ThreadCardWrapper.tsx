import { Card, CardContent } from '@/components/ui/card';

interface Props {
	children?: React.ReactNode;
}

const ThreadCardWrapper = ({ children }: Props) => {
  return (
    <Card className="min-w-6xl text-left mb-4">
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default ThreadCardWrapper;
