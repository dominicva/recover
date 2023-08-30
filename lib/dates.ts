import { format } from 'date-fns';

export const daysSinceDate = (date: Date | null | undefined) => {
  if (!date) return null;

  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return days;
};

export const formatDate = (date: Date) => format(date, 'EEE, MMM d hh:mm a');

export const isWithinXDays = (date: Date, days: number) => {
  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

  return daysDiff <= days;
};
