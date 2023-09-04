import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { Questionnaire } from '@prisma/client';

export default function QuestionnaireChart({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) {
  const { anxiety, cravings, mood, motivation, sleepQuality } = questionnaire;
  const data = [
    {
      anxiety,
      cravings,
      mood,
      motivation,
      sleepQuality,
    },
  ];

  const chartItems = [
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

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={400} height={400} data={data} barGap={14}>
          {chartItems.map((item) => (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              fill={item.fill}
              barSize={40}
              label={{ position: 'top', fontWeight: 'medium', fontSize: 18 }}
              //   background={{ fill: '#eee' }}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
