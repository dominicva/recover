'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DayClickEventHandler } from 'react-day-picker';
import { isSameDay } from 'date-fns';
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
  LineChart,
} from 'recharts';
import type { Questionnaire } from '@prisma/client';
import Tick from './Tick';

function ProgressChart({ questionnaire }: { questionnaire: Questionnaire }) {
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
          <Tooltip />
          {chartItems.map((item) => (
            <Bar
              key={item.dataKey}
              dataKey={item.dataKey}
              fill={item.fill}
              barSize={40}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ProgressCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [hasQuestionnaire, setHasQuestionnaire] = useState<boolean>(false);
  const [daysWithQuestionnaire, setDaysWithQuestionnaire] = useState<Date[]>(
    []
  );

  const [progressChart, setProgressChart] = useState<
    Questionnaire | undefined
  >();

  const hasQuestionnaireStyle = { backgroundColor: '#000', color: '#fff' };

  const handleDayClick: DayClickEventHandler = async (day, modifiers) => {
    const dayMatch = daysWithQuestionnaire.find((d) => isSameDay(d, day));

    if (dayMatch) {
      const response = await fetch('/api/questionnaire');
      const { data: questionnaires } = await response.json();
      const selectedQuestionnaire = questionnaires.find(
        (questionnaire: Questionnaire) =>
          isSameDay(new Date(questionnaire.createdAt), day)
      );

      setProgressChart(selectedQuestionnaire);
    }
    setHasQuestionnaire(day && modifiers.hasQuestionnaire);
  };

  useEffect(() => {
    const getQuestionnaireDates = async () => {
      const response = await fetch('/api/questionnaire');

      const { data: questionnaires } = await response.json();

      const dates = questionnaires.map(
        (questionnaire: Questionnaire) => new Date(questionnaire.createdAt)
      );

      return dates;
    };
    getQuestionnaireDates().then(setDaysWithQuestionnaire);
  }, []);

  return (
    <section>
      <article className="my-12 rounded-xl bg-blue">
        <Calendar
          mode="single"
          modifiers={{ hasQuestionnaire: daysWithQuestionnaire }}
          onDayClick={handleDayClick}
          modifiersStyles={{ hasQuestionnaire: hasQuestionnaireStyle }}
          className="rounded-md border"
        />
      </article>
      {progressChart && <ProgressChart questionnaire={progressChart} />}
    </section>
  );
}
