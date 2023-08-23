import { getUserWithEntries } from '@/lib/user';
import { daysAndHoursSinceDate } from '@/lib/dates';
import JournalEntryCard from '@/components/journal/JournalEntryCard';
import { FlexCol, FlexRow } from '@/components/ui/Flex';
import CreateNewEntryButton from '@/components/journal/CreateNewEntryButton';
import StartQuestionnaireButton from '@/components/questionnaire/StartQuestionnaireButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import CurrentStreak from '@/components/dashboard/CurrentStreak';

export default async function DashboardHome() {
  // const user = await getUserWithEntries();

  return (
    <FlexCol as="main" className="gap-8 p-4 md:flex-row">
      <CurrentStreak />

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
