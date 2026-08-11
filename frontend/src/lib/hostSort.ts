import type { Host, HostField } from '@/types/host'

export interface SortState {
  field: HostField | null
  ascending: boolean
}

export const defaultSortState: SortState = { field: 'IP', ascending: true }

/** Returns a new, sorted array - never mutates the input. */
export function sortHosts(hosts: Host[], sort: SortState): Host[] {
  if (!sort.field) return hosts

  const field = sort.field
  const copy = [...hosts]

  if (field === 'IP') {
    copy.sort((a, b) => compareIPs(a.IP, b.IP) * (sort.ascending ? 1 : -1))
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

function compareIPs(left: string, right: string) {
  const leftParts = left.split('.').map(Number)
  const rightParts = right.split('.').map(Number)
  const areIPv4 = leftParts.length === 4 && rightParts.length === 4 &&
    leftParts.every(Number.isInteger) && rightParts.every(Number.isInteger)

  if (!areIPv4) return left.localeCompare(right, undefined, { numeric: true })
  for (let index = 0; index < 4; index += 1) {
    if (leftParts[index] !== rightParts[index]) return leftParts[index] - rightParts[index]
  }
  return 0
}
