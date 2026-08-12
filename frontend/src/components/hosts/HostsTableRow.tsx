import * as React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Circle, MoreVertical } from 'lucide-react'
import { TableCell, TableRow as UiTableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { apiService } from '@/services/ApiService'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import { useHosts } from '@/store/HostsContext'
import { cn } from '@/lib/utils'
import type { Host } from '@/types/host'
import type { Group } from '@/types/group'

interface HostsTableRowProps {
  host: Host
  index: number
}

export function HostsTableRow({ host, index }: HostsTableRowProps) {
  const { editNames, showDetails, selectedIds, toggleSelected } = useHosts()
  const [name, setName] = React.useState(host.Name)
  const [groups, setGroups] = React.useState<Group[]>([])
  const [groupId, setGroupId] = React.useState(host.GroupID ?? 0)

  React.useEffect(() => {
    if ((editNames || groupId !== 0) && groups.length === 0) {
      void apiService.getGroups().then(setGroups)
    }
  }, [editNames, groupId, groups.length])

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

  const handleGroupChange = async (value: string) => {
    const nextGroupId = Number(value)
    setGroupId(nextGroupId)
    await apiService.setHostGroup(host.ID, nextGroupId)
  }

  const isSelected = selectedIds.includes(host.ID)
  const detailClass = cn(!showDetails && 'hidden')
  const hostUrl = host.Port ? `http://${host.IP}:${host.Port}` : `http://${host.IP}`

  return (
    <UiTableRow>
      <TableCell className="w-8 text-xs text-slate-400">{index}.</TableCell>

      <TableCell>
        {editNames ? (
          <div className="flex min-w-44 flex-col gap-1.5 sm:min-w-56 sm:flex-row sm:gap-2">
            <Input
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="h-7 min-w-28 text-sm"
            />
            <Select
              aria-label={`Group for ${name || host.IP}`}
              value={String(groupId)}
              onChange={(e) => void handleGroupChange(e.target.value)}
              className="h-7 min-w-28 py-0 text-xs"
            >
              <option value="0">No group</option>
              {groups.map((group) => <option key={group.ID} value={group.ID}>{group.Name}</option>)}
            </Select>
          </div>
        ) : (
          <div className="flex min-w-28 flex-col items-start gap-0.5">
            <span className="font-medium text-slate-900 dark:text-slate-100">{name || 'Unnamed'}</span>
            {groupId !== 0 && <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium text-sky-700 dark:bg-sky-950 dark:text-sky-300">{groups.find((group) => group.ID === groupId)?.Name ?? 'Grouped'}</span>}
          </div>
        )}
      </TableCell>

      <TableCell className={detailClass}>{host.Iface}</TableCell>

      <TableCell>
        <a href={hostUrl} target="_blank" rel="noreferrer" className="whitespace-nowrap text-sky-700 hover:underline dark:text-sky-400">
          {host.Port ? `${host.IP}:${host.Port}` : host.IP}
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
