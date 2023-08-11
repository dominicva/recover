import { getUserWithEntries } from '@/lib/user';
import { daysAndHoursSinceDate } from '@/lib/dates';
import Card from '@/components/ui/Card';
import JournalEntryCard from '@/components/journal/JournalEntryCard';
import { FlexCol, FlexRow } from '@/components/ui/Flex';
import CreateNewEntryButton from '@/components/journal/CreateNewEntryButton';
import StartQuestionnaireButton from '@/components/questionnaire/StartQuestionnaireButton';

export default async function DashboardHome() {
  const user = await getUserWithEntries();
  const timeSober = daysAndHoursSinceDate(user?.dateOfSobriety);

  return (
    <FlexCol as="main" className="gap-8 p-4 md:flex-row">
      <Card>
        <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
        <p className="text-lg">
          Congrats{user?.name && <span> {user.name}, </span>}you&apos;ve been{' '}
          {user?.substanceOfAbuse ? `${user?.substanceOfAbuse} free` : 'sober'}{' '}
          for{' '}
          <span className="font-bold">
            {timeSober
              ? `${timeSober.days} days and ${timeSober.hours} hours`
              : '0'}{' '}
            🎉🎉🎉
          </span>
        </p>
      </Card>

      <FlexCol className="justify-start gap-12">
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
      </FlexCol>
    </FlexCol>
  );
}
