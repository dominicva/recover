import type { BaseComponentProps } from '@/types';

export function FlexRow({
  as: Component = 'div',
  children,
  className,
}: BaseComponentProps) {
  return (
    <Component className={`flex flex-row ${className ?? ''}`.trim()}>
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
    <Component className={`flex flex-col ${className ?? ''}`.trim()}>
      {children}
    </Component>
  );
}
