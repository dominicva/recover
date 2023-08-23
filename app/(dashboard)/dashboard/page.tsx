import { FlexCol } from '@/components/ui/Flex';
import {
  CurrentStreak,
  NewJournal,
  NewQuestionnaire,
  YourProgress,
} from '@/components/dashboard';

export default async function DashboardHome() {
  // const user = await getUserWithEntries();

  return (
    <FlexCol as="main" className="gap-2 p-4 md:flex-row">
      <CurrentStreak />
      <NewJournal />
      <NewQuestionnaire />
      <YourProgress />

      {/* <FlexCol className="justify-start gap-12">
        <div className="flex gap-4">
          <CreateNewEntryButton />
          <StartQuestionnaireButton />
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold">Journal Entries</h2>
          <FlexRow as="ul" className="flex-wrap gap-4">
            {user?.journalEntries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} />
            ))}
          </FlexRow>
        </div>
      </FlexCol> */}
    </FlexCol>
  );
}
