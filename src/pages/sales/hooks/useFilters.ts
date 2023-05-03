import { useState } from 'react'
import moment from 'moment'

import { initialAppliedFilters, initialFilters } from '../helpers/constants'
import { type AppliedFilters, type Filters } from '../interfaces/Sales'
import { type DefaultDateType, type RangeDateType } from 'components/datepicker/interfaces/DatePicker'

const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialAppliedFilters)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filterDateLabel, setFilterDateLabel] = useState('')

  /**
 * Handles when user want filter a sales by type of sale.
 * @param {string} typeSale
 */
  const onFilterByTypeSale = (typeSale: string) => {
    setFilters({ ...filters, typeSale })
    setAppliedFilters({ ...appliedFilters, typeSale: true })
  }

  /**
 * The function clears the typeSale filter.
 */
  const onDeleteTypeSaleFilter = () => {
    setFilters({ ...filters, typeSale: '' })
    setAppliedFilters({ ...appliedFilters, typeSale: false })
  }

  /**
 * Handles when user select a default dates in date filters dropdown and update filters.
 * @param {DefaultDateType}  - The function `onApplyDefaultDate` takes in an object with two
 * properties: `action` and `range`.
 */
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

  /**
 * Handles when user select a range of dates in date filters dropdown and update filters.
 * @param {RangeDateType}  - The function `onApplyRangeDate` takes in an object with two properties:
 * `fromDate` and `toDate`.
 */
  const onApplyRangeDate = ({ fromDate, toDate }: RangeDateType) => {
    setFilters({
      ...filters,
      fromDate,
      toDate
    })
    setFilterDateLabel(`${moment(fromDate).format('LL')} - ${moment(toDate).format('LL')}`)
    setAppliedFilters({ ...appliedFilters, date: true })
  }

  /**
 * The function deletes date filters and resets related states.
 */
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

  /**
 * Handles when user wanna see the info in specific sales.
 * @param {string} search
 */
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

export default useFilters
