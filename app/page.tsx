import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';

export default function Home() {
  return (
    <div className="px-4">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}
