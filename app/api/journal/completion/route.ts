import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const POST = async (request: NextRequest) => {
  const { completion } = await request.json();
  const { searchParams } = new URL(request.url);
  const journalEntryId = searchParams.get('id');

  if (!journalEntryId) {
    return NextResponse.json(
      { error: 'No journal entry id provided' },
      { status: 400 }
    );
  }

  const updatedEntry = await prisma.completion.create({
    data: {
      content: completion,
      journalEntry: {
        connect: {
          id: journalEntryId,
        },
      },
    },
  });

  return NextResponse.json({ data: updatedEntry }, { status: 200 });
};
