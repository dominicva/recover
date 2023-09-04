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
import { Divide } from 'lucide-react';

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
    <article className="my-12 flex flex-wrap items-center justify-center rounded-xl lg:flex lg:gap-24">
      <Calendar
        mode="single"
        modifiers={{ hasQuestionnaire: daysWithQuestionnaire }}
        onDayClick={handleDayClick}
        modifiersStyles={{ hasQuestionnaire: hasQuestionnaireStyle }}
        className="mx-auto w-[380px] rounded-md bg-blue py-8 lg:mx-0"
      />
      <div>
        {progressChart ? (
          <QuestionnaireChart questionnaire={progressChart} />
        ) : (
          <div>here</div>
        )}
      </div>
    </article>
  );
}
