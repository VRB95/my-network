import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useHosts } from '@/store/HostsContext'
import type { HostField } from '@/types/host'

export function HostsFilterBar() {
  const { ifaces, filter, setFilter, resetFilter } = useHosts()

  const currentValue = (field: HostField) => (filter.field === field ? filter.value : '')

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        title="Filter by Iface"
        value={currentValue('Iface')}
        onChange={(e) => setFilter('Iface', e.target.value)}
        className="h-8 w-auto min-w-28 text-xs"
      >
        <option value="" disabled>
          Iface
        </option>
        {ifaces.map((iface) => (
          <option key={iface} value={iface}>
            {iface}
          </option>
        ))}
      </Select>

      <Select
        title="Filter by Known"
        value={currentValue('Known')}
        onChange={(e) => setFilter('Known', e.target.value)}
        className="h-8 w-auto min-w-28 text-xs"
      >
        <option value="" disabled>
          Known
        </option>
        <option value="1">Known</option>
        <option value="0">Unknown</option>
      </Select>

      <Select
        title="Filter by Online"
        value={currentValue('Now')}
        onChange={(e) => setFilter('Now', e.target.value)}
        className="h-8 w-auto min-w-28 text-xs"
      >
        <option value="" disabled>
          Online
        </option>
        <option value="1">On</option>
        <option value="0">Off</option>
      </Select>

      <Button variant="outline" size="sm" onClick={resetFilter} title="Reset filter">
        Reset
      </Button>
    </div>
  )
}
