'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Settings, ArrowRight, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/ui/BackButton';
import type { ExtendedUserSession } from '@/types';
import { FlexCol } from '@/components/ui/Flex';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Profile() {
  const { data } = useSession();
  const userSession = data as ExtendedUserSession;

  return (
    <div className="min-h-screen lg:col-span-2 lg:min-h-full">
      <div>
        <BackButton />

        <h2 className="mt-8 pl-3 text-3xl font-semibold">
          {userSession?.name ?? 'Your profile'}
        </h2>

        <div className="mb-12 mt-8 flex items-center gap-6 pl-3">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={userSession?.user?.image ?? ''}
              alt={userSession?.user?.name ?? 'User avatar'}
            />
            <AvatarFallback className="bg-neutral-2"></AvatarFallback>
          </Avatar>
          <h3 className="text-3xl">{userSession?.user?.name}</h3>
        </div>
        <FlexCol className="gap-4">
          <Card className=" bg-light-grey">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <Settings size={32} />
                <CardTitle className="font-normal">Settings</CardTitle>
              </div>
              <Link
                href="/dashboard/profile/settings"
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  }),
                  'rounded-full'
                )}
              >
                <ArrowRight color="#000" />
              </Link>
            </CardContent>
          </Card>
          <Card className=" bg-light-grey">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-6">
                <User size={32} />
                <CardTitle className="font-normal">Manage account</CardTitle>
              </div>
              <Link
                href="/dashboard/profile/manage-account"
                className={cn(
                  buttonVariants({
                    size: 'icon',
                    variant: 'ghost',
                  }),
                  'rounded-full'
                )}
              >
                <ArrowRight color="#000" />
              </Link>
            </CardContent>
          </Card>
        </FlexCol>
      </div>
    </div>
  );
}
