import { Box, Chip, Grid, Stack, Typography } from '@mui/material'

import Dropdown from 'components/dropdown'
import SearchInput from 'components/searchInput'

import { getOrderStatusLabel } from '../helpers/functions'

import { BLOCKED, EMPTY, IN_PROGRESS } from '../helpers/constants'
import { type OrdersAppliedFiltersType, type OrdersFiltersType } from '../interfaces/Orders'

interface Props {
  orderFilters: OrdersFiltersType
  orderAppliedFilters: OrdersAppliedFiltersType
  onFilterByStatus: (status: string) => void
  onFilterByAmbient: (status: string) => void
  onDeleteStatusFilter: () => void
  onDeleteAmbientFilter: () => void
}

const OrdersFilters = ({
  orderFilters, orderAppliedFilters,
  onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
  onDeleteAmbientFilter
}: Props) => {
  const hasFilters = Object.values(orderAppliedFilters).some(val => val === true)
  const hasStatusFilter = orderAppliedFilters?.status
  const hasAmbientFilter = orderAppliedFilters?.ambient

  return (
    <Box marginBottom={2}>
      <Grid container>
        <Grid item sm={6} md={3}>
          <SearchInput />
        </Grid>
        <Grid item sm={6} md={9} paddingLeft={2} display='flex'>
          <Dropdown
            buttonLabel='Filtrar por Estado'
            sx={{ marginRight: 2 }}
            selected={hasStatusFilter}
            options={[
              { label: 'Vacía', onClick: () => { onFilterByStatus(EMPTY) } },
              { label: 'En progreso', onClick: () => { onFilterByStatus(IN_PROGRESS) } },
              { label: 'Bloqueada', onClick: () => { onFilterByStatus(BLOCKED) } }
            ]}
          />
          <Dropdown
            buttonLabel='Filtrar por Ambiente'
            selected={hasAmbientFilter}
            options={[
              { label: 'Ambiente 01', onClick: () => { onFilterByAmbient('ambiente_01') } },
              { label: 'Ambiente 02', onClick: () => { onFilterByAmbient('ambiente_02') } },
              { label: 'Ambiente 03', onClick: () => { onFilterByAmbient('ambiente_03') } }
            ]}
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
                  label={`Estado: ${getOrderStatusLabel(orderFilters.status)}`}
                  onDelete={onDeleteStatusFilter}
                />
              )}
              {hasAmbientFilter && (
                <Chip
                  label={`Ambiente: ${orderFilters?.ambient}`}
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

export default OrdersFilters
