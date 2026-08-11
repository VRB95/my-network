/** A single network host, as returned by the myNetwork/WatchYourLAN API. */
export interface Host {
  ID: number
  Name: string
  DNS: string
  Iface: string
  IP: string
  Mac: string
  Hw: string
  Date: string
  Known: number
  Now: number
  GroupID: number
}

export const emptyHost: Host = {
  ID: 0,
  Name: '',
  DNS: '',
  Iface: '',
  IP: '',
  Mac: '',
  Hw: '',
  Date: '',
  Known: 0,
  Now: 0,
  GroupID: 0,
}

/** Fields a host list can be sorted or filtered by. */
export type HostField = keyof Host
