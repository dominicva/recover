'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { TwoSeventyRing } from 'react-svg-spinners';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Mail, GitHub } from 'react-feather';
import googleIcon from '@/public/icons/google.svg';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

export default function AuthForm({ title }: { title: 'Sign Up' | 'Sign In' }) {
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const callbackUrl = title === 'Sign Up' ? '/new-user' : '/';

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setEmailLoading(true);
    const { email } = data;
    await signIn('email', { email, callbackUrl });
    setEmailLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn('google', { callbackUrl });
    setGoogleLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setGithubLoading(true);
    await signIn('github', { callbackUrl });
    setGithubLoading(false);
  };

  return (
    <Container as="main" className="px-4 sm:px-0">
      <FlexCol className="mx-auto mt-6 max-w-sm gap-4">
        <div className="relative">
          <Link href="/">
            <ArrowLeft className="absolute left-0 top-[1.5px] h-6 w-6 text-off-black" />
          </Link>
          <h1 className="text-center text-xl font-semibold">{title}</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="email" />
                  </FormControl>
                  <FormDescription>
                    You will receive a sign in link in your email inbox.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              type="submit"
              className="flex w-full items-center justify-center gap-4"
            >
              {emailLoading ? (
                <TwoSeventyRing className="h-8 w-8" color="#fff" />
              ) : (
                <>
                  <Mail className="-ml-3 w-8" />
                  <span>Continue with Email</span>
                </>
              )}
            </Button>
          </form>
        </Form>
        <hr className="border-t-solid border-t-1 text-md m-auto my-6 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignIn}
            size="lg"
            className="flex w-full items-center justify-center gap-4"
          >
            {googleLoading ? (
              <TwoSeventyRing className="h-8 w-8" color="#fff" />
            ) : (
              <>
                <Image src={googleIcon} alt="Google icon" className="h-6 w-8" />
                <span>Continue with Google</span>
              </>
            )}
          </Button>
          <Button
            onClick={handleGitHubSignIn}
            size="lg"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            {githubLoading ? (
              <TwoSeventyRing className="h-8 w-8" color="#fff" />
            ) : (
              <>
                <GitHub className="w-8" />
                <span>Continue with GitHub</span>
              </>
            )}
          </Button>
        </div>
      </FlexCol>
    </Container>
  );
}
