'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { signOut } from 'next-auth/react';
import { FlexCol } from '../ui/Flex';

export default function UserAvatar({ userSession }: { userSession: any }) {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage
            src={userSession?.image}
            alt={userSession?.user?.name ?? 'User avatar'}
          />
          <AvatarFallback className="bg-neutral-2"></AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mr-4 w-48 rounded-xl">
        <nav>
          <FlexCol as="ul" className="gap-2 py-2">
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
                href="/profile"
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
