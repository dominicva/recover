import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BackButton from '@/components/ui/BackButton';
import NewNote from '@/components/motivation/CreateNote';
import { getUserSession } from '@/lib/user';
import { prisma } from '@/lib/db';

export default async function Recording() {
  const { user } = await getUserSession();

  const motivationNotes = await prisma.motivationNote.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="min-h-screen lg:col-span-3">
      <BackButton />
      <h2 className="mb-8 mt-6 text-4xl">Your motivation</h2>
      <section>
        <Card className="mt-6 bg-blue">
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
        <div className="my-6 grid gap-3 sm:grid-cols-2">
          {motivationNotes?.map((note) => (
            <Card
              key={note.id}
              className="flex min-h-[120px] items-center bg-purple p-6  text-lg font-medium"
            >
              {note.content}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
