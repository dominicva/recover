import RecentAchievement from './RecentAchievement';
import type { AchievementProps } from '@/types';

export default async function RecentAchievements({
  milestones,
  session,
}: {
  milestones: AchievementProps[];
  session: any;
}) {
  return (
    <div>
      <section className="flex w-full gap-2 overflow-x-auto">
        {milestones?.map((milestone: AchievementProps) => (
          <RecentAchievement
            key={milestone.label}
            achievement={milestone}
            // @ts-ignore
            substanceOfAbuse={session?.user?.substanceOfAbuse}
          />
        ))}
      </section>
    </div>
  );
}
