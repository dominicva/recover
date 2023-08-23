'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';
import LinkButton from '@/components/ui/buttons/LinkButton';
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
import { Calendar } from '@/components/ui/calendar';

import { Input } from '@/components/ui/input';
import type { ExtendedUserSession } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import type { Substance } from '@prisma/client';

import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
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
import { toast } from '@/components/ui/use-toast';
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
  const { data: session } = useSession();
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
      // TODO work on this error handling
      if (!res.ok) {
        throw 'Something went wrong updating the user';
      }
      router.push('/dashboard');
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

                {/* <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="h-96 overflow-scroll">
                    {substances.map((substance) => (
                      <SelectItem key={substance} value={substance}>
                        {substance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> */}
                <FormDescription>
                  You can change this later in your{' '}
                  <Link href="/examples/forms">profile settings</Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="substanceOfAbuse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you trying to quit?</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
          {/* <FormField
            control={form.control}
            name="dateOfSobriety"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Since when are you sober?</FormLabel>
                <FormControl></FormControl>
              </FormItem>
            )}
          /> */}
          <Button type="submit" size="lg" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
      {/* <LinkButton
            href="/new-user/on-boarding"
            className="mt-4 flex w-1/2 justify-center"
            size="large"
          >
            Let&apos;s go
          </LinkButton> */}
    </Container>
  );
}

// 'use client';

// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';
// import Container from '@/components/ui/Container';
// import { FlexCol } from '@/components/ui/Flex';
// import Button from '../ui/buttons/Button';
// // import Input from '../ui/Input';
// import { ExtendedUserSession } from '@/types';

// export default function OnBoarding() {
//   const router = useRouter();
//   const { data: session } = useSession();
//   const user = session?.user as ExtendedUserSession;

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const form = e.target as HTMLFormElement;
//     const formData = new FormData(form);
//     const dataObj = Object.fromEntries(formData.entries());

//     try {
//       const res = await fetch('/api/user', {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...dataObj, userId: user.userId }),
//       });
//       // TODO work on this error handling
//       if (!res.ok) {
//         throw new Error('Something went wrong');
//       }
//       // check res.ok for error handling
//       router.push('/dashboard');
//     } catch (error) {
//       console.error(error);
//     } finally {
//       form.reset();
//     }
//   };

//   return (
//     <Container as="main" className="p-4">
//       <form onSubmit={handleSubmit}>
//         <FlexCol as="fieldset">
//           <legend className="mb-6 text-center text-xl font-semibold">
//             <h2>A few questions to get you started</h2>
//           </legend>
//           <FlexCol className="mb-4 gap-1">
//             <label htmlFor="name">What&apos;s your name? (Optional)</label>
//             <Input type="text" id="name" name="name" className="w-full" />
//           </FlexCol>
//           <FlexCol className="mb-4 gap-1">
//             <label htmlFor="substanceOfAbuse">
//               What are you trying to quit? 😱
//             </label>
//             <Input
//               type="text"
//               id="substanceOfAbuse"
//               name="substanceOfAbuse"
//               placeholder="e.g. alcohol, gambling, etc."
//               className="w-full"
//               required
//             />
//           </FlexCol>
//           <FlexCol className="gap-1">
//             <label htmlFor="dateOfSobriety">
//               Since when are you sober? Since now is ok 🫣
//             </label>
//             <Input
//               type="date"
//               id="dateOfSobriety"
//               name="dateOfSobriety"
//               placeholder="e.g. alcohol, gambling, etc."
//               className="w-full"
//               required
//             />
//           </FlexCol>
//         </FlexCol>
//         <Button size="large" type="submit" className="mt-6 w-full">
//           Let&apos;s go
//         </Button>
//       </form>
//     </Container>
//   );
// }
