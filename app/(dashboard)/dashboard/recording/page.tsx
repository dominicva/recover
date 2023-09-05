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
    <div className="min-h-screen lg:col-span-3">
      <h2 className="text-center text-3xl font-semibold">Motivation</h2>
      <section>
        <Card className="mt-6 bg-purple">
          <CardHeader>
            <CardDescription>Create new content</CardDescription>
            <CardTitle>Promises to your future self</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-16">
              <div className="flex flex-col items-center gap-1">
                <Button className="h-14 w-14 rounded-full bg-purple-2 hover:bg-purple">
                  <Icons.add color="#000" />
                </Button>
                <p className="font-semibold">Note</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button className="h-14 w-14 rounded-full bg-purple-2 hover:bg-purple">
                  <Icons.camera color="#000" />
                </Button>
                <p className="font-semibold">Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
      <section className="mt-8">
        <h2 className="text-center text-2xl font-semibold">
          Your motivation vault
        </h2>
      </section>
    </div>
  );
}
