'use client';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '../ui/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { FlexCol } from '../ui/Flex';
import type { ExtendedUserSession } from '@/types';

export default function UserAvatar({
  userSession,
}: {
  userSession: ExtendedUserSession;
}) {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            // @ts-ignore
            src={userSession?.image ?? ''}
            alt={userSession?.user?.name ?? 'User avatar'}
          />
          <AvatarFallback className="bg-neutral-1">
            <Icons.user className="text-neutral-10 h-6 w-6" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-4 w-60 rounded-xl py-8">
        <nav>
          <FlexCol as="ul" className="gap-6 py-2">
            <li>
              <Link
                href="/dashboard"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Profile
              </Link>
            </li>
            <li>
              <Button onClick={handleSignOut} variant="ghost">
                Sign Out
              </Button>
            </li>
          </FlexCol>
        </nav>
      </PopoverContent>
    </Popover>
  );
}
