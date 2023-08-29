import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

export default function ProgressPage() {
  return (
    <div>
      <h2 className="mt-6 text-center text-3xl">Track your progress</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your progress</CardTitle>
          <CardDescription>Based on your questionnaires</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
