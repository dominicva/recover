'use client';

import { useState, useEffect } from 'react';
import Container from '@/components/utils/Container';
import { FlexCol } from '../utils/Flex';
import Button from '../buttons/Button';

export default function JournalTextEditor() {
  const [text, setText] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('journal-text') ?? '';
    }
    return '';
  });

  useEffect(() => {
    window.localStorage.setItem('journal-text', text);

    return () => {
      window.localStorage.removeItem('journal-text');
    };
  }, [text]);

  return (
    <Container>
      <h2 className="mb-4 text-xl font-semibold">How are you feeling?</h2>

      <form>
        <FlexCol className="gap-1">
          <label htmlFor="journal-text-editor">
            Write down anything that comes to mind 🫶
          </label>
          <textarea
            id="journal-text-editor"
            name="journal-text-editor"
            className="h-96 w-full resize-none rounded-lg border-2 border-gray-300 bg-gray-100 p-4 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
            placeholder="Write your thoughts here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </FlexCol>
        <Button className="mt-4">Interpret</Button>
      </form>
    </Container>
  );
}
