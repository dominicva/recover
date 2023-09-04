import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAchievedMilestones } from '@/lib/dates';
import { ExtendedUserSession } from '@/types';
import RecentAchievement from './RecentAchievement';
import type { RecentAchievementProps } from '@/types';

export default async function RecentAchievements() {
  const session = (await getServerSession(authOptions)) as ExtendedUserSession;

  //   @ts-ignore
  const milestones = await getAchievedMilestones(session?.user.dateOfSobriety);
  return (
    <div>
      <section className="flex w-full gap-2 overflow-x-auto">
        {milestones?.slice(0, 4).map((milestone: RecentAchievementProps) => (
          <RecentAchievement
            achievement={milestone}
            // @ts-ignore
            substanceOfAbuse={session?.user?.substanceOfAbuse}
          />
        ))}
      </section>
      <section className="my-8 grid grid-cols-2 gap-2">
        <h2 className="col-span-2 mb-4 text-2xl font-semibold">
          All Achievements
        </h2>
        {/* <Card className="bg-blue">
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardTitle>10 days</CardTitle>
            <CardDescription>Free from X</CardDescription>
          </CardFooter>
        </Card>
        <Card className="bg-blue">
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardTitle>10 days</CardTitle>
            <CardDescription>Free from X</CardDescription>
          </CardFooter>
        </Card>
        <Card className="bg-blue">
          <CardHeader></CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex-col items-start gap-1">
            <CardTitle>10 days</CardTitle>
            <CardDescription>Free from X</CardDescription>
          </CardFooter>
        </Card> */}
      </section>
    </div>
  );
}
