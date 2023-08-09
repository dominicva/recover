'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/buttons/Button';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';
import Input from '@/components/ui/Input';
import { X, Mail, GitHub, Twitter, Facebook, Instagram } from 'react-feather';
import googleIcon from '@/public/icons/google.svg';

export default function AuthForm({
  title,
  subtitle,
}: {
  title: 'Sign Up' | 'Sign In';
  subtitle: string;
}) {
  const [email, setEmail] = useState('');
  const callbackUrl = title === 'Sign Up' ? '/new-user' : '/';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <X className="absolute left-0 top-[1.5px] h-6 w-6 text-off-black" />
          </Link>
          <h1 className="text-center text-xl font-semibold">{title}</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="mb-4 text-center">{subtitle}</legend>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete={title === 'Sign Up' ? 'email' : 'current-email'}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </fieldset>
          <Button
            size="large"
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
      </FlexCol>
    </Container>
  );
}
