import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';

export default async function NewUser() {
  if (!(await isLoggedIn())) {
    redirect('/signin');
  }

  return (
    <main>
      <h1>Welcome!</h1>
    </main>
  );
}
