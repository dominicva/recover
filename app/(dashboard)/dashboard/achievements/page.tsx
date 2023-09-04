import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import RecentAchievements from '@/components/achievements/RecentAchievements';
import AllAchievements from '@/components/achievements/AllAchievements';
import { getAchievedMilestones } from '@/lib/dates';
import type { ExtendedUserSession } from '@/types';

export default async function AchievementsPage() {
  const session = (await getServerSession(authOptions)) as ExtendedUserSession;
  //   @ts-ignore
  const milestones = await getAchievedMilestones(session?.user.dateOfSobriety);
  return (
    <div className="min-h-screen">
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
