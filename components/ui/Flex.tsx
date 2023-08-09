import clsx from 'clsx';
import type { BaseComponentProps } from '@/types';

export function FlexRow({
  as: Component = 'div',
  children,
  className,
}: BaseComponentProps) {
  return (
    <Component className={clsx('flex flex-row', className ?? null)}>
      {children}
    </Component>
  );
}

export function FlexCol({
  as: Component = 'div',
  children,
  className,
}: BaseComponentProps) {
  return (
    <Component className={clsx('flex flex-col', className ?? null)}>
      {children}
    </Component>
  );
}
