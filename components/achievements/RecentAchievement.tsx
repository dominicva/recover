import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import type { AchievementProps } from '@/types';

export default function RecentAchievement({
  achievement,
  substanceOfAbuse,
}: {
  achievement: AchievementProps;
  substanceOfAbuse: string;
}) {
  return (
    <Card className="h-48 shrink-0 grow-0 basis-auto bg-purple">
      <CardHeader></CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardTitle>{achievement.label}</CardTitle>
        <CardDescription>Free from {substanceOfAbuse}</CardDescription>
      </CardFooter>
    </Card>
  );
}
