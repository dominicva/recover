'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Button from '@/components/buttons/Button';
import Container from '@/components/utils/Container';
import { FlexCol } from '@/components/utils/Flex';
import Input from '@/components/utils/Input';
import { X, Mail, GitHub, Twitter, Facebook, Instagram } from 'react-feather';
import googleIcon from '@/public/icons/google.svg';

export default function SignUp() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn('email', { email });
  };

  const handleGoogleSignUp = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <Container as="main" className="px-4">
      <FlexCol className="mt-6 gap-4">
        <div className="relative">
          <Link href="/">
            <X className="absolute top-[1.5px] left-0 w-6 h-6 text-off-black" />
          </Link>
          <h1 className="text-xl text-center font-semibold">Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend className="text-center mb-4">
              Just a few things to get started
            </legend>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <Input type="email" id="email" name="email" />
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <Button
            size="large"
            intent="tertiary"
            type="submit"
            className="flex gap-4 w-full justify-center items-center"
          >
            <Mail className="w-8 -ml-3" />
            Continue with Email
          </Button>
        </form>
        <hr className="border-t-solid border-t-1 text-md m-auto my-6 w-11/12 overflow-visible border-off-black text-center text-off-black opacity-50 after:relative after:-top-[13px] after:bg-white after:p-2 after:content-['or']" />
        <div className="flex flex-col gap-4">
          <Button
            onClick={handleGoogleSignUp}
            size="large"
            intent="text"
            className="flex gap-4 w-full justify-center items-center"
          >
            <Image src={googleIcon} alt="Google icon" className="h-6 w-8" />
            Continue with Google
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex gap-4 w-full justify-center items-center"
          >
            <Twitter className="w-8" color="#1DA1F2" />
            Continue with Twitter
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex gap-4 w-full justify-center items-center"
          >
            <Facebook className="w-8 ml-[19px]" color="#4267B2" />
            <span className="ml-1">Continue with Facebook</span>
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex gap-4 w-full justify-center items-center"
          >
            <Instagram className="w-8 ml-5" color="#C13584" />
            <span className="ml-1">Continue with Instagram</span>
          </Button>
          <Button
            size="large"
            intent="text"
            type="submit"
            className="flex gap-4 w-full justify-center items-center"
          >
            <GitHub className="w-8" />
            Continue with GitHub
          </Button>
        </div>
      </FlexCol>
    </Container>
  );
}
