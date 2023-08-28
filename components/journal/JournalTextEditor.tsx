'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { useChat } from 'ai/react';
// @ts-ignore
import { useAutosave } from 'react-autosave';
import TextareaAutosize from 'react-textarea-autosize';
import Container from '@/components/ui/Container';
import { FlexCol } from '../ui/Flex';
import { Button } from '../ui/button';
import { Icons } from '@/components/ui/icons';
import type { JournalEntry } from '@prisma/client';
import Link from 'next/link';

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

  const router = useRouter();
  const [, startTransition] = useTransition();

  const [entryTitle, setEntryTitle] = useState(
    title ?? `Journal entry ${createdAt.toLocaleDateString()}`
  );
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getEntry = async () => {
      const res = await fetch(`/api/journal?id=${id}`);

      const { data } = await res.json();

      return data;
    };

    getEntry().then((data) => {
      setEntryTitle(data.title);
      setInput(data.content);
    });
  }, [isLoading, id, setInput]);

  const updateJournalEntry = async () => {
    setIsSaving(true);

    const response = await fetch(`/api/journal?id=${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: entryTitle, content: input }),
    });

    setIsSaving(false);

    if (!response.ok) {
      const { error } = await response.json();
      console.error(error);
      return;
    }

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 2000);

    startTransition(() => {
      router.refresh();
    });
  };

  useAutosave({
    data: entryTitle,
    onSave: updateJournalEntry,
    interval: 2000,
  });
  useAutosave({
    data: input,
    onSave: updateJournalEntry,
    interval: 2000,
  });

  return (
    <>
      <FlexCol className="gap-1">
        <Link href="/dashboard">
          <Icons.arrowLeft />
        </Link>
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
        <label htmlFor="journal-text-editor" className="sr-only pl-4">
          Write down anything that comes to mind
        </label>
        <div className="prose prose-stone dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="journal-text-editor"
            name="journal-text-editor"
            placeholder="Write your thoughts here..."
            className="w-full resize-none appearance-none overflow-hidden bg-transparent p-4 font-bold focus:outline-none"
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className="px-4">
          {isSaving ? (
            <Icons.spinner className="animate-spin" />
          ) : success ? (
            <div className="flex gap-2">
              <Icons.check />
              <span>Saved</span>
            </div>
          ) : null}
        </div>
      </FlexCol>

      <form onSubmit={handleSubmit}>
        <Button type="submit" className="mt-4">
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
