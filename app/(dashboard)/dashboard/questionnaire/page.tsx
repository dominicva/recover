'use client';

import { useState } from 'react';
import { useRevalidate } from '@/hooks/useRevalidate';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { SliderProps } from '@radix-ui/react-slider';

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
    <Container as="main">
      <section className="p-4">
        <h2 className="text-center text-3xl">How are you feeling today?</h2>
        <p className="my-4 text-center">
          For each of the categories below, select a value between 0 and 5. 0
          means terrible, 5 means great.
        </p>
      </section>
      <section>
        <Card>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <div>
                <div className="mb-4">
                  <label htmlFor="mood">Mood</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {mood}
                  </span>
                </div>
                <Slider
                  id="mood"
                  name="mood"
                  max={5}
                  step={1}
                  defaultValue={[Number(mood)]}
                  onValueChange={setMood}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="energy">Energy</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {energy}
                  </span>
                </div>
                <Slider
                  id="energy"
                  name="energy"
                  max={5}
                  step={1}
                  defaultValue={[Number(energy)]}
                  onValueChange={setEnergy}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="motivation">Motivation</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {motivation}
                  </span>
                </div>
                <Slider
                  id="motivation"
                  name="motivation"
                  max={5}
                  step={1}
                  defaultValue={[Number(motivation)]}
                  onValueChange={setMotivation}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="anxiety">Anxiety</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {anxiety}
                  </span>
                </div>
                <Slider
                  id="anxiety"
                  name="anxiety"
                  max={5}
                  step={1}
                  defaultValue={[Number(anxiety)]}
                  onValueChange={setAnxiety}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="depression">Depression</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {depression}
                  </span>
                </div>
                <Slider
                  id="depression"
                  name="depression"
                  max={5}
                  step={1}
                  defaultValue={[Number(depression)]}
                  onValueChange={setDepression}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="sleepQuality">Sleep Quality</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {sleepQuality}
                  </span>
                </div>
                <Slider
                  id="sleepQuality"
                  name="sleepQuality"
                  max={5}
                  step={1}
                  defaultValue={[Number(sleepQuality)]}
                  onValueChange={setSleepQuality}
                />
              </div>
              <div>
                <div className="mb-4">
                  <label htmlFor="cravings">Cravings</label>
                  <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                    {cravings}
                  </span>
                </div>
                <Slider
                  id="cravings"
                  name="cravings"
                  max={5}
                  step={1}
                  defaultValue={[Number(cravings)]}
                  onValueChange={setCravings}
                />
              </div>
              <Button size="lg" type="submit">
                Done
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
}
