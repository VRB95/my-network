import * as React from 'react'
import { useParams } from 'react-router-dom'
import { apiService } from '@/services/ApiService'
import { emptyHost, type Host } from '@/types/host'
import { HostDetailCard } from '@/components/host-detail/HostDetailCard'
import { HostPortScanner } from '@/components/host-detail/HostPortScanner'
import { HostHistoryCard } from '@/components/host-detail/HostHistoryCard'

export function HostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [host, setHost] = React.useState<Host>(emptyHost)

  React.useEffect(() => {
    apiService.getHost(id ?? '0').then(setHost)
  }, [id])

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <HostDetailCard host={host} />
        <HostPortScanner ip={host.IP} />
      </div>
      <HostHistoryCard mac={host.Mac} />
    </div>
  )
}
