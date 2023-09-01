import clsx from 'clsx';
import type { BaseComponentProps } from '@/types';

export default function Container({
  as: Component = 'div',
  className,
  children,
}: BaseComponentProps) {
  return (
    <Component className={clsx('mx-auto max-w-6xl', className ?? null)}>
      {children}
    </Component>
  );
}
