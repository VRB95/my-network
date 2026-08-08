import { useMacHistory } from '@/hooks/useMacHistory'
import { cn } from '@/lib/utils'

interface HostActivityStripProps {
  mac: string
  date?: string
  /** Max number of entries to render, most recent first. */
  limit?: number
}

export function HostActivityStrip({ mac, date = '', limit = 200 }: HostActivityStripProps) {
  const history = useMacHistory(mac, date)

  return (
    <div className="flex flex-wrap gap-[2px]">
      {history.slice(0, limit).map((entry, index) => (
        <span
          key={`${entry.Date}-${index}`}
          title={`Date: ${entry.Date}\nIface: ${entry.Iface}\nIP: ${entry.IP}\nKnown: ${entry.Known}`}
          className={cn(
            'inline-block h-3 w-1.5 rounded-[1px]',
            entry.Now === 0 ? 'bg-slate-200' : 'bg-emerald-500',
          )}
        />
      ))}
    </div>
  )
}
