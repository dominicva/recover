import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import { prisma } from '@/lib/db';
import Container from '@/components/ui/Container';
import { FlexCol } from '@/components/ui/Flex';
import LinkButton from '@/components/ui/buttons/LinkButton';
import OnBoarding from '@/components/on-boarding/OnBoarding';

export default async function NewUser() {
  const userLoggedIn = await isLoggedIn();

  if (!userLoggedIn) {
    redirect('/signin');
  }

  const substances = (await prisma.substance.findMany()).map(
    (substance) => substance.name
  );

  return (
    <main>
      {/* <Container className="px-4"> */}
      <OnBoarding substances={substances} />
      {/* <Container className="py-4">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Create your account
          </h2>
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
        </Container> */}
      {/* </Container> */}
    </main>
  );
}
