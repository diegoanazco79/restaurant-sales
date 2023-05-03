import { Container } from '@mui/material'

import Filters from './components/Filters'
import TitlePage from 'components/titlePage'

import useSales from './hooks/useSales'

const SalesPages = () => {
  const {
    filters, appliedFilters, filterDateLabel, startDate, endDate,
    setFilterDateLabel, setEndDate, setStartDate,
    onSearchClient, onSearchUser, onFilterByTypeSale, onDeleteTypeSaleFilter,
    onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter
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

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Historial de Ventas' />
      <Filters {...filtersProps} />
      {/* Venta - Cliente - Total - Fecha - Boleta - Usuario - Tipo -  Acciones ( Imprimir - Descargar) */}
      {/* Click y ve toda la info: Cliente, productos, total, tipo de pago, tipo (resturante-delivery) */}
    </Container>
  )
}

export default SalesPages
