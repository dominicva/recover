import { isLoggedIn } from '@/lib/user';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header isLoggedIn={await isLoggedIn()} />
      <main className="bg-off-white">
        <Hero />
      </main>
    </>
  );
}
