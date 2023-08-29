'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { useViewport } from '@/hooks/useViewport';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';

const data = [
  {
    name: 'Week 1',
    mood: 1,
    energy: 3,
    motivation: 2,
    anxiety: 4,
    depression: 5,
    sleepQuality: 3,
    cravings: 2,
  },
  {
    name: 'Week 2',
    mood: 2,
    energy: 4,
    motivation: 3,
    anxiety: 5,
    depression: 4,
    sleepQuality: 4,
    cravings: 0,
  },
  {
    name: 'Week 3',
    mood: 5,
    energy: 5,
    motivation: 4,
    anxiety: 4,
    depression: 3,
    sleepQuality: 2,
    cravings: 5,
  },
];

export default function ProgressPage() {
  const { width } = useViewport();

  const chartWidth = Math.round(width * 0.85);

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl">Track your progress</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your progress</CardTitle>
          <CardDescription>Based on your questionnaires</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={360} className="mx-auto">
            <LineChart data={data} className="mx-auto">
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="mood"
                stroke="#8884d8"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#FF7E1D"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="motivation"
                stroke="#FECE00"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="anxiety"
                stroke="#0540FF"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="depression"
                stroke="#2D2C2B"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="sleepQuality"
                stroke="#281465"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="cravings"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
