import { useState } from 'react'
import moment from 'moment'
import Swal from 'sweetalert2'

import { initialAppliedFilters, initialFilters, initialSale } from '../helpers/constants'
import { type Sale, type AppliedFilters, type Filters } from '../interfaces/Sales'
import { type RangeDateType, type DefaultDateType } from 'components/datepicker/interfaces/DatePicker'
import { salesMockList } from '../mock/salesMock'

const useSales = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>(initialAppliedFilters)

  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [filterDateLabel, setFilterDateLabel] = useState('')

  const [salesList] = useState(salesMockList)

  const [currentSale, setCurrentSale] = useState<Sale>(initialSale)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

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
 * Handles the info of a sale.
 * @param {Sale} sale - Sale to edit
 */
  const onSelectSale = (sale: Sale) => {
    setCurrentSale(sale)
  }

  /**
 * Handles a change in page and updates the current page number in sales table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  /**
   * Handles when user change a rows per page in sales table.
   * @param event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
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

  /**
   * Handles when you want to delete a sale.
   * @param {Sale['id']} saleId - Sale id to delete
   */
  const onDeleteSale = (saleId: Sale['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta venta?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if ((result.value?.isConfirmed) ?? false) {
        void Swal.fire({
          title: '¡Eliminada!',
          text: 'Su venta ha sido eliminada correctamente',
          icon: 'success'
        })
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  return {
    /* States */
    filters,
    appliedFilters,
    filterDateLabel,
    startDate,
    endDate,
    salesList,
    currentSale,
    currentPage,
    rowsPerPage,

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
    onDeleteDateFilter,
    onSelectSale,
    handleChangePage,
    handleChangeRowsPerPage,
    onDeleteSale
  }
}

export default useSales
