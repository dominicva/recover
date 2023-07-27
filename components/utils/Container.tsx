import type { BaseComponentProps } from '@/types';

export default function Container({
  as: Component = 'div',
  className,
  children,
}: BaseComponentProps) {
  return (
    <Component className={`mx-auto max-w-5xl ${className ?? ''}`.trim()}>
      {children}
    </Component>
  );
}
