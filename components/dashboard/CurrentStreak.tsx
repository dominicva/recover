'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Progress } from '@/components/ui/progress';
import { daysSinceDate } from '@/lib/dates';
import type { UserSession } from '@/types';

export default function CurrentStreak() {
  const { data: session } = useSession();
  const user = session?.user as UserSession;

  const currentStreak = daysSinceDate(new Date(user?.dateOfSobriety));

  const [progress, _setProgress] = useState(68);

  return (
    <Card className="bg-green">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-3xl font-normal">
          {currentStreak ? currentStreak : null} days
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Current streak
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="h-2" />
        <p className="mb-2 mt-1 text-center text-gray-400">
          7 days to next milestone
        </p>
      </CardContent>
    </Card>
  );
}
