'use client';

import { useState, useEffect } from 'react';

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  LineChart,
} from 'recharts';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Card, CardContent } from '@/components/ui/card';
import AreaItem from './AreaItem';
import DataParamToggle from './DataParamToggle';
import Tick from './Tick';

import { format } from 'date-fns';
import { isWithinXDays } from '@/lib/dates';
import { average } from '@/lib/math';

import type { ExtendedQuestionnaire } from '@/types/ExtendedQuestionnaire';

export default function ProgressChart({ onDashboard = false }) {
  const [data, setData] = useState([] as ExtendedQuestionnaire[]);

  const [showAverage, setShowAverage] = useState(true);
  const [showMood, setShowMood] = useState(false);
  const [showMotivation, setShowMotivation] = useState(false);
  const [showAnxiety, setShowAnxiety] = useState(false);
  const [showSleepQuality, setShowSleepQuality] = useState(false);
  const [showCravings, setShowCravings] = useState(false);

  const [showTimeFrame, setShowTimeFrame] = useState('all');

  const chartItems = [
    {
      dataKey: 'averageScore',
      stroke: '#fff',
      fill: '#fff',
    },
    {
      dataKey: 'mood',
      stroke: '#AD91CC',
      fill: '#AD91CC',
    },
    {
      dataKey: 'motivation',
      stroke: '#76C2FF',
      fill: '#76C2FF',
    },
    {
      dataKey: 'anxiety',
      stroke: '#4D5358',
      fill: '#4D5358',
    },
    {
      dataKey: 'sleepQuality',
      stroke: '#878D96',
      fill: '#878D96',
    },
    {
      dataKey: 'cravings',
      stroke: '#281465',
      fill: '#281465',
    },
  ];

  const dataParams = [
    {
      text: 'Average',
      className: 'bg-black text-white',
      setState: setShowAverage,
    },
    {
      text: 'Mood',
      className: 'bg-dark-purple text-white',
      setState: setShowMood,
    },
    {
      text: 'Motivation',
      className: 'bg-dark-blue text-white',
      setState: setShowMotivation,
    },
    {
      text: 'Anxiety',
      className: 'bg-neutral-4 text-white',
      setState: setShowAnxiety,
    },
    {
      text: 'Sleep quality',
      className: 'bg-neutral-3 text-white',
      setState: setShowSleepQuality,
    },
    {
      text: 'Cravings',
      className: 'bg-purple-darker text-white',
      setState: setShowCravings,
    },
  ];

  useEffect(() => {
    const getProgress = async () => {
      const res = await fetch('/api/questionnaire');

      const { data } = await res.json();

      for (const item of data) {
        const scores = [
          item.mood,
          item.motivation,
          item.anxiety,
          item.sleepQuality,
          item.cravings,
        ];

        const averageScore = average(...scores);

        item.averageScore = averageScore;
        item.dateToDisplay = format(new Date(item.createdAt), 'd/MM');
      }

      return data;
    };

    const filterProgress = (data: ExtendedQuestionnaire[]) => {
      if (showTimeFrame === 'week') {
        data = data.filter((item: ExtendedQuestionnaire) =>
          isWithinXDays(new Date(item.createdAt), 7)
        );
      } else if (showTimeFrame === 'month') {
        data = data.filter((item: any) =>
          isWithinXDays(new Date(item.createdAt), 30)
        );
      } else if (showTimeFrame === 'all') {
        data = data;
      }

      data.sort((a: ExtendedQuestionnaire, b: ExtendedQuestionnaire) => {
        const diff =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        return diff;
      });

      return data;
    };

    getProgress().then(filterProgress).then(setData).catch(console.error);
  }, [showTimeFrame]);

  return (
    <Card className="bg-transparent p-4 px-5">
      <CardContent className="p-0">
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
            className="rounded-lg border-2 bg-transparent px-2 py-1 data-[state=off]:border-dark-purple data-[state=on]:border-black data-[state=off]:text-dark-purple data-[state=on]:text-black"
          >
            Week
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="month"
            className="rounded-lg border-2 bg-transparent px-2 py-1 data-[state=off]:border-dark-purple data-[state=on]:border-black data-[state=off]:text-dark-purple data-[state=on]:text-black"
          >
            Month
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="all"
            className="rounded-lg border-2 bg-transparent px-2 py-1 data-[state=off]:border-dark-purple data-[state=on]:border-black data-[state=off]:text-dark-purple data-[state=on]:text-black"
          >
            All
          </ToggleGroup.Item>
        </ToggleGroup.Root>
        <ResponsiveContainer width="100%" height={280} className="mx-auto">
          <LineChart
            data={data}
            className="mx-auto"
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <XAxis
              dataKey="dateToDisplay"
              tick={<Tick stroke="#000" />}
              domain={['dataMin', 'dataMax']}
            />

            <Tooltip />

            {chartItems.map((item) => {
              if (item.dataKey === 'averageScore' && showAverage) {
                return (
                  <Line
                    key={item.dataKey}
                    dot={{ fill: '#000', strokeWidth: 1 }}
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#000"
                    strokeWidth={2}
                  />
                );
              } else if (item.dataKey === 'mood' && showMood) {
                /**
                 * there is an unusual issue here where invoking AreaItem as a component
                 * <AreaItem item={item} /> doesn't work, but invoking it as a function
                 * AreaItem(item) does work.
                 */
                return AreaItem(item);
              } else if (item.dataKey === 'motivation' && showMotivation) {
                return AreaItem(item);
              } else if (item.dataKey === 'anxiety' && showAnxiety) {
                return AreaItem(item);
              } else if (item.dataKey === 'sleepQuality' && showSleepQuality) {
                return AreaItem(item);
              } else if (item.dataKey === 'cravings' && showCravings) {
                return AreaItem(item);
              }
            })}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-10 flex flex-wrap gap-3">
          {dataParams.map((param) => (
            <DataParamToggle
              defaultPressed={param.text !== 'Average'}
              key={param.text}
              text={param.text}
              className={param.className}
              setState={param.setState}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
