import Link from 'next/link';
import { Plus } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '../ui/button';

export default function NewQuestionnaire() {
  return (
    <Card className="flex items-center justify-between rounded-2xl bg-gray-100">
      <CardHeader className="pr-0">
        <CardTitle className="font-normal">How do you feel today?</CardTitle>
        <CardDescription>Complete a quick questionnaire</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Link
          href="/dashboard/questionnaire"
          className={buttonVariants({
            size: 'icon',
            variant: 'outline',
          })}
        >
          <Plus color="#000" />
        </Link>
      </CardContent>
    </Card>
  );
}
