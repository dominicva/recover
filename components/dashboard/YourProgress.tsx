import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProgressChart } from '../progress';
import { ProgressLink } from './Buttons';

export default function YourProgress() {
  return (
    <Card className="flex w-full flex-col items-center justify-between rounded-2xl bg-purple lg:col-span-3 lg:row-span-3">
      <CardHeader className="flex w-full flex-row justify-between self-start px-5 pb-0">
        <div>
          <CardTitle className="mb-2 text-2xl font-normal">
            Your progress
          </CardTitle>
          <CardDescription className=" text-body-text">
            Based on your questionnaires
          </CardDescription>
        </div>
        <ProgressLink />
      </CardHeader>
      <CardContent className="self-start px-5 lg:self-center">
        <ProgressChart />
      </CardContent>
    </Card>
  );
}
