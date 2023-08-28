import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { NewJournal } from '@/components/dashboard';
import { getJournalEntries } from '@/lib/journal';
import { formatDate } from '@/lib/dates';
import Link from 'next/link';

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <div className="p-4">
      <h2 className="mb-8 text-4xl">My Journal</h2>

      <ul className="mb-2 flex flex-col gap-2">
        {entries.map((entry) => {
          return (
            <li key={entry.id}>
              <Link href={`/dashboard/journal/${entry.id}`}>
                <Card className="rounded-lg bg-gray-100">
                  <CardHeader className="pb-2">
                    <CardDescription>
                      {formatDate(entry.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="font-medium">
                      {entry.title || 'Untitled'}
                    </CardTitle>
                  </CardContent>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
      <NewJournal />
    </div>
  );
}
