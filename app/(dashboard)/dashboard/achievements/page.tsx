import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import RecentAchievements from '@/components/achievements/RecentAchievements';
import AllAchievements from '@/components/achievements/AllAchievements';
import { getAchievedMilestones } from '@/lib/dates';
import type { ExtendedUserSession } from '@/types';

export default async function AchievementsPage() {
  const session = (await getServerSession(authOptions)) as ExtendedUserSession;

  const milestones = await getAchievedMilestones(
    //   @ts-ignore
    new Date(session?.user?.dateOfSobriety).getTime()
  );

  return (
    <div className="min-h-screen lg:col-span-4">
      <h2 className="mb-4 text-2xl font-semibold">Recent achievements</h2>
      <RecentAchievements
        session={session}
        milestones={milestones?.slice(0, 4) ?? []}
      />
      <AllAchievements
        session={session}
        milestones={milestones?.slice(4) ?? []}
      />
    </div>
  );
}
