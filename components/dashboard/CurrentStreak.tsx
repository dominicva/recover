'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star, ChevronRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { daysSinceDate } from '@/lib/dates';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { UserSession } from '@/types';

export default function CurrentStreak() {
  const { data: session } = useSession();
  const user = session?.user as UserSession;

  const currentStreak = daysSinceDate(new Date(user?.dateOfSobriety));

  const [progress, _setProgress] = useState(68);

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
            <span className="text-4xl text-black">
              {currentStreak ? currentStreak : null}
            </span>{' '}
            <span className="text-base text-body-text">days</span>
          </CardDescription>
          <p className="mb-2 mt-1 text-body-text">
            7 days to your next milestone
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
