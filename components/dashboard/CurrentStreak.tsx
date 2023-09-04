import { Card, CardHeader, CardTitle } from '../ui/card';
import { AchievementsLink } from './Buttons';
import LiveDates from './LiveDates';

export default function CurrentStreak() {
  return (
    <Card className="bg-green lg:col-span-2 lg:row-span-1">
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4">
        <CardTitle className="text-xl font-normal">Current streak</CardTitle>
        <AchievementsLink />
      </CardHeader>
      <LiveDates />
    </Card>
  );
}
