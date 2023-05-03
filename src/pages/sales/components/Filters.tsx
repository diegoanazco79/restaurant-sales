import { Box, Button, ButtonGroup, Chip, Grid, Stack, Typography, useTheme } from '@mui/material'
import { buttonGroupStyles, pxToRem } from 'theme/helpers/functions'
import { useState } from 'react'

import DatePickerFilter from 'components/datepicker'
import Dropdown, { type Option } from 'components/dropdown'
import SearchInput from 'components/searchInput'

import { typeSaleOptions } from '../helpers/constants'
import { type AppliedFilters, type Filters as FiltersType } from '../interfaces/Sales'
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
  onSearchClient: (value: string) => void
  onSearchUser: (value: string) => void
  onFilterByTypeSale: (typeSale: string) => void
  onDeleteTypeSaleFilter: () => void
  onApplyDefaultDate: ({ action, range }: DefaultDateType) => void
  onApplyRangeDate: ({ fromDate, toDate }: any) => void
  onDeleteDateFilter: () => void
}

const Filters = ({
  filters, appliedFilters, filterDateLabel, startDate, endDate,
  setFilterDateLabel, setStartDate, setEndDate,
  onSearchClient, onSearchUser, onFilterByTypeSale, onDeleteTypeSaleFilter,
  onApplyDefaultDate, onApplyRangeDate, onDeleteDateFilter
}: Props) => {
  const [typeSearch, setTypeSearch] = useState('client')
  const theme = useTheme()

  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasDateFilter = appliedFilters?.date
  const hasTypeSaleFilter = appliedFilters?.typeSale

  const currentTypeSale = filters?.typeSale || ''

  const handleOptionClick = (option: Option) => {
    onFilterByTypeSale(option?.id)
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
              onClick={() => { setTypeSearch('client') }}
              sx={buttonGroupStyles(theme, typeSearch === 'client')}
            >
              Cliente
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
              placeholder={`Buscar por ${typeSearch === 'client' ? 'cliente' : 'usuario'}`}
              onChange={typeSearch === 'client' ? onSearchClient : onSearchUser}
            />
          </Grid>

          <Grid item sm={4} md={3} lg={3} xl={2} >
            <DatePickerFilter {...datePickerProps} />
          </Grid>

          <Grid item sm={5} md={4} lg={4} textAlign='left'>
            <Dropdown
              buttonLabel='Filtrar por tipo'
              sx={{ marginRight: 2 }}
              selected={hasTypeSaleFilter}
              options={typeSaleOptions}
              handleOptionClick={handleOptionClick}
            />
          </Grid>

        </Grid>
      </Box>
      {hasFilters && (
        <Grid container marginTop={2}>
          <Grid item md={12} display='flex'>
            <Typography variant='body2' fontWeight={600} marginRight={1}>
              Filtros aplicados:
            </Typography>
            <Stack direction="row" spacing={1}>
              {hasTypeSaleFilter && (
                <Chip
                  label={`Tipo de venta: ${currentTypeSale} `}
                  onDelete={onDeleteTypeSaleFilter}
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
