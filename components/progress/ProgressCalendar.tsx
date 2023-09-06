'use client';

import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DayClickEventHandler } from 'react-day-picker';
import { isSameDay } from 'date-fns';
import QuestionnaireChart from './QuestionnaireChart';
import { colors } from '@/lib/colors';
import { average } from '@/lib/math';
import type { Questionnaire } from '@prisma/client';

export default function ProgressCalendar() {
  const [questionnaires, setQuestionnaires] = useState<Questionnaire[]>([]);
  const [progressChart, setProgressChart] = useState<
    Questionnaire | undefined
  >();

  const daysWithQuestionnaire = questionnaires.map(
    (questionnaire: Questionnaire) => new Date(questionnaire.createdAt)
  );

  const withQuestionnaireAboveAverage = questionnaires.filter(
    (questionnaire: any) => questionnaire?.aboveAverageScore
  );

  const withQuestionnaireAboveAverageStyle = {
    backgroundColor: colors['success-dark'],
    color: '#fff',
  };

  const withQuestionnaireBelowAverage = questionnaires.filter(
    (questionnaire: any) => !questionnaire?.aboveAverageScore
  );

  const withQuestionnaireBelowAverageStyle = {
    backgroundColor: colors['error'],
    color: '#fff',
  };

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
  };

  useEffect(() => {
    const getQuestionnaires = async () => {
      const response = await fetch('/api/questionnaire');

      const { data: questionnaires } = await response.json();

      const scoresSum = questionnaires.reduce(
        (
          result: number,
          { mood, motivation, anxiety, cravings, sleepQuality }: Questionnaire
        ) => {
          return mood + motivation + anxiety + cravings + sleepQuality + result;
        },
        0
      );

      const averageQuestionnaireScore =
        scoresSum / (questionnaires.length * 5) || 0;

      return questionnaires.map((questionnaire: Questionnaire) => {
        const averageScore = average(
          questionnaire.mood,
          questionnaire.motivation,
          questionnaire.anxiety,
          questionnaire.cravings,
          questionnaire.sleepQuality
        );

        return {
          ...questionnaire,
          aboveAverageScore:
            averageScore && averageScore > averageQuestionnaireScore,
        };
      });
    };

    getQuestionnaires().then(setQuestionnaires);
  }, []);

  const footer = (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <div className="mb-3 h-8 w-8 rounded-lg bg-success-dark" />
        <p>Above average score</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-error" />
        <p>Below average score</p>
      </div>
    </div>
  );

  return (
    <article className="my-12 flex flex-wrap items-center justify-center rounded-xl lg:flex lg:gap-24">
      <Calendar
        mode="single"
        onDayClick={handleDayClick}
        modifiers={{
          withQuestionnaireAboveAverage: withQuestionnaireAboveAverage.map(
            (questionnaire: any) => new Date(questionnaire.createdAt)
          ),
          withQuestionnaireBelowAverage: withQuestionnaireBelowAverage.map(
            (questionnaire: any) => new Date(questionnaire.createdAt)
          ),
        }}
        modifiersStyles={{
          withQuestionnaireAboveAverage: withQuestionnaireAboveAverageStyle,
          withQuestionnaireBelowAverage: withQuestionnaireBelowAverageStyle,
        }}
        footer={footer}
        className="mx-auto w-[380px] rounded-md bg-blue py-8 lg:mx-0"
      />
      <div>
        {progressChart ? (
          <QuestionnaireChart questionnaire={progressChart} />
        ) : null}
      </div>
    </article>
  );
}
