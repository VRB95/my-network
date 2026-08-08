import { BasicConfigCard } from '@/components/config/BasicConfigCard'
import { ScanConfigCard } from '@/components/config/ScanConfigCard'
import { InfluxConfigCard } from '@/components/config/InfluxConfigCard'
import { PrometheusConfigCard } from '@/components/config/PrometheusConfigCard'
import { AboutCard } from '@/components/config/AboutCard'
import { AttributionCard } from '@/components/config/AttributionCard'

export function ConfigPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-4">
        <BasicConfigCard />
        <AttributionCard />
        <ScanConfigCard />
      </div>
      <div className="space-y-4">
        <InfluxConfigCard />
        <PrometheusConfigCard />
        <AboutCard />
      </div>
    </div>
  )
}
