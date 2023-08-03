'use client';

import { useState } from 'react';
// @ts-ignore
import { useAutosave } from 'react-autosave';
import type { JournalEntry } from '@prisma/client';
import Container from '@/components/utils/Container';
import { FlexCol } from '../utils/Flex';
import Button from '../buttons/Button';

export default function JournalTextEditor({
  id,
  title,
  content,
  createdAt,
}: JournalEntry) {
  const [entryTitle, setEntryTitle] = useState(
    title ?? `Journal entry ${createdAt.toLocaleDateString()}`
  );
  const [text, setText] = useState(content ?? '');
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const updateJournalEntry = async () => {
    setIsSaving(true);
    await fetch(`/api/journal?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: entryTitle, content: text }),
    });
    setIsSaving(false);
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
    data: text,
    onSave: updateJournalEntry,
    interval: 2000, // this is the default value
  });

  const handleAnalyze = async () => {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userContent: text }),
    });

    const { data } = await res.json();

    setAnalysis(data);
  };

  return (
    <>
      <Container>
        {isSaving && <p>Saving...</p>}
        <form>
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
              className="h-[75vh] resize-none rounded-lg border-2 border-gray-300 bg-gray-100 p-4 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
              placeholder="Write your thoughts here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </FlexCol>
          <Button onClick={handleAnalyze} intent="tertiary" className="mt-4">
            Analyze
          </Button>
        </form>
      </Container>
      <Container className="my-12">
        <div dangerouslySetInnerHTML={{ __html: analysis }}></div>
      </Container>
    </>
  );
}
