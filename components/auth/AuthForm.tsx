'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { ArrowLeft, Mail, GitHub } from 'react-feather';
import googleIcon from '@/public/icons/google.svg';
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
import { Input } from '@/components/ui/input';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

type Inputs = {
  email: string;
};

export default function AuthForm({
  title,
  subtitle,
}: {
  title: 'Sign Up' | 'Sign In';
  subtitle: string;
}) {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const callbackUrl = title === 'Sign Up' ? '/new-user' : '/';

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { email } = data;
    await signIn('email', { email, callbackUrl });
  };

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl });
  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl });
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
                    <Input {...field} />
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
              <Mail className="-ml-3 w-8" />
              Continue with Email
            </Button>
          </form>
        </Form>
        <hr className="border-t-solid border-t-1 text-md m-auto my-6 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignIn}
            size="lg"
            // intent="text"
            className="flex w-full items-center justify-center gap-4"
          >
            <Image src={googleIcon} alt="Google icon" className="h-6 w-8" />
            Continue with Google
          </Button>

          <Button
            onClick={handleGitHubSignIn}
            // size="lg"
            size="icon"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <GitHub className="w-8" />
            Continue with GitHub
          </Button>
        </div>
      </FlexCol>
    </Container>
  );
}

/**
 <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <legend className="mb-4 text-center">{subtitle}</legend>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input type="email" {...register('email', { required: true })} />
              {errors.email && <span>Email required</span>}
            </div>
          </fieldset>
          <Button
            size="lg"
            intent="tertiary"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <Mail className="-ml-3 w-8" />
            Continue with Email
          </Button>
        </form>
        <hr className="border-t-solid border-t-1 text-md m-auto my-6 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignIn}
            size="large"
            intent="text"
            className="flex w-full items-center justify-center gap-4"
          >
            <Image src={googleIcon} alt="Google icon" className="h-6 w-8" />
            Continue with Google
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <Twitter className="w-8" color="#1DA1F2" />
            Continue with Twitter
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <Facebook className="ml-[19px] w-8" color="#4267B2" />
            <span className="ml-1">Continue with Facebook</span>
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <Instagram className="ml-5 w-8" color="#C13584" />
            <span className="ml-1">Continue with Instagram</span>
          </Button>
          <Button
            onClick={handleGitHubSignIn}
            size="large"
            intent="text"
            type="submit"
            className="flex w-full items-center justify-center gap-4"
          >
            <GitHub className="w-8" />
            Continue with GitHub
          </Button>
        </div>
 */
