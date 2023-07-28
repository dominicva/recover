import { isLoggedIn } from '@/lib/user';
import Header from '@/components/layout/Header';
import Container from '@/components/utils/Container';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="px-4">
      <Header isLoggedIn={await isLoggedIn()} />
      {children}
    </Container>
  );
}
