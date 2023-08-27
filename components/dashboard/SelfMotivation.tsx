import Link from 'next/link';
import { ChevronRight } from 'react-feather';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '../ui/button';

export default function SelfMotivation() {
  return (
    <Card className="rounded-2xl bg-gray-100">
      <div className="flex items-center justify-between">
        <CardHeader className="pb-4 pr-0">
          <CardDescription>I need some help</CardDescription>
          <CardTitle className="font-normal">Your self motivation</CardTitle>
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
      </div>
      <Button size="lg" className="mx-auto mb-4 block w-40">
        Create
      </Button>
      <CardFooter>
        <p className="text-center text-gray-400">
          Record video or audio for your future self. Remember why you started
          this journey.
        </p>
      </CardFooter>
    </Card>
  );
}
