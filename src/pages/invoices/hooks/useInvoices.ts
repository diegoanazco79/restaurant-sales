import { useState } from 'react'
import Swal from 'sweetalert2'

import useFilters from './useFilters'

import { initialInvoice } from '../helpers/constants'
import { invocesMockList } from '../mock/invoicesMock'
import { type Invoice } from '../interfaces/Invoices'

const useInvoices = () => {
  const [invoicesList] = useState(invocesMockList)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice>(initialInvoice)

  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const {
    filters, appliedFilters, filterDateLabel, startDate, endDate,
    setFilterDateLabel, setStartDate, setEndDate,
    onSearchUser, onSearchInvoice, onFilterByInvoiceType, onDeleteInvoiceTypeFilter,
    onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter
  } = useFilters()

  /**
 * Handles the info of a invoice.
 * @param {Invoice} invoice - Invoice to edit
 */
  const onSelectInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
  }

  /**
 * Handles a change in page and updates the current page number in invoices table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  /**
   * Handles when user change a rows per page in invoices table.
   * @param event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  /**
   * Handles when you want to cancel a invoice.
   * @param {Invoice['id']} invoiceId - Invoice id to delete
   */
  const onCancelInvoice = (invoiceId: Invoice['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de cancelar esta boleta / factura?',
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
          title: '¡Cancelada!',
          text: 'Su boleta / factura ha sido cancelada correctamente',
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
    invoicesList,
    currentInvoice,
    currentPage,
    rowsPerPage,

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
    onDeleteDateFilter,
    onSelectInvoice,
    handleChangePage,
    handleChangeRowsPerPage,
    onCancelInvoice
  }
}

export default useInvoices
