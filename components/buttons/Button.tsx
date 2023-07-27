import { cva, VariantProps } from 'class-variance-authority';
import { MouseEventHandler } from 'react';

const buttonClasses = cva(
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
        text: ['bg-transparent', 'text-off-black', 'hover:bg-gray-100'],
        disabled: ['bg-gray-300', 'text-gray-400', 'cursor-not-allowed'],
      },
      size: {
        xsmall: ['text-sm', 'px-2', 'py-1'],
        small: ['text-md', 'px-3', 'py-2'],
        medium: ['text-lg', 'px-6', 'py-2'],
        large: ['text-xlg', 'px-8', 'py-4'],
        round: ['text-lg', 'p-2'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);

export interface ButtonProps extends VariantProps<typeof buttonClasses> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
  children,
  className,
  intent,
  size,
  disabled,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ intent, size, className })}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
