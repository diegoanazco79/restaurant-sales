export interface DefaultDateType {
  action: string
  range: {
    fromDate: Date | null
    toDate: Date | null
  }
}

export interface RangeDateType {
  fromDate: Date | null
  toDate: Date | null
}
