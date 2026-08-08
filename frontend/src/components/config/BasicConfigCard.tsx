import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'
import { useConfig } from '@/store/ConfigContext'

// Kept for backend compatibility: the API still stores/serves a bootswatch
// theme name even though this rewrite renders with Tailwind/shadcn instead
// of swapping Bootstrap stylesheets at runtime.
const THEMES = [
  'cerulean', 'cosmo', 'cyborg', 'darkly', 'emerald', 'flatly', 'grass', 'grayscale',
  'journal', 'litera', 'lumen', 'lux', 'materia', 'minty', 'morph', 'ocean', 'pulse',
  'quartz', 'sand', 'sandstone', 'simplex', 'sketchy', 'slate', 'solar', 'spacelab',
  'superhero', 'united', 'vapor', 'wood', 'yeti', 'zephyr',
]

export function BasicConfigCard() {
  const { config, refresh } = useConfig()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await apiService.saveBasicConfig(e.currentTarget)
    await refresh()
  }

  const handleTestNotify = () => {
    apiService.testNotify()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic config</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Host">
            <Input name="host" defaultValue={config.Host} />
          </Field>
          <Field label="Port">
            <Input name="port" defaultValue={config.Port} />
          </Field>
          <Field label="Theme">
            <Select name="theme" defaultValue={config.Theme}>
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Color mode">
            <Select name="color" defaultValue={config.Color || 'light'}>
              <option value="dark">dark</option>
              <option value="light">light</option>
            </Select>
          </Field>
          <Field label="Local node-bootstrap URL">
            <Input name="node" defaultValue={config.NodePath} />
          </Field>
          <Field label="Shoutrrr URL">
            <Textarea name="shout" defaultValue={config.ShoutURL} rows={3} />
          </Field>

          <div className="flex items-center justify-between pt-1">
            <Button type="submit">Save</Button>
            <Button type="button" variant="outline" onClick={handleTestNotify}>
              Test notification
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-center gap-3">
      <Label className="col-span-1">{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  )
}
