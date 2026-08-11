import type { Config } from '@/types/config'
import type { Host } from '@/types/host'
import type { Group, GroupInput } from '@/types/group'

/**
 * ApiService centralizes every HTTP call this app makes to the myNetwork
 * (WatchYourLAN-based) backend. It has a single responsibility: talk to the
 * REST API and return typed data. No component or hook should call `fetch`
 * directly - they should go through this class instead.
 *
 * The base path is empty by default because in development Vite proxies
 * `/api`, `/fs`, `/metrics` and `/swagger` straight to the Go backend
 * (see vite.config.ts), and in production the frontend is served by the
 * same backend, so relative paths just work. Plug and play.
 */
class ApiService {
  private readonly basePath: string

  constructor(basePath = '') {
    this.basePath = basePath
  }

  /** GET the full list of known/discovered hosts. */
  async getAllHosts(): Promise<Host[]> {
    return this.getJson<Host[]>('/api/all')
  }

  /** GET a single host by its numeric ID. */
  async getHost(id: string | number): Promise<Host> {
    return this.getJson<Host>(`/api/host/${id}`)
  }

  /** DELETE a host by its numeric ID. */
  async deleteHost(id: number): Promise<Host> {
    return this.getJson<Host>(`/api/host/del/${id}`)
  }

  /**
   * Rename a host and/or toggle its "known" flag.
   * `known` should be the literal string "toggle" to flip the flag, or ""
   * to leave it untouched - matching the backend's own contract.
   */
  async editHost(id: number, name: string, known: '' | 'toggle' = ''): Promise<Host> {
    return this.getJson<Host>(`/api/edit/${id}/${encodeURIComponent(name)}/${known}`)
  }

  /** Send a Wake-on-LAN magic packet to the given MAC address. */
  async wakeOnLan(mac: string): Promise<unknown> {
    return this.getJson(`/api/wol/${mac}`)
  }

  /** Probe whether a single TCP port is open on the given IP. */
  async scanPort(ip: string, port: number): Promise<boolean> {
    return this.getJson<boolean>(`/api/port/${ip}/${port}`)
  }

  /** GET the most recent history entries (up to 210) for a MAC address. */
  async getHistory(mac: string): Promise<Host[]> {
    return this.getJson<Host[]>(`/api/history/${mac}/?num=210`)
  }

  /** GET history entries for a MAC address on a specific date (YYYY-MM-DD). */
  async getHistoryByDate(mac: string, date: string): Promise<Host[]> {
    return this.getJson<Host[]>(`/api/history/${mac}/${date}`)
  }

  /** GET the current application configuration. */
  async getConfig(): Promise<Config> {
    return this.getJson<Config>('/api/config')
  }

  /** GET the running backend version string. */
  async getVersion(): Promise<string> {
    return this.getJson<string>('/api/version')
  }

  async getGroups(): Promise<Group[]> {
    return this.getJson<Group[]>('/api/groups')
  }

  async saveGroup(group: GroupInput): Promise<Group> {
    const path = group.ID ? `/api/groups/${group.ID}` : '/api/groups'
    return this.sendJson<Group>(path, group.ID ? 'PUT' : 'POST', group)
  }

  async deleteGroup(id: number): Promise<void> {
    const response = await fetch(this.url(`/api/groups/${id}`), { method: 'DELETE' })
    if (!response.ok) throw new Error(await this.errorMessage(response))
  }

  /** Trigger a test notification through the configured Shoutrrr URL. */
  async testNotify(): Promise<void> {
    await fetch(this.url('/api/notify_test'))
  }

  /** Submit the "Basic config" form. */
  async saveBasicConfig(form: HTMLFormElement): Promise<void> {
    await this.postForm('/api/config/', form)
  }

  /** Submit the "Scan settings" form. */
  async saveScanConfig(form: HTMLFormElement): Promise<void> {
    await this.postForm('/api/config_settings/', form)
  }

  /** Submit the "InfluxDB2 config" form. */
  async saveInfluxConfig(form: HTMLFormElement): Promise<void> {
    await this.postForm('/api/config_influx/', form)
  }

  /** Submit the "Prometheus config" form. */
  async savePrometheusConfig(form: HTMLFormElement): Promise<void> {
    await this.postForm('/api/config_prometheus/', form)
  }

  // -- internals ------------------------------------------------------

  private url(path: string): string {
    return this.basePath + path
  }

  private async getJson<T>(path: string): Promise<T> {
    const response = await fetch(this.url(path))
    if (!response.ok) throw new Error(await this.errorMessage(response))
    return (await response.json()) as T
  }

  private async sendJson<T>(path: string, method: string, body: unknown): Promise<T> {
    const response = await fetch(this.url(path), {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error(await this.errorMessage(response))
    return (await response.json()) as T
  }

  private async errorMessage(response: Response): Promise<string> {
    const body = (await response.json().catch(() => null)) as { error?: string } | null
    return body?.error ?? `Request failed (${response.status})`
  }

  private async postForm(path: string, form: HTMLFormElement): Promise<Response> {
    return fetch(this.url(path), {
      method: 'POST',
      body: new FormData(form),
    })
  }
}

/** Shared singleton instance - the only thing the rest of the app imports. */
export const apiService = new ApiService()
