'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { SliderProps } from '@radix-ui/react-slider';

export default function QuestionnairePage() {
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

    const json = await response.json();

    console.log('respnse', json);
  };

  return (
    <Container as="main">
      <section className="p-4">
        <h2 className="text-center text-3xl">How are you feeling today?</h2>
      </section>
      <section>
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
              <div>
                <label htmlFor="mood">Mood</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {mood}
                </span>
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
                <label htmlFor="energy">Energy</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {energy}
                </span>
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
                <label htmlFor="motivation">Motivation</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {motivation}
                </span>
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
                <label htmlFor="anxiety">Anxiety</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {anxiety}
                </span>
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
                <label htmlFor="depression">Depression</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {depression}
                </span>
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
                <label htmlFor="sleepQuality">Sleep Quality</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {sleepQuality}
                </span>
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
                <label htmlFor="cravings">Cravings</label>
                <span className="text-muted-foreground hover:border-border w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm">
                  {cravings}
                </span>
                <Slider
                  id="cravings"
                  name="cravings"
                  max={5}
                  step={1}
                  defaultValue={[Number(cravings)]}
                  onValueChange={setCravings}
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </Container>
  );
}
