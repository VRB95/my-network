import * as React from 'react'
import { Input } from '@/components/ui/input'
import { STORAGE_KEYS } from '@/lib/localStorageKeys'

interface HistoryShowCountInputProps {
  value: number
  onChange: (count: number) => void
}

export function HistoryShowCountInput({ value, onChange }: HistoryShowCountInputProps) {
  const [text, setText] = React.useState(String(value))

  const handleInput = (raw: string) => {
    setText(raw)
    localStorage.setItem(STORAGE_KEYS.historyShowCount, raw)

    const parsed = Number(raw)
    onChange(!raw || Number.isNaN(parsed) || parsed === 0 ? 200 : parsed)
  }

  return (
    <Input
      value={text}
      onChange={(e) => handleInput(e.target.value)}
      placeholder="Show elements"
      title="Number of elements to show"
      className="h-8 max-w-40 text-sm"
    />
  )
}
