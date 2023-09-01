import { add, format, formatDistanceToNowStrict } from 'date-fns';

const milestones = [
  {
    label: '1 day',
    days: 1,
  },
  {
    label: '1 week',
    weeks: 1,
  },
  {
    label: '2 weeks',
    weeks: 2,
  },
  {
    label: '3 weeks',
    weeks: 3,
  },
  {
    label: '1 month',
    months: 1,
  },
  {
    label: '2 months',
    months: 2,
  },
  {
    label: '3 Months',
    months: 3,
  },
  {
    label: '6 months',
    months: 6,
  },
  {
    label: '9 months',
    months: 9,
  },
  {
    label: '1 year',
    years: 1,
  },
  {
    label: '2 years',
    years: 2,
  },
  {
    label: '3 years',
    years: 3,
  },
  {
    label: '4 years',
    years: 4,
  },
  {
    label: '5 years',
    years: 5,
  },
];

export const getTimeToNextMilestone = (sobrietyDatetime: number) => {
  const milestonesWithTimestamps = milestones.map((milestone) => {
    const { days, months, years } = milestone;

    const achievementDate = add(sobrietyDatetime, {
      days,
      months,
      years,
    }).getTime();

    const now = new Date().getTime();

    const timeToAchievement = achievementDate - now;

    return {
      ...milestone,
      achievementDate,
      timeToAchievement,
    };
  });

  const nextMilestone = milestonesWithTimestamps.find((milestone) => {
    return milestone.timeToAchievement > 0;
  });

  return (
    nextMilestone?.achievementDate &&
    formatDistanceToNowStrict(nextMilestone?.achievementDate)
  );
};

export const daysSinceDate = (date: Date | null | undefined) => {
  if (!date) return null;

  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return days;
};

export const formatDate = (date: Date) => {
  return format(date, 'EEE, MMM d hh:mm a');
};

export const isWithinXDays = (date: Date, days: number) => {
  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  return daysDiff <= days;
};
