import { prisma } from './db';
import { getUserSession } from './user';

export const getJournalEntryById = async (id: string) => {
  const { userId } = await getUserSession();

  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId,
    },
  });

  return journalEntry;
};

export const createJournalEntry = async ({
  userId,
  initialContent = '',
}: {
  userId: string;
  initialContent?: string;
}) => {
  const newJournalEntry = await prisma.journalEntry.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      content: initialContent,
    },
  });

  return newJournalEntry;
};

export const updateJournalEntry = async ({
  journalEntryId,
  title,
  content,
}: {
  journalEntryId: string;
  title: string;
  content: string;
}) => {
  const updatedJournalEntry = await prisma.journalEntry.update({
    where: {
      id: journalEntryId,
    },
    data: {
      title,
      content,
    },
  });

  return updatedJournalEntry;
};
