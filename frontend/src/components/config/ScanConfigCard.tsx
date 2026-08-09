import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { apiService } from '@/services/ApiService'
import { useConfig } from '@/store/ConfigContext'

const LOG_LEVELS = ['debug', 'info', 'warn', 'error']

export function ScanConfigCard() {
  const { config, refresh } = useConfig()
  const arpStrs = Array.isArray(config.ArpStrs) ? config.ArpStrs : []

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await apiService.saveScanConfig(e.currentTarget)
    await refresh()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Field label="Interfaces">
            <Input name="ifaces" defaultValue={config.Ifaces} />
          </Field>
          <Field label="Timeout (seconds)">
            <Input name="timeout" type="number" defaultValue={config.Timeout} />
          </Field>
          <Field label="Args for arp-scan">
            <Input name="arpargs" defaultValue={config.ArpArgs} />
          </Field>
          <Field label="Arp Strings">
            <div className="space-y-2">
              {arpStrs.map((arpStr, index) => (
                <Input key={index} name="arpstrs" defaultValue={arpStr} />
              ))}
              <Input name="arpstrs" placeholder="e.g. docker0" />
            </div>
          </Field>
          <Field label="Log level">
            <Select name="log" defaultValue={config.LogLevel}>
              {LOG_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Trim History (hours)">
            <Input name="trim" type="number" defaultValue={config.TrimHist} />
          </Field>
          <Field label="Use DB">
            <Select name="usedb" defaultValue={config.UseDB || 'sqlite'}>
              <option value="sqlite">sqlite</option>
              <option value="postgres">postgres</option>
            </Select>
          </Field>
          <Field label="PG Connect URL">
            <Textarea name="pgconnect" defaultValue={config.PGConnect} rows={3} />
          </Field>

          <div className="flex items-center justify-between pt-1">
            <Button type="submit">Save</Button>
            <p className="text-xs text-slate-500">
              *Pressing <b>Save</b> will trigger a rescan
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-3 items-start gap-3">
      <Label className="col-span-1 pt-2">{label}</Label>
      <div className="col-span-2">{children}</div>
    </div>
  )
}
