import { useState } from 'react'
import Swal from 'sweetalert2'

import useFilters from './useFilters'

import { initialSale } from '../helpers/constants'
import { type Sale } from '../interfaces/Sales'
import { salesMockList } from '../mock/salesMock'

const useSales = () => {
  const [salesList] = useState(salesMockList)
  const [currentSale, setCurrentSale] = useState<Sale>(initialSale)

  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const {
    filters, appliedFilters, filterDateLabel, startDate, endDate,
    setFilterDateLabel, setStartDate, setEndDate,
    onSearchUser, onSearchClient, onFilterByTypeSale, onDeleteTypeSaleFilter,
    onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter
  } = useFilters()

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
