export const daysAndHoursSinceDate = (date: Date | null | undefined) => {
  if (!date) return null;
  const today = new Date();
  const diff = Math.abs(today.getTime() - date.getTime());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff - days * 24 * 60 * 60 * 1000) / (1000 * 60 * 60)
  );
  return { days, hours };
};
