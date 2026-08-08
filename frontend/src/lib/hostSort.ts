import type { Host, HostField } from '@/types/host'

export interface SortState {
  field: HostField | null
  ascending: boolean
}

export const defaultSortState: SortState = { field: null, ascending: true }

/** Returns a new, sorted array - never mutates the input. */
export function sortHosts(hosts: Host[], sort: SortState): Host[] {
  if (!sort.field) return hosts

  const field = sort.field
  const copy = [...hosts]

  if (field === 'IP') {
    copy.sort((a, b) => (sort.ascending ? ipToNumber(a) - ipToNumber(b) : ipToNumber(b) - ipToNumber(a)))
  } else {
    copy.sort((a, b) => compareByField(a, b, field, sort.ascending))
  }

  return copy
}

/** Toggles sort direction when re-clicking the same field, otherwise resets to ascending. */
export function nextSortState(current: SortState, field: HostField): SortState {
  if (current.field !== field) {
    return { field, ascending: true }
  }
  return { field, ascending: !current.ascending }
}

function compareByField(a: Host, b: Host, field: HostField, ascending: boolean) {
  if (a[field] > b[field]) return ascending ? 1 : -1
  if (a[field] < b[field]) return ascending ? -1 : 1
  return 0
}

function ipToNumber(host: Host) {
  return Number(
    host.IP.split('.')
      .map((num) => `000${num}`.slice(-3))
      .join(''),
  )
}
