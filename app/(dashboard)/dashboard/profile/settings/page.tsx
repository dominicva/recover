import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Container from '@/components/ui/Container';
import BackButton from '@/components/ui/BackButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/ui/icons';
import { SettingsForm } from '@/components/profile';
import { prisma } from '@/lib/db';
import type { ExtendedUserSession } from '@/types';

export default async function ProfileSettings() {
  const userSession = (await getServerSession(
    authOptions
  )) as ExtendedUserSession;
  const substances = await prisma.substance.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return (
    <div className="min-h-screen lg:min-h-full">
      <BackButton />
      <h2 className="mt-8 text-center text-3xl font-semibold">Your settings</h2>
      <button className="mx-auto my-6 block">
        <Avatar className="mx-auto h-24 w-24">
          <AvatarImage src={userSession?.user?.image ?? ''} />
          <AvatarFallback className="bg-purple-2">
            <Icons.camera size={36} stroke="#000" />
          </AvatarFallback>
        </Avatar>
      </button>

      <SettingsForm substances={substances} />
    </div>
  );
}
