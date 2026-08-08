import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { FormSwitch } from '@/components/ui/form-switch'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'
import { useConfig } from '@/store/ConfigContext'

export function PrometheusConfigCard() {
  const { config, refresh } = useConfig()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await apiService.savePrometheusConfig(e.currentTarget)
    await refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prometheus config</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-3 items-center gap-3">
            <Label className="col-span-1">Enable</Label>
            <div className="col-span-2">
              <FormSwitch name="enable" defaultChecked={config.PrometheusEnable} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Button type="submit">Save</Button>
            <a href="/metrics" target="_blank" rel="noreferrer" className="text-sm text-sky-700 hover:underline">
              /metrics
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
