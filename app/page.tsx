import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Container from '@/components/utils/Container';

export default function Home() {
  return (
    <Container className="px-4">
      <Header />
      <main>
        <Hero />
      </main>
    </Container>
  );
}
