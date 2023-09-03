'use client';

import { signOut, useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';

import { Button } from '@/components/ui/button';
import { ExtendedUserSession } from '@/types';
import BackButton from '@/components/ui/BackButton';
import { cn } from '@/lib/utils';

export default function ManageAccountPage() {
  const { data: session } = useSession() as any;
  console.log(session?.user);

  const handleSignOut = () => {
    signOut();
  };

  const handleDeleteAccount = async () => {
    const response = await fetch(`/api/user?userId=${session?.user.userId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      signOut();
    }
  };

  return (
    <div className="min-h-screen lg:col-span-2 lg:row-span-3 lg:min-h-full">
      <BackButton />
      <h2 className="mb-14 mt-8 text-center text-3xl font-semibold lg:text-left">
        Manage your account
      </h2>

      <div className="flex flex-col justify-start gap-6">
        <Button
          onClick={handleSignOut}
          size="lg"
          className="mx-auto flex w-11/12 max-w-[220px] items-center justify-center gap-2 lg:mx-0"
        >
          <Icons.logout size={24} />
          <span>Sign out</span>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger
            className={cn(
              buttonVariants({
                size: 'lg',
                variant: 'destructive',
              }),
              'mx-auto flex w-11/12 max-w-[220px] items-center justify-center gap-2 lg:mx-0'
            )}
          >
            <Icons.trash size={24} />
            <span>Delete account</span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and delete all data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({
                  variant: 'destructive',
                })}
                onClick={handleDeleteAccount}
              >
                Delete account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
