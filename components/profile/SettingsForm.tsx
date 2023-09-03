'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Icons } from '../ui/icons';
import { ExtendedUserSession } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { capitalize } from '@/lib/strings';

export default function SettingsForm({
  userSession,
}: {
  userSession: ExtendedUserSession;
}) {
  const { name, email, substanceOfAbuse, dateOfSobriety } =
    userSession?.user as any;

  const [formState, setFormState] = useState({
    name,
    email,
    substanceOfAbuse,
    dateOfSobriety,
  });

  console.log('formState', formState);

  return (
    <div>
      <section className="flex flex-col gap-4 text-lg font-semibold">
        <div>
          <Label htmlFor="name">Name</Label>
          <h3 id="name">{name ?? 'No name yet'}</h3>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <p id="email">{email}</p>
        </div>
        <div>
          <Label htmlFor="substanceOfAbuse">Substance of abuse</Label>
          <p id="substanceOfAbuse">{substanceOfAbuse}</p>
        </div>
        <div>
          <Label htmlFor="dateOfSobriety">Date of sobriety</Label>
          <p id="dateOfSobriety">
            {new Date(dateOfSobriety).toLocaleDateString()}
          </p>
        </div>
      </section>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex gap-2 p-6">
            <Icons.penLine size={24} />
            <span>Edit profile</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            {Object.keys(formState).map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="text-right">
                  {capitalize(key)}
                </Label>
                <Input
                  id={key}
                  // @ts-ignore
                  value={formState[key]}
                  onChange={(e) =>
                    setFormState({ ...formState, [key]: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
