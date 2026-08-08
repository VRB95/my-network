/** Application configuration, as returned by / posted to the myNetwork API. */
export interface Config {
  Host: string
  Port: string
  Theme: string
  Color: string
  DirPath: string
  Timeout: number
  NodePath: string
  LogLevel: string
  Ifaces: string
  ArpArgs: string
  ArpStrs: string[]
  TrimHist: number
  ShoutURL: string
  UseDB: string
  PGConnect: string
  // InfluxDB
  InfluxEnable: boolean
  InfluxAddr: string
  InfluxToken: string
  InfluxOrg: string
  InfluxBucket: string
  InfluxSkipTLS: boolean
  // Prometheus
  PrometheusEnable: boolean
}

export const emptyConfig: Config = {
  Host: '',
  Port: '',
  Theme: '',
  Color: '',
  DirPath: '',
  Timeout: 120,
  NodePath: '',
  LogLevel: '',
  Ifaces: '',
  ArpArgs: '',
  ArpStrs: [],
  TrimHist: 48,
  ShoutURL: '',
  UseDB: '',
  PGConnect: '',
  InfluxEnable: false,
  InfluxAddr: '',
  InfluxToken: '',
  InfluxOrg: '',
  InfluxBucket: '',
  InfluxSkipTLS: false,
  PrometheusEnable: false,
}
