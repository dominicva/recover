import Achievement from './Achievement';
import type { AchievementProps } from '@/types';

export default async function AllAchievements({
  milestones,
  session,
}: {
  milestones: AchievementProps[];
  session: any;
}) {
  return (
    <section className="my-8 grid grid-cols-2 gap-2">
      <h2 className="col-span-2 mb-4 text-2xl font-semibold">
        All Achievements
      </h2>
      {milestones?.map((milestone: AchievementProps) => (
        <Achievement
          key={milestone.label}
          achievement={milestone}
          // @ts-ignore
          substanceOfAbuse={session?.user?.substanceOfAbuse}
        />
      ))}
    </section>
  );
}
