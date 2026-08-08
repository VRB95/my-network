import { Table, TableBody } from '@/components/ui/table'
import { HostsTableHeader } from '@/components/hosts/HostsTableHeader'
import { HostsTableRow } from '@/components/hosts/HostsTableRow'
import { useHosts } from '@/store/HostsContext'

export function HostsTable() {
  const { hosts, isLoading } = useHosts()

  if (isLoading) {
    return <p className="p-4 text-sm text-slate-500">Loading hosts…</p>
  }

  if (hosts.length === 0) {
    return <p className="p-4 text-sm text-slate-500">No hosts found.</p>
  }

  return (
    <Table>
      <HostsTableHeader />
      <TableBody>
        {hosts.map((host, index) => (
          <HostsTableRow key={host.ID} host={host} index={index + 1} />
        ))}
      </TableBody>
    </Table>
  )
}
