import Link from 'next/link';
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
import JournalEntryActions from '@/components/journal/JournalEntryActions';

export default async function JournalPage() {
  const entries = await getJournalEntries();

  return (
    <div className="min-h-screen p-4 lg:col-span-5 lg:row-span-2 lg:min-h-full">
      <h2 className="mb-8 text-4xl">My Journal</h2>

      <ul className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
        {entries.map((entry) => {
          return (
            <li key={entry.id}>
              <Card className="flex items-center justify-between rounded-lg bg-gray-100 pr-5">
                <Link href={`/dashboard/journal/${entry.id}`}>
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
                </Link>
                <JournalEntryActions journalEntryId={entry.id} />
              </Card>
            </li>
          );
        })}
        <NewJournal />
      </ul>
    </div>
  );
}
