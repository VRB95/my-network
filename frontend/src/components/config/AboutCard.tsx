import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { apiService } from '@/services/ApiService'

const RELEASES_URL = 'https://github.com/aceberg/WatchYourLAN/releases/tag/'

const REFERENCE_ROWS: { label: string; content: React.ReactNode }[] = [
  {
    label: 'Swagger API docs',
    content: (
      <a href="/swagger/index.html" target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
        /swagger/index.html
      </a>
    ),
  },
  {
    label: 'Local node-bootstrap URL',
    content: (
      <>
        local themes and fonts (optional). If empty, the app pulls everything from{' '}
        <code className="rounded bg-slate-100 px-1">cdn</code>
      </>
    ),
  },
  {
    label: 'Shoutrrr URL',
    content: (
      <>
        provides notifications to Discord, Email, Gotify, Telegram and other services.{' '}
        <a
          href="https://shoutrrr.nickfedor.com/services/overview/"
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 hover:underline"
        >
          Link to documentation
        </a>
      </>
    ),
  },
  { label: 'Interfaces', content: 'one or more, space separated' },
  { label: 'Timeout (seconds)', content: 'time between scans' },
  {
    label: 'Args for arp-scan',
    content: (
      <>
        pass your own arguments to <code className="rounded bg-slate-100 px-1">arp-scan</code>. Enable{' '}
        <b>debug</b> log level to see the resulting command. (Example:{' '}
        <code className="rounded bg-slate-100 px-1">-r 1</code>)
      </>
    ),
  },
  {
    label: 'Arp Strings',
    content: (
      <>
        can set up scans for <code className="rounded bg-slate-100 px-1">vlans</code>,{' '}
        <code className="rounded bg-slate-100 px-1">docker0</code> and etcetera.
      </>
    ),
  },
  { label: 'Trim History', content: 'remove history after (hours)' },
  {
    label: 'PG Connect URL',
    content: (
      <>
        address to connect to PostgreSQL DB. (Example:{' '}
        <code className="rounded bg-slate-100 px-1">
          postgres://username:password@192.168.0.1:5432/dbname?sslmode=disable
        </code>
        ). Full list of URL parameters{' '}
        <a
          href="https://pkg.go.dev/github.com/lib/pq#hdr-Connection_String_Parameters"
          target="_blank"
          rel="noreferrer"
          className="text-sky-700 hover:underline"
        >
          here
        </a>
      </>
    ),
  },
]

export function AboutCard() {
  const [version, setVersion] = React.useState('')

  React.useEffect(() => {
    apiService.getVersion().then(setVersion)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          About ({version && (
            <a href={RELEASES_URL + version} target="_blank" rel="noreferrer" className="text-sky-700 hover:underline">
              {version}
            </a>
          )})
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <tbody className="divide-y divide-slate-100">
            {REFERENCE_ROWS.map((row) => (
              <tr key={row.label}>
                <td className="w-56 py-2 pr-4 align-top font-semibold">{row.label}</td>
                <td className="py-2 align-top text-slate-600">{row.content}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
