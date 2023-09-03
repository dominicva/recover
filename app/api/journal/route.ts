import { type NextRequest, NextResponse } from 'next/server';
import { getUserSession } from '@/lib/user';
import {
  createJournalEntry,
  updateJournalEntry,
  getJournalEntryById,
} from '@/lib/journal';
import { prisma } from '@/lib/db';

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const journalEntryId = searchParams.get('id');

  if (!journalEntryId) {
    return NextResponse.json(
      { error: 'No journal entry id provided' },
      { status: 400 }
    );
  }

  const journalEntry = await getJournalEntryById(journalEntryId);

  return NextResponse.json({ data: journalEntry }, { status: 200 });
};

export const POST = async () => {
  const { userId } = (await getUserSession()) as { userId: string };

  const newJournalEntry = await createJournalEntry({ userId });

  return NextResponse.json({ data: newJournalEntry });
};

export const PATCH = async (request: NextRequest) => {
  const { title, content } = await request.json();
  const { searchParams } = new URL(request.url);
  const journalEntryId = searchParams.get('id');

  if (!journalEntryId) {
    return NextResponse.json({
      error: 'No journal entry id provided',
    });
  }

  const updatedJournalEntry = await updateJournalEntry({
    journalEntryId,
    title,
    content,
  });

  return NextResponse.json({ data: { updatedJournalEntry } });
};

export const DELETE = async (request: NextRequest) => {
  const journalEntryId = request.nextUrl.searchParams.get('id');

  if (!journalEntryId) {
    return NextResponse.json({
      error: 'No journal entry id provided',
    });
  }

  const deletedJournalEntry = await prisma.journalEntry.delete({
    where: {
      id: journalEntryId,
    },
  });

  return NextResponse.json({ data: { deletedJournalEntry } });
};
