'use client';

import { signOut } from 'next-auth/react';
import Button from './Button';

export default function SignOutButton() {
  return (
    <Button
      size="small"
      intent="text"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Sign Out
    </Button>
  );
}
