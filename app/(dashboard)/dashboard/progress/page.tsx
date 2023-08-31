import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { ProgressChart, ProgressCalendar } from '@/components/progress';

export default function ProgressPage() {
  return (
    <div className="px-2">
      <h2 className="mb-6 mt-4 text-center text-4xl font-semibold">
        Your progress
      </h2>
      <section className="rounded-2xl bg-purple">
        <div className="px-4 pt-6">
          <CardTitle className="mb-2 text-2xl font-normal">
            Your progress
          </CardTitle>
          <CardDescription className=" text-body-text">
            Based on your questionnaires
          </CardDescription>
        </div>
        <ProgressChart />
      </section>
      {/* <ProgressCalendar /> */}
    </div>
  );
}
