import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Button({ asChild = false, variant = 'primary', className, ...props }: ComponentProps<'button'> & { asChild?: boolean; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn('btn', variant === 'primary' ? 'btn-glow' : variant === 'secondary' ? 'btn-line' : 'btn-ghost', className)} {...props} />;
}
