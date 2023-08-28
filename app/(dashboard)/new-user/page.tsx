import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import { prisma } from '@/lib/db';
import OnBoarding from '@/components/on-boarding/OnBoarding';

export default async function NewUser() {
  const userLoggedIn = await isLoggedIn();

  if (!userLoggedIn) {
    redirect('/signin');
  }

  const substances = await prisma.substance.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <main>
      <OnBoarding substances={substances} />
    </main>
  );
}
