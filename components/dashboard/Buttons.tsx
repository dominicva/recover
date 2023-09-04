'use client';

import Link from 'next/link';
import { TwoSeventyRing } from 'react-svg-spinners';
import { Plus } from 'react-feather';
import { buttonVariants } from '../ui/button';
import { useNavigationLoading } from '@/hooks/useNavigationLoading';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export function NewQuestionnaireLink({ pathname }: { pathname?: string }) {
  const { isLoading, handleStartLoading, handleStopLoading } =
    useNavigationLoading();

  return (
    <Link
      href="/dashboard/questionnaire"
      passHref
      onClick={handleStartLoading}
      onLoad={handleStopLoading}
      className={cn(
        buttonVariants({
          size: 'icon',
          variant: 'outline',
        }),
        'rounded-full bg-gray-2',
        pathname?.startsWith('/dashboard/journal') &&
          'bg-purple-2 hover:bg-purple'
      )}
    >
      {isLoading ? <TwoSeventyRing color="#000" /> : <Plus color="#000" />}
    </Link>
  );
}

export function AchievementsLink() {
  const { isLoading, handleStartLoading, handleStopLoading } =
    useNavigationLoading();

  return (
    <Link
      href="/dashboard/achievements"
      passHref
      onClick={handleStartLoading}
      onLoad={handleStopLoading}
      className={cn(
        buttonVariants({
          size: 'icon',
          variant: 'ghost',
        }),
        'rounded-full bg-green-2 hover:bg-green'
      )}
    >
      {isLoading ? (
        <TwoSeventyRing color="#000" />
      ) : (
        <ChevronRight color="#000" />
      )}
    </Link>
  );
}

export function ProgressLink() {
  const { isLoading, handleStartLoading, handleStopLoading } =
    useNavigationLoading();

  return (
    <Link
      href="/dashboard/progress"
      passHref
      onClick={handleStartLoading}
      onLoad={handleStopLoading}
      className={cn(
        buttonVariants({
          size: 'icon',
          variant: 'outline',
        }),
        'rounded-full bg-purple-2 hover:bg-purple'
      )}
    >
      {isLoading ? (
        <TwoSeventyRing color="#000" />
      ) : (
        <ChevronRight color="#000" />
      )}
    </Link>
  );
}
