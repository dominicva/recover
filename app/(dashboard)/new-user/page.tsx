import { redirect } from 'next/navigation';
import { isLoggedIn, getUser } from '@/lib/user';
import Container from '@/components/utils/Container';

export default async function NewUser() {
  if (!(await isLoggedIn())) {
    redirect('/signin');
  }

  const user = await getUser();
  console.log('user in NewUser page', user);

  return (
    <main>
      <Container className="px-4">
        <h1 className="text-2xl font-semibold">Welcome!</h1>
        {user && (
          <p>
            You are logged in as <strong>{user.email}</strong>.
          </p>
        )}
      </Container>
    </main>
  );
}
