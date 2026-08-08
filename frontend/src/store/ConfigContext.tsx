import * as React from 'react'
import { apiService } from '@/services/ApiService'
import { emptyConfig, type Config } from '@/types/config'

interface ConfigContextValue {
  config: Config
  isLoading: boolean
  refresh: () => Promise<void>
}

const ConfigContext = React.createContext<ConfigContextValue | null>(null)

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = React.useState<Config>(emptyConfig)
  const [isLoading, setIsLoading] = React.useState(true)

  const refresh = React.useCallback(async () => {
    const fetched = await apiService.getConfig()
    setConfig(fetched)
    setIsLoading(false)
  }, [])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  // Mirror the original app's light/dark color mode onto <html class="dark">
  // so Tailwind's dark: variant can pick it up.
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', config.Color === 'dark')
  }, [config.Color])

  const value: ConfigContextValue = { config, isLoading, refresh }

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  const ctx = React.useContext(ConfigContext)
  if (!ctx) throw new Error('useConfig must be used within a ConfigProvider')
  return ctx
}
