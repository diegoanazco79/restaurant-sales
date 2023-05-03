import { Box, Button, ButtonGroup, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { buttonGroupStyles, pxToRem } from 'theme/helpers/functions'
import { useState } from 'react'

import DatePickerFilter from 'components/datepicker'
import Dropdown, { type Option } from 'components/dropdown'
import SearchInput from 'components/searchInput'

import { invoiceTypeOptions } from '../helpers/constants'
import { type AppliedFilters, type Filters as FiltersType } from '../interfaces/Invoices'
import { type DefaultDateType } from 'components/datepicker/interfaces/DatePicker'

interface Props {
  filters: FiltersType
  appliedFilters: AppliedFilters
  startDate: Date | null
  endDate: Date | null
  filterDateLabel: DefaultDateType['action']
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>
  setFilterDateLabel: React.Dispatch<React.SetStateAction<string>>
  onSearchInvoice: (value: string) => void
  onSearchUser: (value: string) => void
  onFilterByInvoiceType: (invoiceType: string) => void
  onDeleteInvoiceTypeFilter: () => void
  onApplyDefaultDate: ({ action, range }: DefaultDateType) => void
  onApplyRangeDate: ({ fromDate, toDate }: any) => void
  onDeleteDateFilter: () => void
}

const Filters = ({
  filters, appliedFilters, filterDateLabel, startDate, endDate,
  setFilterDateLabel, setStartDate, setEndDate,
  onSearchInvoice, onSearchUser, onFilterByInvoiceType, onDeleteInvoiceTypeFilter,
  onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter
}: Props) => {
  const [typeSearch, setTypeSearch] = useState('invoice')
  const theme = useTheme()

  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasDateFilter = appliedFilters?.date
  const hasInvoiceTypeFilter = appliedFilters?.invoiceType

  const currentTypeSale = filters?.invoiceType || ''

  const handleOptionClick = (option: Option) => {
    onFilterByInvoiceType(option?.id)
  }

  /* Component's Props */
  const datePickerProps = {
    startDate,
    endDate,
    defaultOption: filterDateLabel,
    filterActive: hasDateFilter,
    setStartDate,
    setEndDate,
    setDefaultOption: setFilterDateLabel,
    onApplyDefaultDate,
    onApplyRangeDate
  }

  return (
    <>
      <Box mb={2} display='flex'>
        <Box display='flex' flexDirection='column' height={pxToRem(56)}>
          <Typography variant='caption'>Tipo de búsqueda: </Typography>
          <ButtonGroup variant="contained" sx={{ mb: 2, mr: 2 }}>
            <Button
              onClick={() => { setTypeSearch('invoice') }}
              sx={buttonGroupStyles(theme, typeSearch === 'invoice')}
            >
              Factura
            </Button>
            <Button
              onClick={() => { setTypeSearch('user') }}
              sx={buttonGroupStyles(theme, typeSearch === 'user')}
            >
              Usuario
            </Button>
          </ButtonGroup>
        </Box>
        <Grid container spacing={2} alignItems='end'>
          <Grid item sm={3} md={5} lg={4} textAlign='left'>
            <SearchInput
              placeholder={`Buscar por ${typeSearch === 'invoice' ? 'factura / boleta' : 'usuario'}`}
              onChange={typeSearch === 'invoice' ? onSearchInvoice : onSearchUser}
            />
          </Grid>

          <Grid item sm={4} md={3} lg={3} xl={2} >
            <DatePickerFilter {...datePickerProps} />
          </Grid>

          <Grid item sm={5} md={4} lg={4} textAlign='left'>
            <Dropdown
              buttonLabel='Filtrar por tipo'
              sx={{ marginRight: 2 }}
              selected={hasInvoiceTypeFilter}
              options={invoiceTypeOptions}
              handleOptionClick={handleOptionClick}
            />
          </Grid>

        </Grid>
      </Box>
      {hasFilters && (
        <Grid container my={2}>
          <Grid item md={12} display='flex'>
            <Typography variant='body2' fontWeight={600} marginRight={1}>
              Filtros aplicados:
            </Typography>
            <Stack direction="row" spacing={1}>
              {hasInvoiceTypeFilter && (
                <Chip
                  label={`Tipo de venta: ${currentTypeSale} `}
                  onDelete={onDeleteInvoiceTypeFilter}
                />
              )}
              {hasDateFilter && (
                <Chip
                  label={`Fecha: ${filterDateLabel} `}
                  onDelete={onDeleteDateFilter}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default Filters
