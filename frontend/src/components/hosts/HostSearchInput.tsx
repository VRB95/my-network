import { Search as SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useHosts } from '@/store/HostsContext'

export function HostSearchInput() {
  const { search, setSearch } = useHosts()

  return (
    <div className="relative w-full sm:max-w-xs">
      <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        title="Search"
        className="h-8 pl-8 text-sm"
      />
    </div>
  )
}
