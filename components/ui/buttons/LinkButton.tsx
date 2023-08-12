import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';

const linkButtonClasses = cva(
  [
    'rounded-full',
    'font-medium',
    'hover:translate-y-0.5',
    'active:translate-y-0.5',
    'hover:opacity-90',
    'transition',
    'duration-200',
    'ease-in-out',
    'shadow-sm',
    'hover:shadow-md',
  ],
  {
    variants: {
      intent: {
        primary: ['bg-primary', 'text-white', 'border-transparent'],
        secondary: ['bg-secondary', 'text-white', 'border-transparent'],
        tertiary: ['text-white', 'bg-purple-darker', 'border-transparent'],
        text: [
          'bg-transparent',
          'text-off-black',
          'hover:bg-gray-100',
          'border-2',
          'border-gray-300',
        ],
        disabled: ['bg-gray-300', 'text-gray-400', 'cursor-not-allowed'],
      },
      size: {
        xsmall: ['text-sm', 'px-2', 'py-1'],
        small: ['text-md', 'px-3', 'py-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-lg', 'font-semibold', 'px-8', 'py-4'],
        round: ['text-lg', 'p-2'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

export interface LinkButtonProps
  extends VariantProps<typeof linkButtonClasses> {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export default function LinkButton({
  size,
  intent,
  children,
  href,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={linkButtonClasses({ intent, size, className })}
      {...props}
    >
      {children}
    </Link>
  );
}
