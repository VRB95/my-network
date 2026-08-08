import { ArrowUpDown, Pencil } from 'lucide-react'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useHosts } from '@/store/HostsContext'
import type { HostField } from '@/types/host'
import { cn } from '@/lib/utils'

const COLUMNS: { label: string; field: HostField; detailOnly?: boolean }[] = [
  { label: 'Name', field: 'Name' },
  { label: 'Iface', field: 'Iface', detailOnly: true },
  { label: 'IP', field: 'IP' },
  { label: 'MAC', field: 'Mac', detailOnly: true },
  { label: 'Hardware', field: 'Hw', detailOnly: true },
  { label: 'Date', field: 'Date', detailOnly: true },
  { label: 'Known', field: 'Known', detailOnly: true },
  { label: 'On', field: 'Now' },
]

export function HostsTableHeader() {
  const { sort, sortBy, showDetails } = useHosts()

  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-8" />
        {COLUMNS.map(({ label, field, detailOnly }) => (
          <TableHead
            key={field}
            className={cn(
              'cursor-pointer select-none',
              sort.field === field && 'text-sky-600',
              detailOnly && !showDetails && 'hidden',
            )}
            onClick={() => sortBy(field)}
            title={`Sort by ${label}`}
          >
            <span className="inline-flex items-center gap-1">
              {label}
              <ArrowUpDown className="h-3 w-3 opacity-60" />
            </span>
          </TableHead>
        ))}
        <TableHead className="w-8 text-center" title="Edit">
          <Pencil className="mx-auto h-3.5 w-3.5" />
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}
