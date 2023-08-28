import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

export default function YourProgress() {
  return (
    <Card className="flex items-center justify-between rounded-2xl bg-gray-100">
      <CardHeader className="pr-0">
        <CardTitle className="font-normal">Your progress</CardTitle>
        <CardDescription>Based on questionnaires</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Link
          href="/dashboard/questionnaire/new"
          className={buttonVariants({
            size: 'icon',
            variant: 'outline',
          })}
        >
          <ChevronRight />
        </Link>
      </CardContent>
    </Card>
  );
}
