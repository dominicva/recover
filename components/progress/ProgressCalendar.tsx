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
import QuestionnaireChart from './QuestionnaireChart';

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
    // <section>
    <article className="my-12 rounded-xl">
      <Calendar
        mode="single"
        modifiers={{ hasQuestionnaire: daysWithQuestionnaire }}
        onDayClick={handleDayClick}
        modifiersStyles={{ hasQuestionnaire: hasQuestionnaireStyle }}
        className="mx-auto max-w-[348px] rounded-md bg-blue py-8 lg:mx-0"
      />
      {progressChart && <QuestionnaireChart questionnaire={progressChart} />}
    </article>
    // </section>
  );
}
