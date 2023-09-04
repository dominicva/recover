import RecentAchievements from '@/components/achievements/RecentAchievements';

export default function AchievementsPage() {
  return (
    <div className="min-h-screen">
      <h2 className="mb-4 text-2xl font-semibold">Recent achievements</h2>
      <RecentAchievements />
    </div>
  );
}
