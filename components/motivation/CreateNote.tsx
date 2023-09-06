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
import { useRevalidate } from '@/hooks/useRevalidate';

export default function NewNote() {
  const revalidate = useRevalidate();
  const [open, setOpen] = useState(false);

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
        revalidate({ href: '/dashboard/recording' });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex justify-center gap-16">
          <div className="flex flex-col items-center gap-1">
            <DialogTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-2 hover:bg-blue">
              <Icons.stickyNote color="#000" />
            </DialogTrigger>
            <p className="font-semibold">Note</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <DialogTrigger className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-2 hover:bg-blue">
              <Icons.camera color="#000" />
            </DialogTrigger>
            <p className="font-semibold">Media</p>
          </div>
          <DialogContent className="top-[30%] bg-blue md:top-1/2">
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
