import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import Hero from '@/components/layout/Hero';

export default async function Home() {
  const userLoggedIn = await isLoggedIn();

  if (userLoggedIn) {
    redirect('/dashboard');
  }

  return (
    <main>
      <Hero />
    </main>
  );
}
