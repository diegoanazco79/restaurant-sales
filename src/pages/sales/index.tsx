import { Container } from '@mui/material'

import Filters from './components/Filters'
import SalesTable from './components/SalesTable'
import TitlePage from 'components/titlePage'

import useSales from './hooks/useSales'

const SalesPages = () => {
  const {
    filters, appliedFilters, filterDateLabel, startDate, endDate,
    salesList, currentSale, currentPage, rowsPerPage,
    setFilterDateLabel, setEndDate, setStartDate,
    onSearchClient, onSearchUser, onFilterByTypeSale, onDeleteTypeSaleFilter,
    onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter, onDeleteSale,
    handleChangePage, handleChangeRowsPerPage, onSelectSale
  } = useSales()

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
    onSearchClient,
    onSearchUser,
    onFilterByTypeSale,
    onDeleteTypeSaleFilter,
    onApplyDefaultDate,
    onApplyRangeDate,
    onDeleteDateFilter
  }

  const salesTableProps = {
    sales: salesList,
    currentSale,
    currentPage,
    rowsPerPage,
    onSelectSale,
    handleChangePage,
    handleChangeRowsPerPage,
    onDeleteSale
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Historial de Ventas' />
      <Filters {...filtersProps} />
      <SalesTable {...salesTableProps} />
    </Container>
  )
}

export default SalesPages
