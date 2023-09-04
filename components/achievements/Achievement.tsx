import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import type { AchievementProps } from '@/types';

export default function Achievement({
  achievement,
  substanceOfAbuse,
}: {
  achievement: AchievementProps;
  substanceOfAbuse: string;
}) {
  return (
    <Card className="col-span-1 bg-blue">
      <CardHeader></CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardTitle>{achievement.label}</CardTitle>
        <CardDescription>Free from {substanceOfAbuse}</CardDescription>
      </CardFooter>
    </Card>
  );
}
