import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import type { AchievementProps } from '@/types';
import { Icons } from '../ui/icons';

export default function RecentAchievement({
  achievement,
  substanceOfAbuse,
}: {
  achievement: AchievementProps;
  substanceOfAbuse: string;
}) {
  let icon;

  switch (achievement.label) {
    case '1 day':
      icon = <Icons.crown width={40} height={40} />;
      break;
    case '1 week':
      icon = <Icons.trophy width={40} height={40} />;
      break;
    case '2 weeks':
      icon = <Icons.pizza width={40} height={40} />;
      break;
    case '3 weeks':
      icon = <Icons.citrus width={40} height={40} />;
      break;
    case '1 month':
      icon = <Icons.cherry width={40} height={40} />;
      break;
    case '2 months':
      icon = <Icons.fish width={40} height={40} />;
      break;
    case '3 months':
      icon = <Icons.ferrisWheel width={40} height={40} />;
      break;
    case '6 months':
      icon = <Icons.pawPrint width={40} height={40} />;
      break;
    case '9 months':
      icon = <Icons.bird width={40} height={40} />;
      break;
    case '1 year':
      icon = <Icons.crown width={40} height={40} />;
    case '2 years':
      icon = <Icons.crown width={40} height={40} />;
    case '3 years':
      icon = <Icons.crown width={40} height={40} />;
    case '4 years':
      icon = <Icons.crown width={40} height={40} />;
    case '5 years':
      icon = <Icons.crown width={40} height={40} />;
    default:
      icon = <Icons.crown width={40} height={40} />;
  }

  return (
    <Card className="h-48 shrink-0 grow-0 basis-auto bg-purple">
      <CardHeader></CardHeader>
      <CardContent>{icon}</CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardTitle>{achievement.label}</CardTitle>
        <CardDescription>Free from {substanceOfAbuse}</CardDescription>
      </CardFooter>
    </Card>
  );
}
