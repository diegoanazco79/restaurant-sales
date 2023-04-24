import { Box, Chip, Grid, Stack, Typography } from '@mui/material'

import Dropdown, { type Option } from 'components/dropdown'
import SearchInput from 'components/searchInput'

import { getOrderStatusLabel } from '../helpers/functions'

import { BLOCKED, EMPTY, IN_PROGRESS } from '../helpers/constants'
import { type AppliedFiltersType, type FiltersType } from '../interfaces/Tables'

interface Props {
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  onSearchTable: (search: string) => void
  onFilterByStatus: (status: string) => void
  onFilterByAmbient: (status: string) => void
  onDeleteStatusFilter: () => void
  onDeleteAmbientFilter: () => void
}

const Filters = ({
  filters, appliedFilters,
  onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
  onDeleteAmbientFilter, onSearchTable
}: Props) => {
  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasStatusFilter = appliedFilters?.status
  const hasAmbientFilter = appliedFilters?.ambient

  const handleOptionStatus = (option: Option) => {
    if (option?.filterLabel === 'empty') onFilterByStatus(EMPTY)
    if (option?.filterLabel === 'in_progress') onFilterByStatus(IN_PROGRESS)
    if (option?.filterLabel === 'bloqued') onFilterByStatus(BLOCKED)
  }

  const handleOptionAmbient = (option: Option) => {
    onFilterByAmbient(option?.id)
  }

  return (
    <Box marginBottom={2}>
      <Grid container>
        <Grid item sm={6} md={3}>
          <SearchInput
            onChange={onSearchTable}
            placeholder='Escribe para buscar una mesa'
          />
        </Grid>
        <Grid item sm={6} md={9} paddingLeft={2} display='flex'>
          <Dropdown
            buttonLabel='Filtrar por Estado'
            sx={{ marginRight: 2 }}
            selected={hasStatusFilter}
            options={[
              { id: '001', filterLabel: 'empty', label: 'Vacía' },
              { id: '002', filterLabel: 'in_progress', label: 'En progreso' },
              { id: '003', filterLabel: 'bloqued', label: 'Bloqueada' }
            ]}
            handleOptionClick={handleOptionStatus}
          />
          <Dropdown
            buttonLabel='Filtrar por Ambiente'
            selected={hasAmbientFilter}
            options={[
              { id: '004', label: 'Ambiente 01' },
              { id: '005', label: 'Ambiente 02' },
              { id: '006', label: 'Ambiente 03' }
            ]}
            handleOptionClick={handleOptionAmbient}
          />
        </Grid>
      </Grid>
      {hasFilters && (
        <Grid container marginTop={2}>
          <Grid item md={12} display='flex'>
            <Typography variant='body2' fontWeight={600} marginRight={1}>
              Filtros aplicados:
            </Typography>
            <Stack direction="row" spacing={1}>
              {hasStatusFilter && (
                <Chip
                  label={`Estado: ${getOrderStatusLabel(filters.status)}`}
                  onDelete={onDeleteStatusFilter}
                />
              )}
              {hasAmbientFilter && (
                <Chip
                  label={`Ambiente: ${filters?.ambient}`}
                  onDelete={onDeleteAmbientFilter}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Filters
