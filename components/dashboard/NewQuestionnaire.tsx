import clsx from 'clsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NewQuestionnaireLink } from './Buttons';

export default function NewQuestionnaire({ pathname }: { pathname?: string }) {
  const className = clsx(
    'flex items-center justify-between rounded-2xl bg-light-gray lg:col-span-2 lg:row-span-1',
    pathname?.startsWith('/dashboard/journal') && 'bg-purple max-w-sm'
  );

  return (
    <Card className={className}>
      <CardHeader className="px-5">
        <CardTitle className="font-normal">How do you feel today?</CardTitle>
        <CardDescription>Complete a quick questionnaire</CardDescription>
      </CardHeader>
      <CardContent className="pb-0 pr-5">
        <NewQuestionnaireLink pathname={pathname} />
      </CardContent>
    </Card>
  );
}
