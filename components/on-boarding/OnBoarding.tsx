'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
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
import Container from '@/components/ui/Container';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ExtendedUserSession } from '@/types';
import type { Substance } from '@prisma/client';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().nonempty(),
  substanceOfAbuse: z.string().nonempty(),
  dateOfSobriety: z.date({
    required_error: 'Please select a date',
  }),
});

export default function OnBoarding({
  substances,
}: {
  substances: Substance[];
}) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user as ExtendedUserSession;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dateOfSobriety: new Date(),
      substanceOfAbuse: '',
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

      router.push('/new-user/success');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="px-4">
      <h2 className="mb-4 text-center text-2xl font-semibold">
        Create your account
      </h2>
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
                <FormDescription>Feel free to use a pseudonym</FormDescription>
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
                              form.setValue('substanceOfAbuse', substance.name);
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
                <FormDescription>The date you last indulged</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" size="lg" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
    </Container>
  );
}
