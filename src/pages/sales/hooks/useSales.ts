import { useState } from 'react'
import moment from 'moment'

import { initialAppliedFilters, initialFilters } from '../helpers/constants'
import { type AppliedFilters, type Filters } from '../interfaces/Sales'
import { type RangeDateType, type DefaultDateType } from 'components/datepicker/interfaces/DatePicker'

const useSales = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialAppliedFilters)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filterDateLabel, setFilterDateLabel] = useState('')

  const onFilterByTypeSale = (typeSale: string) => {
    setFilters({ ...filters, typeSale })
    setAppliedFilters({ ...appliedFilters, typeSale: true })
  }

  const onDeleteTypeSaleFilter = () => {
    setFilters({ ...filters, typeSale: '' })
    setAppliedFilters({ ...appliedFilters, typeSale: false })
  }

  const onApplyDefaultDate = ({ action, range }: DefaultDateType) => {
    const { fromDate, toDate } = range
    if (!['today', 'yesterday', 'week', 'month'].includes(action)) return
    setFilters({
      ...filters,
      fromDate,
      toDate
    })
    setFilterDateLabel(action)
    setAppliedFilters({ ...appliedFilters, date: true })
  }

  const onApplyRangeDate = ({ fromDate, toDate }: RangeDateType) => {
    setFilters({
      ...filters,
      fromDate,
      toDate
    })
    setFilterDateLabel(`${moment(fromDate).format('LL')} - ${moment(toDate).format('LL')}`)
    setAppliedFilters({ ...appliedFilters, date: true })
  }

  const onDeleteDateFilter = () => {
    setFilters({
      ...filters,
      fromDate: null,
      toDate: null
    })
    setFilterDateLabel('')
    setStartDate(null)
    setEndDate(null)
    setAppliedFilters({ ...appliedFilters, date: false })
  }

  /**
 * Handles a search input box in sales list.
 * @param {string} search
 */
  const onSearchUser = (search: string) => {
    setFilters({ ...filters, search, searchType: 'user' })
  }

  const onSearchClient = (search: string) => {
    setFilters({ ...filters, search, searchType: 'client' })
  }

  return {
    /* States */
    filters,
    appliedFilters,
    filterDateLabel,
    startDate,
    endDate,

    /* State Functions */
    setFilterDateLabel,
    setStartDate,
    setEndDate,

    /* Functions */
    onSearchUser,
    onSearchClient,
    onFilterByTypeSale,
    onDeleteTypeSaleFilter,
    onApplyDefaultDate,
    onApplyRangeDate,
    onDeleteDateFilter
  }
}

export default useSales
