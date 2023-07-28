import { isLoggedIn } from '@/lib/user';
import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Container from '@/components/utils/Container';

export default async function Home() {
  return (
    <Container className="px-4">
      <Header isLoggedIn={await isLoggedIn()} />
      <main>
        <Hero />
      </main>
    </Container>
  );
}
