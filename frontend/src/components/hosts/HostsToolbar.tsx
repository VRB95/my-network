import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import { HostsFilterBar } from '@/components/hosts/HostsFilterBar'
import { HostSearchInput } from '@/components/hosts/HostSearchInput'
import { useHosts } from '@/store/HostsContext'

export function HostsToolbar() {
  const { editNames, setEditNames, showDetails, setShowDetails, deleteSelected, refresh } = useHosts()

  const enterEditMode = () => setEditNames(true)

  const exitEditMode = async () => {
    setEditNames(false)
    await refresh()
  }

  const handleDelete = async () => {
    await deleteSelected()
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-2">
      <HostsFilterBar />

      <div className="flex items-center gap-2">
        <HostSearchInput />

        <Toggle
          pressed={showDetails}
          onPressedChange={setShowDetails}
          title="Toggle details"
        >
          Details
        </Toggle>

        {editNames ? (
          <>
            <Button variant="destructive" size="sm" onClick={handleDelete} title="Delete selected hosts">
              Delete
            </Button>
            <Button size="sm" onClick={exitEditMode} title="Toggle edit">
              Done
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" onClick={enterEditMode} title="Toggle edit">
            Edit
          </Button>
        )}
      </div>
    </div>
  )
}
