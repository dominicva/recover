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
  const { anxiety, cravings, mood, motivation, sleepQuality } = questionnaire;

  //   const data = [
  //     {
  //       anxiety,
  //       cravings,
  //       mood,
  //       motivation,
  //       sleepQuality,
  //     },
  //   ];

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

  const chartItems = [
    {
      name: 'Mood',
      dataKey: 'score',
      stroke: '#AD91CC',
      fill: '#AD91CC',
    },

    {
      name: 'Motivation',
      dataKey: 'score',
      stroke: '#76C2FF',
      fill: '#76C2FF',
    },
    {
      name: 'Anxiety',
      dataKey: 'score',
      stroke: '#4D5358',
      fill: '#4D5358',
    },
    {
      name: 'Sleep',
      dataKey: 'score',
      stroke: '#878D96',
      fill: '#878D96',
    },
    {
      name: 'Cravings',
      dataKey: 'score',
      stroke: '#281465',
      fill: '#281465',
    },
    // {
    //   dataKey: 'mood',
    //   stroke: '#AD91CC',
    //   fill: '#AD91CC',
    // },

    // {
    //   dataKey: 'motivation',
    //   stroke: '#76C2FF',
    //   fill: '#76C2FF',
    // },
    // {
    //   dataKey: 'anxiety',
    //   stroke: '#4D5358',
    //   fill: '#4D5358',
    // },
    // {
    //   dataKey: 'sleepQuality',
    //   stroke: '#878D96',
    //   fill: '#878D96',
    // },
    // {
    //   dataKey: 'cravings',
    //   stroke: '#281465',
    //   fill: '#281465',
    // },
  ];

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={400} height={400} data={data}>
          <XAxis dataKey="name" fontSize={13} />

          <Bar dataKey="score" fill="#E5CDFF" background={false}>
            <LabelList dataKey="score" position="top" fontSize={16} />
          </Bar>
          {/* {chartItems.map((item) => (
            <Bar
              key={item.dataKey}
              dataKey={'score'}
              fill={item.fill}
              barSize={40}
              label={{ position: 'top', fontWeight: 'medium', fontSize: 18 }}
            >
              <LabelList dataKey={item.name} position="top" />
            </Bar>
          ))} */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
