'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Container from '@/components/utils/Container';
import { FlexCol } from '@/components/utils/Flex';
import Button from '../buttons/Button';
import Input from '../utils/Input';
import { ExtendedUserSession } from '@/types';

export default function OnBoarding() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as ExtendedUserSession;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());

    try {
      await fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataObj, userId: user.userId }),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      form.reset();
    }
  };

  return (
    <Container as="main" className="p-4">
      <form onSubmit={handleSubmit}>
        <FlexCol as="fieldset">
          <legend className="mb-6 text-center text-xl font-semibold">
            <h2>A few questions to get you started</h2>
          </legend>
          <FlexCol className="mb-4 gap-1">
            <label htmlFor="name">What&apos;s your name? (Optional)</label>
            <Input type="text" id="name" name="name" className="w-full" />
          </FlexCol>
          <FlexCol className="mb-4 gap-1">
            <label htmlFor="substanceOfAbuse">
              What are you trying to quit? 😱
            </label>
            <Input
              type="text"
              id="substanceOfAbuse"
              name="substanceOfAbuse"
              placeholder="e.g. alcohol, gambling, etc."
              className="w-full"
              required
            />
          </FlexCol>
          <FlexCol className="gap-1">
            <label htmlFor="dateOfSobriety">
              Since when are you sober? Since now is ok 🫣
            </label>
            <Input
              type="date"
              id="dateOfSobriety"
              name="dateOfSobriety"
              placeholder="e.g. alcohol, gambling, etc."
              className="w-full"
              required
            />
          </FlexCol>
        </FlexCol>
        <Button size="large" type="submit" className="mt-6 w-full">
          Let&apos;s go
        </Button>
      </form>
    </Container>
  );
}
