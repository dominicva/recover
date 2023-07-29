import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';

export default async function Home() {
  if (await isLoggedIn()) {
    redirect('/dashboard');
  }

  return (
    <>
      <Header isLoggedIn={await isLoggedIn()} />
      <main className="bg-off-white">
        <Hero />
      </main>
    </>
  );
}
