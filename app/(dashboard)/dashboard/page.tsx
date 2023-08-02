import { getUserFromDb } from '@/lib/user';
import { daysAndHoursSinceDate } from '@/lib/dates';
import Container from '@/components/utils/Container';
import Card from '@/components/utils/Card';
import JournalTextEditor from '@/components/journal/JournalTextEditor';
import { FlexCol, FlexRow } from '@/components/utils/Flex';
import Button from '@/components/buttons/Button';
import { prisma } from '@/lib/db';
import CreateNewEntryButton from '@/components/journal/CreateNewEntryButton';

const getEntries = async () => {
  const user = await getUserFromDb();
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
  });

  return entries;
};

export default async function DashboardHome() {
  const user = await getUserFromDb();
  const timeSober = await daysAndHoursSinceDate(user?.dateOfSobriety);
  const entries = await getEntries();

  return (
    <FlexCol as="main" className="gap-8 p-4">
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
      {/* <JournalTextEditor /> */}

      <FlexRow className="justify-start gap-12">
        <CreateNewEntryButton />
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Journal Entries</h2>
          <FlexRow as="ul" className="gap-4">
            {entries.map((entry) => (
              <li key={entry.id}>
                <Card>
                  <p>{entry.content}</p>
                </Card>
              </li>
            ))}
          </FlexRow>
        </div>
      </FlexRow>
    </FlexCol>
  );
}
