import type { BaseComponentProps } from '@/types';

export default function Card({
  as: Component = 'div',
  className,
  children,
}: BaseComponentProps) {
  return (
    <Component className={`rounded-lg bg-off-white p-6 shadow-md ${className}`}>
      {children}
    </Component>
  );
}
