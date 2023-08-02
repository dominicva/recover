import { prisma } from '@/lib/db';
import { getUserSession } from '@/lib/user';
import JournalTextEditor from '@/components/journal/JournalTextEditor';
import Container from '@/components/utils/Container';

const getEntry = async (id: string) => {
  const { userId } = await getUserSession();

  const journalEntry = await prisma.journalEntry.findUnique({
    where: {
      id,
      userId,
    },
  });

  return journalEntry;
};

export default async function JournalEntryPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;
  const entry = await getEntry(id);
  console.log('entry', entry);

  if (!entry) {
    return <div>Entry not found</div>;
  }

  return (
    <Container as="main" className="h-full w-full px-4">
      <JournalTextEditor content={entry?.content} />
    </Container>
  );
}
