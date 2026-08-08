import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'

const MIN_PORT = 1
const MAX_PORT = 65535

interface HostPortScannerProps {
  ip: string
}

export function HostPortScanner({ ip }: HostPortScannerProps) {
  const [beginText, setBeginText] = React.useState('')
  const [endText, setEndText] = React.useState('')
  const [currentPort, setCurrentPort] = React.useState('')
  const [foundPorts, setFoundPorts] = React.useState<number[]>([])

  const stopRef = React.useRef(false)

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
        setFoundPorts((prev) => [...prev, port])
      }
    }
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
            <a
              key={port}
              href={`http://${ip}:${port}`}
              target="_blank"
              rel="noreferrer"
              className="text-sky-700 hover:underline"
            >
              {port}
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
