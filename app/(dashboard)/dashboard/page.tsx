import { getUserFromDb } from '@/lib/user';
import { daysAndHoursSinceDate } from '@/lib/dates';
import Container from '@/components/utils/Container';
import Card from '@/components/utils/Card';

export default async function DashboardHome() {
  const user = await getUserFromDb();
  const timeSober = await daysAndHoursSinceDate(user?.dateOfSobriety);

  return (
    <Container as="main" className="p-4">
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
    </Container>
  );
}
