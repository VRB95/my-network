import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { HostActivityStrip } from '@/components/history/HostActivityStrip'

interface HostHistoryCardProps {
  mac: string
}

function today() {
  return new Date().toLocaleDateString('en-CA')
}

export function HostHistoryCard({ mac }: HostHistoryCardProps) {
  const [date, setDate] = React.useState(today)

  return (
    <Card>
      <CardHeader className="flex-nowrap">
        <CardTitle className="flex items-center gap-2 font-normal">
          <span>Host History for</span>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="h-8 w-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {mac !== '' && date !== '' ? (
          <HostActivityStrip mac={mac} date={date} limit={15000} />
        ) : (
          <p className="text-sm text-slate-500">Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}
