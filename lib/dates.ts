export const daysSinceDate = (date: Date | null | undefined) => {
  if (!date) return null;

  const today = new Date();

  const diff = Math.abs(today.getTime() - date.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return days;
};
