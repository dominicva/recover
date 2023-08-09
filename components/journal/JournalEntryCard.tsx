import Link from 'next/link';
import Card from '../ui/Card';
import type { JournalEntry } from '@prisma/client';

export default function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  return (
    <Card
      as="li"
      key={entry.id}
      className="h-32 basis-[45%] p-0 sm:basis-[30%]"
    >
      <Link
        href={`/dashboard/journal/${entry.id}`}
        className="flex h-full w-full items-center justify-center"
      >
        <h3 className="text-lg">{entry.title}</h3>
      </Link>
    </Card>
  );
}
