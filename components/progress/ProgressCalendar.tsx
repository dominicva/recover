'use client';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { DayClickEventHandler } from 'react-day-picker';
import { isSameDay } from 'date-fns';
import type { Questionnaire } from '@prisma/client';

function ProgressChart({ questionnaire }: { questionnaire: Questionnaire }) {
  const { anxiety, cravings, mood, motivation, sleepQuality } = questionnaire;
  return (
    <div>
      {anxiety && (
        <div>
          <h3>Anxiety</h3>
          <p>{anxiety}</p>
        </div>
      )}
      {cravings && (
        <div>
          <h3>Cravings</h3>
          <p>{cravings}</p>
        </div>
      )}
      {mood && (
        <div>
          <h3>Mood</h3>
          <p>{mood}</p>
        </div>
      )}
      {motivation && (
        <div>
          <h3>Motivation</h3>
          <p>{motivation}</p>
        </div>
      )}
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
    console.log('dayMatch', dayMatch);

    if (dayMatch) {
      const response = await fetch('/api/questionnaire');
      const { data: questionnaires } = await response.json();
      console.log('questionnaires', questionnaires);
      const selectedQuestionnaire = questionnaires.find(
        (questionnaire: Questionnaire) =>
          isSameDay(new Date(questionnaire.createdAt), day)
      );
      console.log('selectedQuestionnaire', selectedQuestionnaire);
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
    <div className="my-12 rounded-xl bg-blue">
      <Calendar
        mode="single"
        modifiers={{ hasQuestionnaire: daysWithQuestionnaire }}
        onDayClick={handleDayClick}
        modifiersStyles={{ hasQuestionnaire: hasQuestionnaireStyle }}
        className="rounded-md border"
      />
      {progressChart && <ProgressChart questionnaire={progressChart} />}
    </div>
  );
}
