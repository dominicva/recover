'use client';

import { useState } from 'react';
import { useRevalidate } from '@/hooks/useRevalidate';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SliderProps } from '@radix-ui/react-slider';
import ParamSlider from '@/components/questionnaire/ParamSlider';
import { formatDate } from '@/lib/dates';

export default function QuestionnairePage() {
  const revalidate = useRevalidate();

  const [mood, setMood] = useState([0] as SliderProps['defaultValue']);
  const [energy, setEnergy] = useState([0] as SliderProps['defaultValue']);
  const [motivation, setMotivation] = useState([
    0,
  ] as SliderProps['defaultValue']);
  const [anxiety, setAnxiety] = useState([0] as SliderProps['defaultValue']);
  const [depression, setDepression] = useState([
    0,
  ] as SliderProps['defaultValue']);
  const [sleepQuality, setSleepQuality] = useState([
    0,
  ] as SliderProps['defaultValue']);
  const [cravings, setCravings] = useState([0] as SliderProps['defaultValue']);

  const sliderData = [
    {
      id: 'mood',
      label: 'Mood',
      value: mood,
      setValue: setMood,
    },
    {
      id: 'energy',
      label: 'Energy',
      value: energy,
      setValue: setEnergy,
    },
    {
      id: 'motivation',
      label: 'Motivation',
      value: motivation,
      setValue: setMotivation,
    },
    {
      id: 'anxiety',
      label: 'Anxiety',
      value: anxiety,
      setValue: setAnxiety,
    },
    {
      id: 'depression',
      label: 'Depression',
      value: depression,
      setValue: setDepression,
    },
    {
      id: 'sleepQuality',
      label: 'Sleep Quality',
      value: sleepQuality,
      setValue: setSleepQuality,
    },
    {
      id: 'cravings',
      label: 'Cravings',
      value: cravings,
      setValue: setCravings,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const response = await fetch('/api/questionnaire', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(response.statusText);
      return;
    }

    revalidate({ href: '/dashboard' });
  };

  return (
    <Container>
      <section className="mb-4 p-4">
        <hgroup className="text-center">
          <h2 className="text-3xl">How are you feeling today?</h2>
          <p className="mt-3">{formatDate(new Date())}</p>
          <p className="my-4">
            For each of the categories below, select a value between 0 and 5.
          </p>
          <p className="font-semibold">0 means awful, 5 means great.</p>
        </hgroup>
      </section>
      <article className="px-3">
        <Card className="bg-blue py-3">
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              {sliderData.map(({ id, label, value, setValue }) => (
                <ParamSlider
                  key={label}
                  id={id}
                  label={label}
                  value={Number(value)}
                  setValue={setValue}
                />
              ))}

              <Button size="lg" type="submit">
                Done
              </Button>
            </form>
          </CardContent>
        </Card>
      </article>
    </Container>
  );
}
