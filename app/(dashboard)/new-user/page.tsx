import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';
import LinkButton from '@/components/ui/buttons/LinkButton';

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
          <LinkButton
            href="/new-user/on-boarding"
            className="mt-4 flex w-1/2 justify-center"
            size="large"
          >
            Let&apos;s go
          </LinkButton>
        </Container>
      </Container>
    </main>
  );
}
