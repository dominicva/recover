import {
  Bar,
  BarChart,
  Label,
  LabelList,
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
  console.log('questionnaire', questionnaire);
  const { anxiety, cravings, mood, motivation, sleepQuality } = questionnaire;

  const data = [
    {
      name: 'Mood',
      score: mood,
    },
    {
      name: 'Motivation',
      score: motivation,
    },
    {
      name: 'Anxiety',
      score: anxiety,
    },
    {
      name: 'Sleep',
      score: sleepQuality,
    },
    {
      name: 'Cravings',
      score: cravings,
    },
  ];

  return (
    <div className="mx-auto max-w-[348px] lg:mx-0">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={400} height={400} data={data}>
          <XAxis dataKey="name" fontSize={13} />
          <Bar dataKey="score" fill="#E5CDFF" background={false}>
            <LabelList dataKey="score" position="top" fontSize={16} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
