import * as React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, MoreVertical } from 'lucide-react'
import { TableCell, TableRow as UiTableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { apiService } from '@/services/ApiService'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useHosts } from '@/store/HostsContext'
import { cn } from '@/lib/utils'
import type { Host } from '@/types/host'

interface HostsTableRowProps {
  host: Host
  index: number
}

export function HostsTableRow({ host, index }: HostsTableRowProps) {
  const { editNames, showDetails, selectedIds, toggleSelected } = useHosts()
  const [name, setName] = React.useState(host.Name)

  const debouncedSaveName = useDebouncedCallback(async (value: string) => {
    await apiService.editHost(host.ID, value)
  }, 300)

  const handleNameChange = (value: string) => {
    setName(value)
    debouncedSaveName(value)
  }

  const handleToggleKnown = async () => {
    await apiService.editHost(host.ID, name, 'toggle')
  }

  const isSelected = selectedIds.includes(host.ID)
  const detailClass = cn(!showDetails && 'hidden')

  return (
    <UiTableRow>
      <TableCell className="w-8 text-xs text-slate-400">{index}.</TableCell>

      <TableCell>
        {editNames ? (
          <Input
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            className="h-7 text-sm"
          />
        ) : (
          name
        )}
      </TableCell>

      <TableCell className={detailClass}>{host.Iface}</TableCell>

      <TableCell>
        <a href={`http://${host.IP}`} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
          {host.IP}
        </a>
      </TableCell>

      <TableCell className={cn(detailClass, 'font-mono text-xs')}>{host.Mac}</TableCell>

      <TableCell className={detailClass} title={host.Hw}>
        {host.Hw.slice(0, 12)}..
      </TableCell>

      <TableCell className={cn(detailClass, 'whitespace-nowrap text-xs text-slate-500')}>{host.Date}</TableCell>

      <TableCell className={detailClass}>
        <Switch checked={host.Known === 1} onCheckedChange={handleToggleKnown} />
      </TableCell>

      <TableCell className="text-center">
        {host.Now === 1 ? (
          <CheckCircle2 className="mx-auto h-4 w-4 text-emerald-600" />
        ) : (
          <Circle className="mx-auto h-4 w-4 text-slate-300" />
        )}
      </TableCell>

      <TableCell className="w-8 text-center">
        {editNames ? (
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300"
            checked={isSelected}
            onChange={(e) => toggleSelected(host.ID, e.target.checked)}
          />
        ) : (
          <Link to={`/host/${host.ID}`} title="More">
            <MoreVertical className="mx-auto h-4 w-4 text-slate-400 hover:text-slate-700" />
          </Link>
        )}
      </TableCell>
    </UiTableRow>
  )
}
