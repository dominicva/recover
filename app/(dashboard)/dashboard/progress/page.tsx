import { CardDescription, CardTitle } from '@/components/ui/card';
import { ProgressChart, ProgressCalendar } from '@/components/progress';

export default function ProgressPage() {
  return (
    <div className="col-span-5 row-span-3 min-h-screen px-2 lg:min-h-full">
      <h2 className="mb-6 mt-4 text-center text-4xl font-semibold lg:text-left">
        Your progress
      </h2>
      <section className="rounded-2xl bg-purple">
        <div className="px-5 pt-6">
          <CardTitle className="mb-2 text-2xl font-normal">
            Your progress
          </CardTitle>
          <CardDescription className=" text-body-text">
            Based on your questionnaires
          </CardDescription>
        </div>
        <div className="p-6">
          <ProgressChart />
        </div>
      </section>
      <ProgressCalendar />
    </div>
  );
}
