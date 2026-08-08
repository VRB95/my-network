import type { Host, HostField } from '@/types/host'

export interface FilterState {
  field: HostField | null
  value: string
}

export const defaultFilterState: FilterState = { field: null, value: '' }

/** Returns a new, filtered array - never mutates the input. */
export function filterHosts(hosts: Host[], filter: FilterState): Host[] {
  if (!filter.field || filter.value === '') return hosts

  switch (filter.field) {
    case 'Iface':
      return hosts.filter((host) => host.Iface === filter.value)
    case 'Known':
      return hosts.filter((host) => host.Known === Number(filter.value))
    case 'Now':
      return hosts.filter((host) => host.Now === Number(filter.value))
    default:
      return hosts
  }
}
