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

  const updateJournalEntry = async () => {
    await fetch(`/api/journal?id=${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: entryTitle, content: text }),
    });
  };

  useAutosave({
    data: [entryTitle, text],
    onSave: updateJournalEntry,
    interval: 2000, // this is the default value
  });

  return (
    <Container>
      <form>
        <FlexCol className="gap-1">
          <label htmlFor="title" className="sr-only">
            Journal entry title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="mb-4 mt-6 p-4 text-xl font-semibold"
            placeholder="Title"
            value={entryTitle}
            onChange={(e) => setEntryTitle(e.target.value)}
          />
          <label htmlFor="journal-text-editor">
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
        <Button intent="tertiary" className="mt-4">
          Interpret
        </Button>
      </form>
    </Container>
  );
}
