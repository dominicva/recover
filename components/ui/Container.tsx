import type { BaseComponentProps } from '@/types';

export default function Container({
  as: Component = 'div',
  className,
  children,
}: BaseComponentProps) {
  return (
    // checkout clsx for conditional classNames or classnames,
    // tailwindMerge for merging tailwind classes
    <Component className={`mx-auto max-w-5xl ${className ?? ''}`.trim()}>
      {children}
    </Component>
  );
}
