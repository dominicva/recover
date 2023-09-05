import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Icons } from '@/components/ui/icons';

export default function Recording() {
  return (
    <div className="min-h-screen">
      <h2 className="text-center text-3xl font-semibold">Motivation vault</h2>
      <section>
        <Card>
          <CardHeader>
            <CardDescription>Create new content</CardDescription>
            <CardTitle>Promises to your future self</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-16">
              <Button className="h-12 w-12 rounded-full">
                <Icons.mic color="#fff" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
