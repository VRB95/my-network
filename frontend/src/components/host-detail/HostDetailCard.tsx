import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, Circle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback'
import type { Host } from '@/types/host'

interface HostDetailCardProps {
  host: Host
}

export function HostDetailCard({ host }: HostDetailCardProps) {
  const navigate = useNavigate()
  const [name, setName] = React.useState(host.Name)

  React.useEffect(() => setName(host.Name), [host.Name])

  const debouncedSaveName = useDebouncedCallback(async (value: string) => {
    await apiService.editHost(host.ID, value)
  }, 300)

  const handleNameChange = (value: string) => {
    setName(value)
    debouncedSaveName(value)
  }

  const handleToggleKnown = async () => {
    await apiService.editHost(host.ID, name || host.Name, 'toggle')
  }

  const handleDelete = async () => {
    await apiService.deleteHost(host.ID)
    navigate('/')
  }

  const handleWakeOnLan = async () => {
    await apiService.wakeOnLan(host.Mac)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Host</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="divide-y divide-slate-100 text-sm">
          <Row label="ID">{host.ID}</Row>
          <Row label="Name">
            <Input value={name} onChange={(e) => handleNameChange(e.target.value)} className="h-8" />
          </Row>
          <Row label="DNS name">{host.DNS}</Row>
          <Row label="Iface">{host.Iface}</Row>
          <Row label="IP">
            <a href={`http://${host.IP}`} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
              {host.IP}
            </a>
          </Row>
          <Row label="MAC">
            <span className="font-mono text-xs">{host.Mac}</span>
          </Row>
          <Row label="Hardware">{host.Hw}</Row>
          <Row label="Date">{host.Date}</Row>
          <Row label="Known">
            <Switch checked={host.Known === 1} onCheckedChange={handleToggleKnown} />
          </Row>
          <Row label="Online">
            <div className="flex items-center gap-3">
              {host.Now === 1 ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              ) : (
                <Circle className="h-4 w-4 text-slate-300" />
              )}
              <Button size="sm" variant="success" onClick={handleWakeOnLan}>
                Wake-on-LAN
              </Button>
            </div>
          </Row>
        </dl>

        <Button variant="destructive" onClick={handleDelete}>
          Delete host
        </Button>
      </CardContent>
    </Card>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 first:pt-0 last:pb-0">
      <dt className="text-slate-500">{label}</dt>
      <dd className="flex-1 text-right">{children}</dd>
    </div>
  )
}
