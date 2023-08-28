import { FlexCol } from '@/components/ui/Flex';
import {
  CurrentStreak,
  NewJournal,
  NewQuestionnaire,
  YourProgress,
  SelfMotivation,
} from '@/components/dashboard';

export default async function DashboardHome() {
  return (
    <FlexCol as="main" className="gap-2 p-4 md:flex-row">
      <CurrentStreak />
      <NewJournal />
      <NewQuestionnaire />
      <YourProgress />
      <SelfMotivation />
    </FlexCol>
  );
}
