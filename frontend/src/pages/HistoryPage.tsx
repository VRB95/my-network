import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { HostsFilterBar } from '@/components/hosts/HostsFilterBar'
import { HistoryShowCountInput } from '@/components/history/HistoryShowCountInput'
import { HostActivityStrip } from '@/components/history/HostActivityStrip'
import { useHosts } from '@/store/HostsContext'
import { STORAGE_KEYS } from '@/lib/localStorageKeys'

function readPersistedShowCount() {
  const stored = Number(localStorage.getItem(STORAGE_KEYS.historyShowCount))
  return !stored || Number.isNaN(stored) ? 200 : stored
}

export function HistoryPage() {
  const { hosts } = useHosts()
  const [showCount, setShowCount] = React.useState(readPersistedShowCount)

  return (
    <Card>
      <CardHeader>
        <HostsFilterBar />
        <HistoryShowCountInput value={showCount} onChange={setShowCount} />
      </CardHeader>
      <CardContent className="space-y-3">
        {hosts.map((host, index) => (
          <div key={host.ID} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0">
            <span className="w-6 pt-0.5 text-xs text-slate-400">{index + 1}.</span>
            <div className="w-48 shrink-0">
              <Link to={`/host/${host.ID}`} className="font-medium text-slate-900 hover:underline">
                {host.Name}
              </Link>
              <br />
              <a href={`http://${host.IP}`} className="text-xs text-sky-700 hover:underline">
                {host.IP}
              </a>
            </div>
            <div className="flex-1 pt-1">
              <HostActivityStrip mac={host.Mac} limit={showCount} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
