import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Star, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { formatDistanceToNowStrict } from 'date-fns';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getTimeToNextMilestone, getMilestoneProgress } from '@/lib/dates';
import type { UserSession } from '@/types';

export default async function CurrentStreak() {
  const session = await getServerSession(authOptions);

  const user = session?.user as UserSession;

  const sobrietyDatetime = new Date(user?.dateOfSobriety).getTime();

  if (!sobrietyDatetime) {
    return null;
  }

  const [sobrietyTimeValue, sobrietyTimeInterval] =
    formatDistanceToNowStrict(sobrietyDatetime).split(' ');

  const timeToNextMilestone = getTimeToNextMilestone(sobrietyDatetime);

  const progress = getMilestoneProgress(sobrietyDatetime);

  return (
    <Card className="bg-green">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4">
        <CardTitle className="text-xl font-normal">Current streak</CardTitle>
        <Link
          href="/dashboard/achievements"
          className={cn(
            buttonVariants({
              size: 'icon',
              variant: 'ghost',
            }),
            'rounded-full bg-green-2'
          )}
        >
          <ChevronRight color="#000" />
        </Link>
      </CardHeader>
      <CardContent className="flex gap-4 pl-5">
        <div
          className={`mt-1 flex h-14 w-14 items-center justify-center rounded-full before:content-['${Star}
          )}']`}
          style={{
            background: `radial-gradient(closest-side, #B3F5C9 79%, transparent 80% 100%), conic-gradient(#000 ${progress}%, rgba(0,0,0, 0.12) 0)`,
          }}
        >
          <Star fill="#000" />
        </div>
        <div>
          <CardDescription className="text-2xl">
            <span className="text-4xl text-black">{sobrietyTimeValue}</span>{' '}
            <span className="text-base text-body-text">
              {sobrietyTimeInterval}
            </span>
          </CardDescription>
          <p className="mb-2 ml-1 mt-1 text-body-text">
            {timeToNextMilestone} to your next milestone
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
