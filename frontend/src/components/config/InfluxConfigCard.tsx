import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormSwitch } from '@/components/ui/form-switch'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'
import { useConfig } from '@/store/ConfigContext'

export function InfluxConfigCard() {
  const { config, refresh } = useConfig()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await apiService.saveInfluxConfig(e.currentTarget)
    await refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>InfluxDB2 config</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Enable">
            <FormSwitch name="enable" defaultChecked={config.InfluxEnable} />
          </Field>
          <Field label="Address">
            <Input name="addr" defaultValue={config.InfluxAddr} />
          </Field>
          <Field label="Token">
            <Input name="token" defaultValue={config.InfluxToken} />
          </Field>
          <Field label="Org">
            <Input name="org" defaultValue={config.InfluxOrg} />
          </Field>
          <Field label="Bucket">
            <Input name="bucket" defaultValue={config.InfluxBucket} />
          </Field>
          <Field label="Skip TLS verify">
            <FormSwitch name="skip" defaultChecked={config.InfluxSkipTLS} />
          </Field>

          <Button type="submit">Save</Button>
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
