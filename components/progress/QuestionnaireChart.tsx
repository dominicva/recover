import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { format } from 'date-fns';
import type { Questionnaire } from '@prisma/client';

export default function QuestionnaireChart({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) {
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
    <div className="mx-auto mt-8  w-[320px] lg:mx-0">
      <h3 className="mb-8 text-xl">
        {format(new Date(questionnaire.createdAt), 'EEEE dd MMM y')}
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={400} height={400} data={data} className="-mt-16">
          <XAxis dataKey="name" fontSize={13} />
          <YAxis type="number" hide={true} domain={[0, 5]} />

          <Bar dataKey="score" fill="#E5CDFF" background={false}>
            <LabelList dataKey="score" position="top" fontSize={16} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
