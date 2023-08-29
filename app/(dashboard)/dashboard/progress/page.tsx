'use client';

import { useState, useEffect } from 'react';
import { format, formatDistanceToNowStrict, isBefore, sub } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
// import { useViewport } from '@/hooks/useViewport';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';

function Tick({ x, y, stroke, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    </g>
  );
}

function isDateLessThan(date: Date, compare: { [key: string]: number }) {
  const now = new Date();

  const dateToCompare = sub(now, { ...compare });

  return isBefore(date, now) && isBefore(date, dateToCompare);
}

export default function ProgressPage() {
  // const { width } = useViewport();
  // const CHART_WIDTH = Math.round(width * 0.85);

  const [data, setData] = useState([]);

  const [showMood, setShowMood] = useState(true);
  const [showEnergy, setShowEnergy] = useState(true);
  const [showMotivation, setShowMotivation] = useState(true);
  const [showAnxiety, setShowAnxiety] = useState(true);
  const [showDepression, setShowDepression] = useState(true);
  const [showSleepQuality, setShowSleepQuality] = useState(true);
  const [showCravings, setShowCravings] = useState(true);
  const [showTimeFrame, setShowTimeFrame] = useState('week');

  useEffect(() => {
    const getProgress = async () => {
      const res = await fetch('/api/questionnaire');

      let { data } = await res.json();

      for (const item of data) {
        const createdAtDate = new Date(item.createdAt);
        const timeToNow = formatDistanceToNowStrict(createdAtDate);

        const date = format(new Date(item.createdAt), 'd/MM');
        item.createdAt = date;
      }

      return data;
    };

    getProgress().then((data) => {
      setData(data);
    });
  }, []);

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl">Track your progress</h2>
      <Card>
        <CardHeader>
          <CardTitle>Your progress</CardTitle>
          <CardDescription>Based on your questionnaires</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300} className="mx-auto">
            <LineChart
              data={data}
              className="mx-auto"
              margin={{ top: 0, right: 5, left: 5, bottom: 20 }}
            >
              <XAxis dataKey="createdAt" tick={<Tick stroke="#000" />} />

              <Tooltip />

              {showMood && (
                <Line
                  type="monotone"
                  dataKey="mood"
                  stroke="#0a6ff8"
                  strokeWidth={2}
                  onClick={() => setShowMood(false)}
                />
              )}

              {showEnergy && (
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="#FF7E1D"
                  strokeWidth={2}
                />
              )}

              {showMotivation && (
                <Line
                  type="monotone"
                  dataKey="motivation"
                  stroke="#FECE00"
                  strokeWidth={2}
                />
              )}

              {showAnxiety && (
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#5BBBFF"
                  strokeWidth={2}
                />
              )}

              {showDepression && (
                <Line
                  type="monotone"
                  dataKey="depression"
                  stroke="#0540FF"
                  strokeWidth={2}
                />
              )}

              {showSleepQuality && (
                <Line
                  type="monotone"
                  dataKey="sleepQuality"
                  stroke="#5330A5"
                  strokeWidth={2}
                />
              )}

              {showCravings && (
                <Line
                  type="monotone"
                  dataKey="cravings"
                  stroke="#281465"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-10 flex flex-wrap gap-3">
            <Toggle
              className="bg-primary text-white"
              onClick={() => setShowMood(!showMood)}
            >
              Mood
            </Toggle>

            <Toggle
              className="bg-secondary text-white"
              onClick={() => setShowEnergy(!showEnergy)}
            >
              Energy
            </Toggle>

            <Toggle
              className="bg-tertiary text-white"
              onClick={() => setShowMotivation(!showMotivation)}
            >
              Motivation
            </Toggle>

            <Toggle
              className="bg-blue-lighter text-white"
              onClick={() => setShowAnxiety(!showAnxiety)}
            >
              Anxiety
            </Toggle>

            <Toggle
              className="bg-blue-darker text-white"
              onClick={() => setShowDepression(!showDepression)}
            >
              Depression
            </Toggle>

            <Toggle
              className="bg-purple-lighter text-white"
              onClick={() => setShowSleepQuality(!showSleepQuality)}
            >
              Sleep quality
            </Toggle>

            <Toggle
              className="bg-purple-darker text-white"
              onClick={() => setShowCravings(!showCravings)}
            >
              Cravings
            </Toggle>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
