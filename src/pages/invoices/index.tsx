import { Container } from '@mui/material'

import Filters from './components/Filters'
import InvoicesTable from './components/InvoicesTable'
import TitlePage from 'components/titlePage'

import useInvoices from './hooks/useInvoices'

const InvoicesPage = () => {
  const {
    filters, appliedFilters, filterDateLabel, startDate, endDate,
    invoicesList, currentInvoice, currentPage, rowsPerPage,
    setFilterDateLabel, setStartDate, setEndDate,
    onSearchUser, onSearchInvoice, onFilterByInvoiceType, onDeleteInvoiceTypeFilter,
    onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter,
    onSelectInvoice, handleChangePage, handleChangeRowsPerPage, onCancelInvoice
  } = useInvoices()

  /* Component's Props */
  const filtersProps = {
    filters,
    appliedFilters,
    filterDateLabel,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setFilterDateLabel,
    onSearchInvoice,
    onSearchUser,
    onFilterByInvoiceType,
    onDeleteInvoiceTypeFilter,
    onApplyDefaultDate,
    onApplyRangeDate,
    onDeleteDateFilter
  }

  const invoicesTableProps = {
    invoices: invoicesList,
    currentInvoice,
    currentPage,
    rowsPerPage,
    onSelectInvoice,
    handleChangePage,
    handleChangeRowsPerPage,
    onCancelInvoice
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Historial de Facturas / Boletas' />
      <Filters {...filtersProps} />
      <InvoicesTable {...invoicesTableProps} />
    </Container>
  )
}

export default InvoicesPage
