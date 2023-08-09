import { isLoggedIn } from '@/lib/user';
import Header from '@/components/layout/Header';
import Container from '@/components/ui/Container';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <Header isLoggedIn={await isLoggedIn()} />
      {children}
    </Container>
  );
}
