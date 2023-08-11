import { forwardRef } from 'react';
import clsx from 'clsx';
import type { DetailedHTMLProps, InputHTMLAttributes } from 'react';

const Input = forwardRef(function Input(
  {
    as: Component = 'input',
    className,
    ...props
  }: {
    as?: React.ElementType;
    className?: string;
  } & DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & { type: string },
  ref
) {
  return (
    <Component
      ref={ref}
      className={clsx(
        'w-full rounded border-2 bg-off-white p-3 focus-within:border-purple-darker',
        className ?? null
      )}
      {...props}
    />
  );
});

export default Input;
