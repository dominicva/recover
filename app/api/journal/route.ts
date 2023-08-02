import { prisma } from '@/lib/db';
import { getUserSession } from '@/lib/user';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const { userId } = await getUserSession();

  const newJournalEntry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      content: 'Your blank canvas awaits...',
    },
  });

  revalidatePath('/');
  return NextResponse.json({ data: newJournalEntry });
};
