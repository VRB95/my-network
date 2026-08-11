import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Looks like the shadcn Switch, but is a real <input type="checkbox"> under
 * the hood. Used inside the config forms (Basic/Influx/Prometheus), which
 * are submitted as native FormData - a Radix Switch has no underlying
 * <input>, so it wouldn't be picked up by FormData the way this needs to be.
 */
export const FormSwitch = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <label className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center">
      <input
        ref={ref}
        type="checkbox"
        className={cn('peer sr-only', className)}
        {...props}
      />
      <span className="absolute inset-0 rounded-full bg-slate-300 shadow-sm transition-colors peer-checked:bg-sky-600 peer-focus-visible:ring-2 peer-focus-visible:ring-sky-500 dark:bg-slate-600" />
      <span className="pointer-events-none absolute left-0.5 h-4 w-4 translate-x-0 rounded-full bg-white shadow-sm transition-transform peer-checked:translate-x-4" />
    </label>
  ),
)
FormSwitch.displayName = 'FormSwitch'
