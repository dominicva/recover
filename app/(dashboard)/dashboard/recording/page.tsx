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
import BackButton from '@/components/ui/BackButton';
import NewNote from '@/components/motivation/CreateNote';

export default function Recording() {
  return (
    <div className="min-h-screen lg:col-span-3">
      <BackButton />
      <h2 className="mb-8 mt-6 text-4xl">Your motivation</h2>
      <section>
        <Card className="mt-6 bg-purple">
          <CardHeader>
            <CardDescription>Create new content</CardDescription>
            <CardTitle>Promises to your future self</CardTitle>
          </CardHeader>
          <CardContent>
            <NewNote />
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
