'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { useChat } from 'ai/react';
// @ts-ignore
import { useAutosave } from 'react-autosave';
import type { JournalEntry } from '@prisma/client';
import Container from '@/components/ui/Container';
import { FlexCol } from '../ui/Flex';
import Button from '../ui/buttons/Button';

export default function JournalTextEditor({
  id,
  title,
  createdAt,
}: JournalEntry) {
  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useChat({
    api: '/api/completion',
  });

  console.log('messages', messages);

  // TODO: write my own handleSubmit that calls handleSubmit(e) and preserves the
  // textarea state

  const [entryTitle, setEntryTitle] = useState(
    title ?? `Journal entry ${createdAt.toLocaleDateString()}`
  );

  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getEntry = async () => {
      const res = await fetch(`/api/journal?id=${id}`);
      const { data } = await res.json();

      setEntryTitle(data.title);
      setInput(data.content);
    };

    getEntry();
    /**
     * This is a hacky way to prevent the journal entry
     * from being cleared when the form is submitted.
     * the handleSubmit helper function provided by useChat
     * automatically clears the input field.
     */
  }, [isLoading, id, setInput]);

  const updateJournalEntry = async () => {
    setIsSaving(true);
    await fetch(`/api/journal?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: entryTitle, content: input }),
    });
    setIsSaving(false);
    startTransition(() => {
      router.refresh();
    });
  };

  /**
   * Had to use two separate instances of useAutosave.
   * When passing [entryTitle, text] as the data prop, the auto-save was saving the
   * changes to the database, but it initiated a re-save interval
   * instead of only auto-saving when the user changed the text or title.
   */
  useAutosave({
    data: entryTitle,
    onSave: updateJournalEntry,
    interval: 2000, // this is the default value
  });
  useAutosave({
    data: input,
    onSave: updateJournalEntry,
    interval: 2000, // this is the default value
  });

  return (
    <>
      {/* <Container className="mx-auto mb-20 max-w-lg">
        <h2 className="mb-4 text-xl font-semibold">
          Track your mood over time
        </h2>
        <form>
          <fieldset>
            <legend className="mb-8 font-bold">
              Rate how you feel along each of the following dimensions:
            </legend>
            <FlexCol className="mx-auto max-w-sm gap-4">
              <label htmlFor="mood">Mood (4)</label>
              <input type="range" name="mood" id="mood" min="1" max="5" />
              <label htmlFor="energy">Energy (4)</label>
              <input type="range" name="energy" id="energy" min="1" max="5" />
              <label htmlFor="motivation">Motivation (3)</label>
              <input
                type="range"
                name="motivation"
                id="motivation"
                min="1"
                max="5"
              />
              <label htmlFor="anxiety">Anxiety (1)</label>
              <input type="range" name="anxiety" id="anxiety" min="1" max="5" />
              <label htmlFor="depression">Depression (2)</label>
              <input
                type="range"
                name="depression"
                id="depression"
                min="1"
                max="5"
              />
              <label htmlFor="sleepQuality">Sleep quality (2)</label>
              <input
                type="range"
                name="sleepQuality"
                id="sleepQuality"
                min="1"
                max="5"
              />
              <label htmlFor="cravings">Cravings (5)</label>
              <input
                type="range"
                name="cravings"
                id="cravings"
                min="1"
                max="5"
              />
            </FlexCol>
          </fieldset>
        </form>
      </Container> */}
      {isSaving && <p>Saving...</p>}
      <form onSubmit={handleSubmit}>
        <FlexCol className="gap-1">
          <label htmlFor="title" className="sr-only">
            Journal entry title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mb-1 p-4 text-xl font-semibold"
            placeholder="Title"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          />
          <label htmlFor="journal-text-editor" className="pl-4">
            Write down anything that comes to mind 🫶
          </label>
          <textarea
            id="journal-text-editor"
            name="journal-text-editor"
            className="h-[60vh] resize-none rounded-lg border-2 border-gray-300 bg-gray-100 p-4 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Write your thoughts here..."
            value={input}
            onChange={handleInputChange}
          />
        </FlexCol>
        <Button type="submit" intent="tertiary" className="mt-4">
          Get advice
        </Button>
      </form>
      <Container className="my-12">
        {messages.slice(1).map((m, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: m.content }}
          ></div>
        ))}
      </Container>
    </>
  );
}
