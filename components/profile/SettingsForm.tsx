'use client';

import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Check, ChevronsUpDown } from 'lucide-react';
import { CalendarIcon } from 'lucide-react';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Icons } from '../ui/icons';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

import type { ExtendedUserSession } from '@/types';
import type { Substance } from '@prisma/client';
import { DialogClose } from '@radix-ui/react-dialog';

const formSchema = z.object({
  name: z.string().nonempty(),
  substanceOfAbuse: z.string().nonempty(),
  dateOfSobriety: z.date({
    required_error: 'Please select a date',
  }),
});

export default function ProfileSettings({
  substances,
}: {
  substances: Substance[];
}) {
  const { data: session, update } = useSession();
  const user = session?.user ?? ({} as any);

  console.log('user', user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name ?? '',
      dateOfSobriety: new Date(),
      substanceOfAbuse: user.substanceOfAbuse ?? '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          userId: user.userId,
        }),
      });

      if (!res.ok) {
        throw 'Something went wrong updating the user';
      }

      // calls the jwt callback
      await update();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-4 text-lg font-semibold">
        <div>
          <Label htmlFor="name">Name</Label>
          <h3 id="name">{user.name ?? 'No name yet'}</h3>
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <p id="email">{user.email}</p>
        </div>
        <div>
          <Label htmlFor="substanceOfAbuse">Substance of abuse</Label>
          <p id="substanceOfAbuse">{user.substanceOfAbuse}</p>
        </div>
        <div>
          <Label htmlFor="dateOfSobriety">Date of sobriety</Label>
          <p id="dateOfSobriety">
            {new Date(user.dateOfSobriety).toLocaleDateString()}
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
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Feel free to use a pseudonym
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="substanceOfAbuse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you trying to quit?</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              'w-full justify-between',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value
                              ? substances.find(
                                  (substance) => substance.name === field.value
                                )?.name
                              : 'Select substance'}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search substance..." />
                          <CommandEmpty>No substance found.</CommandEmpty>
                          <CommandGroup className="h-96 overflow-scroll">
                            {substances.map((substance) => (
                              <CommandItem
                                value={substance?.name}
                                key={substance.name}
                                onSelect={() => {
                                  form.setValue(
                                    'substanceOfAbuse',
                                    substance.name
                                  );
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    substance.name === field.value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {substance?.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      You can change this later in your profile settings
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfSobriety"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Your sober birthday</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      The date you last indulged
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit">Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
