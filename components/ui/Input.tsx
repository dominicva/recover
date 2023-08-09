import clsx from 'clsx';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export default function Input({
  as: Component = 'input',
  className,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { type: string }) {
  return (
    <Component
      className={clsx(
        'w-full rounded border-2 bg-off-white p-3 focus-within:border-purple-darker',
        className ?? null
      )}
      {...props}
    />
  );
}
