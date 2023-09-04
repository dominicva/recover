'use client';

import { useSession } from 'next-auth/react';
import { Star } from 'lucide-react';
import { CardContent, CardDescription } from '../ui/card';
import { formatDistanceToNowStrict } from 'date-fns';
import { getTimeToNextMilestone, getMilestoneProgress } from '@/lib/dates';
import type { UserSession } from '@/types';

export default function LiveDates() {
  const { data: session } = useSession();

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
    <CardContent className="flex gap-4 pl-5">
      <div
        className="mt-1 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: `radial-gradient(closest-side, #B3F5C9 79%, transparent 80% 100%), conic-gradient(#000 ${
            progress * 100
          }%, rgba(0,0,0, 0.12) 0)`,
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
  );
}
