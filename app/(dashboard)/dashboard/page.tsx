import {
  CurrentStreak,
  NewJournal,
  NewQuestionnaire,
  YourProgress,
  SelfMotivation,
} from '@/components/dashboard';

export default async function DashboardHome() {
  return (
    <>
      <CurrentStreak />
      <YourProgress />
      <NewJournal />
      <NewQuestionnaire />
      <SelfMotivation />
    </>
  );
}
