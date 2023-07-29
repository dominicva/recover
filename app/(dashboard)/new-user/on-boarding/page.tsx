import { redirect } from 'next/navigation';
import { isLoggedIn } from '@/lib/user';
import OnBoarding from '@/components/on-boarding/OnBoarding';

export default async function OnBoardingPage() {
  if (!(await isLoggedIn())) {
    redirect('/signin');
  }

  return <OnBoarding />;
}
