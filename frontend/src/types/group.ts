export interface Group {
  ID: number
  Name: string
  Items: string[]
  IPs: string[]
}

export type GroupInput = Omit<Group, 'ID'> & { ID?: number }
