import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva('btn', {
  variants: {
    variant: { default: 'btn-glow', primary: 'btn-glow', secondary: 'btn-line', outline: 'btn-line', ghost: 'btn-ghost', link: 'btn-ghost underline', destructive: 'btn-line' },
    size: { default: '', sm: 'button-small', lg: 'button-large', icon: 'button-icon' },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});
export type ButtonProps = ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean | undefined };
export function Button({ asChild = false, variant, size, className, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
