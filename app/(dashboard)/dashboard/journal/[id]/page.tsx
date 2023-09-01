import { getJournalEntryById } from '@/lib/journal';
import JournalTextEditor from '@/components/journal/JournalTextEditor';
import Container from '@/components/ui/Container';

export default async function JournalEntryPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const entry = await getJournalEntryById(params.id);

  if (!entry) {
    return (
      <div>
        <h2>Entry not found</h2>
      </div>
    );
  }

  return (
    <div className="col-span-5 row-span-3 px-4">
      <JournalTextEditor {...entry} />
    </div>
  );
}
