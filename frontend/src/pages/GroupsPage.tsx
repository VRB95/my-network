import * as React from 'react'
import { Download, Pencil, Plus, Trash2 } from 'lucide-react'
import { apiService } from '@/services/ApiService'
import type { Group } from '@/types/group'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const splitLines = (value: string) => value.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean)

export function GroupsPage() {
  const [groups, setGroups] = React.useState<Group[]>([])
  const [editing, setEditing] = React.useState<Group | null>(null)
  const [name, setName] = React.useState('')
  const [items, setItems] = React.useState('')
  const [ips, setIps] = React.useState('')
  const [error, setError] = React.useState('')

  const refresh = React.useCallback(() => apiService.getGroups().then(setGroups).catch((e: Error) => setError(e.message)), [])
  React.useEffect(() => { void refresh() }, [refresh])

  const reset = () => { setEditing(null); setName(''); setItems(''); setIps(''); setError('') }
  const edit = (group: Group) => {
    setEditing(group); setName(group.Name); setItems(group.Items.join('\n')); setIps(group.IPs.join('\n')); setError('')
  }
  const submit = async (event: React.FormEvent) => {
    event.preventDefault(); setError('')
    try {
      await apiService.saveGroup({ ID: editing?.ID, Name: name, Items: splitLines(items), IPs: splitLines(ips) })
      reset(); await refresh()
    } catch (e) { setError(e instanceof Error ? e.message : 'Could not save group') }
  }
  const remove = async (group: Group) => {
    if (!window.confirm(`Delete group “${group.Name}”?`)) return
    try { await apiService.deleteGroup(group.ID); await refresh() } catch (e) { setError(e instanceof Error ? e.message : 'Could not delete group') }
  }
  const exportGroup = (group: Group) => {
    const blob = new Blob([JSON.stringify({ Name: group.Name, Items: group.Items, IPs: group.IPs }, null, 2)], { type: 'application/json' })
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `${group.Name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.group.json`; link.click(); URL.revokeObjectURL(link.href)
  }

  return <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
    <Card>
      <CardHeader><CardTitle>Groups</CardTitle><p className="text-sm text-slate-500">Reusable collections of items and IP addresses, stored in your configured database.</p></CardHeader>
      <CardContent className="space-y-3">
        {groups.length === 0 && <p className="text-sm text-slate-500">No groups yet. Create your first one.</p>}
        {groups.map((group) => <div key={group.ID} className="rounded-lg border border-slate-200 p-4">
          <div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{group.Name}</h2><p className="text-xs text-slate-500">{group.Items.length} items · {group.IPs.length} IPs</p></div>
            <div className="flex gap-1"><Button variant="ghost" size="icon" title="Export" onClick={() => exportGroup(group)}><Download className="h-4 w-4" /></Button><Button variant="ghost" size="icon" title="Edit" onClick={() => edit(group)}><Pencil className="h-4 w-4" /></Button><Button variant="ghost" size="icon" title="Delete" onClick={() => void remove(group)}><Trash2 className="h-4 w-4" /></Button></div></div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2"><div><p className="mb-1 text-xs font-medium uppercase text-slate-400">Items</p><div className="flex flex-wrap gap-1">{group.Items.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs">{item}</span>)}</div></div><div><p className="mb-1 text-xs font-medium uppercase text-slate-400">IP addresses</p><div className="flex flex-wrap gap-1">{group.IPs.map((ip) => <code key={ip} className="rounded bg-sky-50 px-2 py-1 text-xs text-sky-700">{ip}</code>)}</div></div></div>
        </div>)}
      </CardContent>
    </Card>
    <Card><CardHeader><CardTitle>{editing ? 'Edit group' : 'New group'}</CardTitle></CardHeader><CardContent>
      <form className="space-y-4" onSubmit={(e) => void submit(e)}><div className="space-y-1.5"><Label htmlFor="group-name">Name</Label><Input id="group-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Office devices" required /></div>
        <div className="space-y-1.5"><Label htmlFor="group-items">Items</Label><Textarea id="group-items" rows={6} value={items} onChange={(e) => setItems(e.target.value)} placeholder={'Router\nPrinter\nNAS'} /><p className="text-xs text-slate-500">One item per line (commas also work).</p></div>
        <div className="space-y-1.5"><Label htmlFor="group-ips">IP addresses</Label><Textarea id="group-ips" rows={6} value={ips} onChange={(e) => setIps(e.target.value)} placeholder={'192.168.1.1\n192.168.1.20'} /><p className="text-xs text-slate-500">IPv4 and IPv6 are supported.</p></div>
        {error && <p className="text-sm text-red-600">{error}</p>}<div className="flex gap-2"><Button type="submit"><Plus className="mr-1 h-4 w-4" />{editing ? 'Save changes' : 'Create group'}</Button>{editing && <Button type="button" variant="outline" onClick={reset}>Cancel</Button>}</div>
      </form>
    </CardContent></Card>
  </div>
}
