import Link from 'next/link';
import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import Container from '@/components/utils/Container';
import { FlexCol } from '@/components/utils/Flex';
import Button from '@/components/buttons/Button';

export default async function NewUser() {
  if (!(await isLoggedIn())) {
    redirect('/signin');
  }

  return (
    <main>
      <Container className="px-4">
        <Container className="py-4">
          <h3 className="mb-4 text-2xl font-semibold">
            First of all, welcome.
          </h3>
          <FlexCol className="mb-6 gap-3">
            <p>
              To get started, we&apos;ll ask you a few questions to help with
              tracking your progress.
            </p>
            <p>You can always change your answers later.</p>
          </FlexCol>
          <Link href="/new-user/on-boarding" className="flex justify-center">
            <Button size="large" className="mt-4 w-1/2">
              Let&apos;s go
            </Button>
          </Link>
        </Container>
      </Container>
    </main>
  );
}
