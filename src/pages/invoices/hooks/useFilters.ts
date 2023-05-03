import { useState } from 'react'
import moment from 'moment'

import { initialAppliedFilters, initialFilters } from '../helpers/constants'
import { type AppliedFilters, type Filters } from '../interfaces/Invoices'
import { type DefaultDateType, type RangeDateType } from 'components/datepicker/interfaces/DatePicker'

const useFilters = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialAppliedFilters)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filterDateLabel, setFilterDateLabel] = useState('')

  /**
 * Handles when user want filter a invoices by type of invoice.
 * @param {string} invoiceType
 */
  const onFilterByInvoiceType = (invoiceType: string) => {
    setFilters({ ...filters, invoiceType })
    setAppliedFilters({ ...appliedFilters, invoiceType: true })
  }

  /**
 * The function clears the invoiceType filter.
 */
  const onDeleteInvoiceTypeFilter = () => {
    setFilters({ ...filters, invoiceType: '' })
    setAppliedFilters({ ...appliedFilters, invoiceType: false })
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
  const onSearchInvoice = (search: string) => {
    setFilters({ ...filters, search, searchType: 'invoice' })
  }

  return {
    /* States */
    filters,
    appliedFilters,
    filterDateLabel,
    startDate,
    endDate,

    /* Function States */
    setFilterDateLabel,
    setStartDate,
    setEndDate,

    /* Functions */
    onSearchUser,
    onSearchInvoice,
    onFilterByInvoiceType,
    onDeleteInvoiceTypeFilter,
    onApplyDefaultDate,
    onApplyRangeDate,
    onDeleteDateFilter
  }
}

export default useFilters
