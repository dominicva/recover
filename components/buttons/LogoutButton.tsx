'use client';

import { signOut } from 'next-auth/react';
import Button from './Button';

export default function LogoutButton() {
  return (
    <Button
      size="small"
      intent="text"
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      Log out
    </Button>
  );
}
