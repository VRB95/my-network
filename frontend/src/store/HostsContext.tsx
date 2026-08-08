import * as React from 'react'
import { apiService } from '@/services/ApiService'
import type { Host, HostField } from '@/types/host'
import { defaultFilterState, filterHosts, type FilterState } from '@/lib/hostFilter'
import { defaultSortState, nextSortState, sortHosts, type SortState } from '@/lib/hostSort'
import { searchHosts } from '@/lib/hostSearch'
import { STORAGE_KEYS } from '@/lib/localStorageKeys'

const POLL_INTERVAL_MS = 60_000

interface HostsContextValue {
  /** Raw hosts, straight from the API, before filter/search/sort. */
  rawHosts: Host[]
  /** rawHosts run through the current filter -> search -> sort pipeline. */
  hosts: Host[]
  /** Distinct network interfaces seen across all hosts, for the filter dropdown. */
  ifaces: string[]
  isLoading: boolean

  filter: FilterState
  setFilter: (field: HostField, value: string) => void
  resetFilter: () => void

  search: string
  setSearch: (query: string) => void

  sort: SortState
  sortBy: (field: HostField) => void

  editNames: boolean
  setEditNames: (value: boolean) => void

  selectedIds: number[]
  toggleSelected: (id: number, checked: boolean) => void
  clearSelected: () => void

  showDetails: boolean
  setShowDetails: (value: boolean) => void

  refresh: () => Promise<void>
  deleteSelected: () => Promise<void>
}

const HostsContext = React.createContext<HostsContextValue | null>(null)

export function HostsProvider({ children }: { children: React.ReactNode }) {
  const [rawHosts, setRawHosts] = React.useState<Host[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [filter, setFilterState] = React.useState<FilterState>(() => readPersistedFilter())
  const [search, setSearch] = React.useState('')
  const [sort, setSort] = React.useState<SortState>(() => readPersistedSort())

  const [editNames, setEditNames] = React.useState(false)
  const [selectedIds, setSelectedIds] = React.useState<number[]>([])
  const [showDetails, setShowDetails] = React.useState(false)

  const refresh = React.useCallback(async () => {
    const hosts = await apiService.getAllHosts()
    if (hosts !== null && hosts.length > 0) {
      setRawHosts(hosts)
    }
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    refresh()
    const interval = setInterval(refresh, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [refresh])

  const ifaces = React.useMemo(() => {
    const seen = new Set<string>()
    for (const host of rawHosts) seen.add(host.Iface)
    return [...seen]
  }, [rawHosts])

  const hosts = React.useMemo(() => {
    const filtered = filterHosts(rawHosts, filter)
    const searched = searchHosts(filtered, search)
    return sortHosts(searched, sort)
  }, [rawHosts, filter, search, sort])

  const setFilter = React.useCallback((field: HostField, value: string) => {
    localStorage.setItem(STORAGE_KEYS.filterField, field)
    localStorage.setItem(STORAGE_KEYS.filterValue, value)
    setFilterState({ field, value })
  }, [])

  const resetFilter = React.useCallback(() => {
    localStorage.setItem(STORAGE_KEYS.filterField, '')
    localStorage.setItem(STORAGE_KEYS.filterValue, '')
    setFilterState(defaultFilterState)
  }, [])

  const sortBy = React.useCallback((field: HostField) => {
    setSort((current) => {
      const next = nextSortState(current, field)
      localStorage.setItem(STORAGE_KEYS.sortField, next.field ?? '')
      localStorage.setItem(STORAGE_KEYS.sortDown, String(next.ascending))
      return next
    })
  }, [])

  const toggleSelected = React.useCallback((id: number, checked: boolean) => {
    setSelectedIds((prev) => {
      if (checked) return prev.includes(id) ? prev : [...prev, id]
      return prev.filter((item) => item !== id)
    })
  }, [])

  const clearSelected = React.useCallback(() => setSelectedIds([]), [])

  const deleteSelected = React.useCallback(async () => {
    for (const id of selectedIds) {
      await apiService.deleteHost(id)
    }
    clearSelected()
    setEditNames(false)
    await refresh()
  }, [selectedIds, clearSelected, refresh])

  const value: HostsContextValue = {
    rawHosts,
    hosts,
    ifaces,
    isLoading,
    filter,
    setFilter,
    resetFilter,
    search,
    setSearch,
    sort,
    sortBy,
    editNames,
    setEditNames,
    selectedIds,
    toggleSelected,
    clearSelected,
    showDetails,
    setShowDetails,
    refresh,
    deleteSelected,
  }

  return <HostsContext.Provider value={value}>{children}</HostsContext.Provider>
}

export function useHosts() {
  const ctx = React.useContext(HostsContext)
  if (!ctx) throw new Error('useHosts must be used within a HostsProvider')
  return ctx
}

function readPersistedFilter(): FilterState {
  const field = localStorage.getItem(STORAGE_KEYS.filterField) as HostField | null
  const value = localStorage.getItem(STORAGE_KEYS.filterValue)
  if (!field || !value) return defaultFilterState
  return { field, value }
}

function readPersistedSort(): SortState {
  const field = localStorage.getItem(STORAGE_KEYS.sortField) as HostField | null
  const ascending = localStorage.getItem(STORAGE_KEYS.sortDown)
  if (!field) return defaultSortState
  return { field, ascending: ascending === 'true' }
}
