'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useTransition } from 'react';
import { useChat } from 'ai/react';
// @ts-ignore
import { useAutosave } from 'react-autosave';
import TextareaAutosize from 'react-textarea-autosize';
import { format } from 'date-fns';
import Container from '@/components/ui/Container';
import { FlexCol, FlexRow } from '../ui/Flex';
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
    body: { journalEntryId: id },
    onFinish: async (data) => {
      await fetch(`/api/journal/completion?id=${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completion: data.content }),
      });
    },
  });

  const router = useRouter();
  const [, startTransition] = useTransition();

  const [entryTitle, setEntryTitle] = useState('');
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

  // const handleGetAdvice = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const currentEntryContent = input;

  //   handleSubmit(e);

  //   setInput(currentEntryContent);
  // };

  return (
    <>
      <FlexCol className="gap-1">
        <Link href="/dashboard">
          <Icons.arrowLeft />
        </Link>

        <div className="mt-8 p-2">
          <FlexRow className="justify-between">
            <p>{format(createdAt, 'EEE, MMM d hh:mm a')}</p>
            {isSaving ? (
              <Icons.spinner className="animate-spin" />
            ) : success ? (
              <div className="flex gap-1">
                <Icons.check />
                <span>Saved</span>
              </div>
            ) : null}
          </FlexRow>

          <label htmlFor="title" className="sr-only">
            Journal entry title
          </label>
          <TextareaAutosize
            autoFocus
            id="title"
            name="title"
            placeholder="Add title"
            className="mt-4 w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none"
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
              className="mt-6 w-full resize-none appearance-none overflow-hidden bg-transparent  font-bold focus:outline-none"
              value={input}
              onChange={handleInputChange}
            />
          </div>

          <div className="min-h-[500px]" />
        </div>
      </FlexCol>

      <form onSubmit={handleSubmit}>
        <Button type="submit" size="lg" className="mx-auto mt-4 block w-11/12">
          Get advice
        </Button>
      </form>

      <Container className="my-12">
        {messages.slice(1).map((message, index) => (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: message.content }}
          ></div>
        ))}
      </Container>
    </>
  );
}
