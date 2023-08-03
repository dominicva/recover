import { prisma } from './db';

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
  content,
}: {
  journalEntryId: string;
  content: string;
}) => {
  const updatedJournalEntry = await prisma.journalEntry.update({
    where: {
      id: journalEntryId,
    },
    data: {
      content,
    },
  });

  return updatedJournalEntry;
};
