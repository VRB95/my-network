import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'

const MIN_PORT = 1
const MAX_PORT = 65535

interface HostPortScannerProps {
  hostId: number
  ip: string
  savedPort: number
  onPortSaved: (port: number) => void
}

export function HostPortScanner({ hostId, ip, savedPort, onPortSaved }: HostPortScannerProps) {
  const [beginText, setBeginText] = React.useState('')
  const [endText, setEndText] = React.useState('')
  const [portText, setPortText] = React.useState('')
  const [currentPort, setCurrentPort] = React.useState('')
  const [foundPorts, setFoundPorts] = React.useState<number[]>([])
  const [isSaving, setIsSaving] = React.useState(false)

  const stopRef = React.useRef(false)

  React.useEffect(() => setPortText(savedPort ? String(savedPort) : ''), [savedPort])

  const clampPort = (text: string, fallback: number) => {
    const value = Number(text)
    if (Number.isNaN(value) || value < MIN_PORT || value > MAX_PORT) return fallback
    return value
  }

  const runScan = async (from: number) => {
    stopRef.current = false
    const begin = from
    const end = clampPort(endText, MAX_PORT)

    for (let port = begin; port <= end; port++) {
      if (stopRef.current) break

      setCurrentPort(String(port))
      const isOpen = await apiService.scanPort(ip, port)
      if (isOpen) {
        setFoundPorts((prev) => (prev.includes(port) ? prev : [...prev, port]))
      }
    }
  }

  const savePort = async (port: number) => {
    if (!hostId) return
    try {
      setIsSaving(true)
      await apiService.setHostPort(hostId, port)
      onPortSaved(port)
    } finally {
      setIsSaving(false)
    }
  }

  const handleSaveManualPort = () => {
    const port = portText === '' ? 0 : Number(portText)
    if (Number.isNaN(port) || port < 0 || port > MAX_PORT) return
    void savePort(port)
  }

  const handleScan = () => {
    const begin = clampPort(beginText, MIN_PORT)
    runScan(begin)
  }

  const handleStopOrContinue = () => {
    if (stopRef.current) {
      runScan(Number(currentPort))
    } else {
      stopRef.current = true
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Port Scan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="1" value={beginText} onChange={(e) => setBeginText(e.target.value)} />
          <Input placeholder="65535" value={endText} onChange={(e) => setEndText(e.target.value)} />
          <Button onClick={handleScan}>Scan</Button>
        </div>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Preferred port"
            value={portText}
            onChange={(e) => setPortText(e.target.value)}
            className="h-8"
          />
          <Button size="sm" variant="outline" onClick={handleSaveManualPort} disabled={isSaving || !hostId}>
            Save
          </Button>
        </div>

        {currentPort !== '' && (
          <div className="flex items-center justify-between">
            <Button variant="warning" size="sm" onClick={handleStopOrContinue}>
              Stop/Continue
            </Button>
            <span className="text-sm text-slate-500">Scanning port: {currentPort}</span>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {foundPorts.map((port) => (
            <button
              key={port}
              type="button"
              onClick={() => void savePort(port)}
              className="text-sky-700 hover:underline disabled:cursor-not-allowed disabled:text-slate-400"
              disabled={isSaving}
            >
              {port}
              {savedPort === port ? ' selected' : ''}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
