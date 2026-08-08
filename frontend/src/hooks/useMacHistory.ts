import * as React from 'react'
import { apiService } from '@/services/ApiService'
import type { Host } from '@/types/host'

const POLL_INTERVAL_MS = 60_000

/**
 * Fetches history entries for a MAC address (optionally scoped to a single
 * date), sorted newest-first, and refreshes every minute while mounted.
 */
export function useMacHistory(mac: string, date: string) {
  const [history, setHistory] = React.useState<Host[]>([])

  React.useEffect(() => {
    if (!mac) return

    let cancelled = false

    const load = async () => {
      const entries = date === '' ? await apiService.getHistory(mac) : await apiService.getHistoryByDate(mac, date)
      if (!cancelled && entries) {
        setHistory([...entries].sort((a, b) => (a.Date < b.Date ? 1 : -1)))
      }
    }

    load()
    const interval = setInterval(load, POLL_INTERVAL_MS)

    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [mac, date])

  return history
}
