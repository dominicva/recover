'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useTransition, useRef } from 'react';
import clsx from 'clsx';
import { useChat } from 'ai/react';
// @ts-ignore
import { useAutosave } from 'react-autosave';
import TextareaAutosize from 'react-textarea-autosize';
import { NewQuestionnaire } from '../dashboard';
import { FlexCol, FlexRow } from '../ui/Flex';
import { Button } from '../ui/button';
import { Icons } from '@/components/ui/icons';
import { formatDate } from '@/lib/dates';
import type { JournalEntry } from '@prisma/client';

export default function JournalTextEditor({
  id,
  completion,
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
    onFinish: async (data) => {
      const response = await fetch(`/api/journal/completion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, completion: data.content }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        console.error(error);
        return;
      }
    },
  });

  const [completionStarted, setCompletionStarted] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [entryTitle, setEntryTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const scrollToBottom = () => {
      if (completionStarted) {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth',
        });
      }
    };

    scrollToBottom();
  }, [isLoading]);

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

  const handleCompletionSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    handleSubmit(e);
    setCompletionStarted(true);
  };

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
        <Button
          onClick={router.back}
          variant="secondary"
          className="flex w-24 gap-1 pl-3"
        >
          <Icons.arrowLeft />
          <span>Back</span>
        </Button>
        <div className="mt-8 p-2">
          <FlexRow className="justify-between">
            <p>{formatDate(createdAt)}</p>
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
              className="mt-6 w-full resize-none appearance-none overflow-hidden bg-transparent font-bold focus:outline-none"
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="min-h-[320px]" />
        </div>
      </FlexCol>
      <NewQuestionnaire pathname={pathname} />
      <form onSubmit={handleCompletionSubmit}>
        <Button
          type="submit"
          size="lg"
          className="mx-auto mt-6 block w-11/12 max-w-sm lg:mx-0"
        >
          Ask for advice
        </Button>
      </form>
      <div
        className={clsx(
          'rounded-x my-12 h-[560px] max-w-xl overflow-auto rounded-xl p-8',
          (completionStarted || completion) && 'bg-blue'
        )}
      >
        {completion ? (
          <article
            className={clsx(
              `prose prose-stone dark:prose-invert prose-h4:mb-6 prose-strong:text-lg prose-strong:font-bold`
            )}
            dangerouslySetInnerHTML={{ __html: completion }}
          />
        ) : (
          messages
            .slice(1)
            .map((message, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: message.content }}
                className="prose prose-stone dark:prose-invert"
              ></div>
            ))
        )}
      </div>
    </>
  );
}
