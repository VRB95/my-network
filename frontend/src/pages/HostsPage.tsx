import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { HostsToolbar } from '@/components/hosts/HostsToolbar'
import { HostsTable } from '@/components/hosts/HostsTable'

export function HostsPage() {
  return (
    <Card>
      <CardHeader>
        <HostsToolbar />
      </CardHeader>
      <CardContent className="p-0">
        <HostsTable />
      </CardContent>
    </Card>
  )
}
