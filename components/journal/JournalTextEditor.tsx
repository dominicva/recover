'use client';

import { useState } from 'react';
import Container from '@/components/utils/Container';
import { FlexCol } from '../utils/Flex';
import Button from '../buttons/Button';

export default function JournalTextEditor({ content }: { content: string }) {
  const [text, setText] = useState(content ?? '');

  return (
    <Container>
      <form>
        <FlexCol className="gap-1">
          <label htmlFor="journal-text-editor">
            Write down anything that comes to mind 🫶
          </label>
          <textarea
            id="journal-text-editor"
            name="journal-text-editor"
            className="h-[80vh] resize-none rounded-lg border-2 border-gray-300 bg-gray-100 p-4 text-lg focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
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
