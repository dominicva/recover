'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import TextareaAutosize from 'react-textarea-autosize';

export default function NewNote() {
  const handleNoteSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const note = e.currentTarget.note.value;

    try {
      const response = await fetch('/api/motivation/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note }),
      });
      if (response.ok) {
        console.log('Note saved');
      }
      const { data } = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Dialog>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center gap-1">
            <DialogTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-2 hover:bg-purple">
              <Icons.stickyNote color="#000" />
            </DialogTrigger>
            <p className="font-semibold">Note</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <DialogTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-2 hover:bg-purple">
              <Icons.camera color="#000" />
            </DialogTrigger>
            <p className="font-semibold">Media</p>
          </div>
          <DialogContent className="bg-blue">
            <form onSubmit={handleNoteSubmit}>
              <DialogTitle className="mb-6 text-2xl">
                Create a new note
              </DialogTitle>
              <DialogDescription className="text-base">
                <label htmlFor="note">Write a note to your future self</label>
              </DialogDescription>
              <TextareaAutosize
                id="note"
                name="note"
                placeholder="Anything that inspires you..."
                className="mt-2 block w-full resize-none self-end rounded p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-4 focus-visible:ring-offset-2"
                minRows={6}
              />
              <Button className="mt-6 text-base" size="lg" type="submit">
                Create
              </Button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
