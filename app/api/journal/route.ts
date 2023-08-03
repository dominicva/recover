import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getUserSession } from '@/lib/user';
import { createJournalEntry, updateJournalEntry } from '@/lib/journal';

export const POST = async () => {
  const { userId } = (await getUserSession()) as { userId: string };

  const newJournalEntry = await createJournalEntry({ userId });

  revalidatePath('/');

  return NextResponse.json({ data: newJournalEntry });
};

export const PATCH = async (request: NextRequest) => {
  const { content } = await request.json();
  const { searchParams } = new URL(request.url);
  const journalEntryId = searchParams.get('id');

  if (!journalEntryId) {
    return NextResponse.json({
      data: {
        error: 'No journal entry id provided',
      },
    });
  }

  const updatedJournalEntry = await updateJournalEntry({
    journalEntryId,
    content,
  });

  return NextResponse.json({ data: { updatedJournalEntry } });
};
