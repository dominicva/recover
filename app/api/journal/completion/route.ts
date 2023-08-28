import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const POST = async (request: NextRequest) => {
  const { completion, id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: 'No journal entry id provided' },
      { status: 400 }
    );
  }

  const updatedEntry = await prisma.journalEntry.update({
    where: { id },
    data: { completion },
  });

  return NextResponse.json({ data: updatedEntry }, { status: 200 });
};
