import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

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
      className={`rounded w-full bg-off-white focus-within:border-purple-darker border-2 p-3 ${
        className ?? ''
      }`.trim()}
      {...props}
    />
  );
}
