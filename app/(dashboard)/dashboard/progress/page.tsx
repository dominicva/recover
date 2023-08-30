'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { isWithinXDays } from '@/lib/dates';

function Tick({ x, y, payload }: any) {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">
        {payload.value}
      </text>
    </g>
  );
}

export default function ProgressPage() {
  const [data, setData] = useState([]);

  const [showMood, setShowMood] = useState(true);
  const [showEnergy, setShowEnergy] = useState(true);
  const [showMotivation, setShowMotivation] = useState(true);
  const [showAnxiety, setShowAnxiety] = useState(true);
  const [showDepression, setShowDepression] = useState(true);
  const [showSleepQuality, setShowSleepQuality] = useState(true);
  const [showCravings, setShowCravings] = useState(true);
  const [showTimeFrame, setShowTimeFrame] = useState('all');

  useEffect(() => {
    const getProgress = async () => {
      const res = await fetch('/api/questionnaire');

      const { data } = await res.json();

      return data;
    };

    const filterProgress = (data: any) => {
      if (showTimeFrame === 'week') {
        data = data.filter((item: any) =>
          isWithinXDays(new Date(item.createdAt), 7)
        );
      } else if (showTimeFrame === 'month') {
        data = data.filter((item: any) =>
          isWithinXDays(new Date(item.createdAt), 30)
        );
      } else if (showTimeFrame === 'all') {
        data = data;
      }

      for (const item of data) {
        item.dateToDisplay = format(new Date(item.createdAt), 'd/MM');
      }

      return data;
    };

    getProgress().then(filterProgress).then(setData);
  }, [showTimeFrame]);

  return (
    <div className="px-4">
      <h2 className="mt-6 text-center text-3xl">Track your progress</h2>
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Your progress</CardTitle>
          <CardDescription>Based on your questionnaires</CardDescription>
        </CardHeader>
        <CardContent>
          <ToggleGroup.Root
            type="single"
            defaultValue="all"
            className="flex gap-3"
            onValueChange={(value) => {
              if (value) setShowTimeFrame(value);
            }}
          >
            <ToggleGroup.Item
              value="week"
              className="rounded px-2 py-1 data-[state=off]:bg-gray-200 data-[state=on]:bg-blue-lighter"
            >
              Week
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="month"
              className="rounded px-2 py-1 data-[state=off]:bg-gray-200 data-[state=on]:bg-blue-lighter"
            >
              Month
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="all"
              className="rounded px-2 py-1 data-[state=off]:bg-gray-200 data-[state=on]:bg-blue-lighter"
            >
              All
            </ToggleGroup.Item>
          </ToggleGroup.Root>
          <ResponsiveContainer width="100%" height={300} className="mx-auto">
            <AreaChart
              data={data}
              className="mx-auto"
              margin={{ top: 10, right: 5, left: 5, bottom: 20 }}
            >
              <XAxis dataKey="dateToDisplay" tick={<Tick stroke="#000" />} />

              <Tooltip />

              {showMood && (
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="#0a6ff8"
                  fill="#0a6ff8"
                  strokeWidth={2}
                  onClick={() => setShowMood(false)}
                />
              )}

              {showEnergy && (
                <Area
                  type="monotone"
                  dataKey="energy"
                  stroke="#FF7E1D"
                  fill="#FF7E1D"
                  strokeWidth={2}
                />
              )}

              {showMotivation && (
                <Area
                  type="monotone"
                  dataKey="motivation"
                  stroke="#FECE00"
                  fill="#FECE00"
                  strokeWidth={2}
                />
              )}

              {showAnxiety && (
                <Area
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#5BBBFF"
                  fill="#5BBBFF"
                  strokeWidth={2}
                />
              )}

              {showDepression && (
                <Area
                  type="monotone"
                  dataKey="depression"
                  stroke="#0540FF"
                  fill="#0540FF"
                  strokeWidth={2}
                />
              )}

              {showSleepQuality && (
                <Area
                  type="monotone"
                  dataKey="sleepQuality"
                  stroke="#5330A5"
                  fill="#5330A5"
                  strokeWidth={2}
                />
              )}

              {showCravings && (
                <Area
                  type="monotone"
                  dataKey="cravings"
                  stroke="#281465"
                  fill="#281465"
                  strokeWidth={2}
                />
              )}
            </AreaChart>
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
