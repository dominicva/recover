import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function useRevalidate() {
  const router = useRouter();
  const [, startTransition] = useTransition();

  return ({ href }: { href: string }) => {
    startTransition(() => {
      router.refresh();
      router.push(href);
    });
  };
}
