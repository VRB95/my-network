import type { Host } from '@/types/host'

/** Returns a new, search-filtered array - never mutates the input. */
export function searchHosts(hosts: Host[], query: string): Host[] {
  const trimmed = query.trim().toLowerCase()
  if (trimmed === '') return hosts

  return hosts.filter((host) => matchesQuery(host, trimmed))
}

function matchesQuery(host: Host, query: string): boolean {
  return (
    host.Name.toLowerCase().includes(query) ||
    host.Iface.toLowerCase().includes(query) ||
    host.IP.toLowerCase().includes(query) ||
    host.Mac.toLowerCase().includes(query) ||
    host.Hw.toLowerCase().includes(query) ||
    host.Date.toLowerCase().includes(query)
  )
}
