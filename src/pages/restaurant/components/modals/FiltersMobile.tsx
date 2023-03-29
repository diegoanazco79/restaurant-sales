import React from 'react'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import Dropdown from 'components/dropdown'
import Modal from 'components/modal/Modal'

import { getOrderStatusLabel } from 'pages/restaurant/helpers/functions'

import { EMPTY, IN_PROGRESS, BLOCKED } from 'pages/restaurant/helpers/constants'
import { type AppliedFiltersType, type FiltersType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  showFiltersModal: boolean
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  setShowFiltersModal: React.Dispatch<React.SetStateAction<boolean>>
  onFilterByStatus: (status: string) => void
  onFilterByAmbient: (status: string) => void
  onDeleteStatusFilter: () => void
  onDeleteAmbientFilter: () => void
}

const FiltersMobile = ({
  showFiltersModal, filters, appliedFilters,
  setShowFiltersModal,
  onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
  onDeleteAmbientFilter
}: Props) => {
  const hasFilters = Object.values(appliedFilters).some(val => val === true)
  const hasStatusFilter = appliedFilters?.status
  const hasAmbientFilter = appliedFilters?.ambient

  return (
    <Modal
      title='Filtros'
      open={showFiltersModal}
      setOpen={setShowFiltersModal}
    >
      <>
        <Typography variant='body2' fontWeight={600}>Estado</Typography>
        <Dropdown
          sx={{ width: '100%' }}
          buttonLabel='Filtrar por Estado'
          selected={hasStatusFilter}
          options={[
            { label: 'Vacía', onClick: () => { onFilterByStatus(EMPTY) } },
            { label: 'En progreso', onClick: () => { onFilterByStatus(IN_PROGRESS) } },
            { label: 'Bloqueada', onClick: () => { onFilterByStatus(BLOCKED) } }
          ]}
        />
        <Typography variant='body2' fontWeight={600} mt={2}>Ambiente</Typography>
        <Dropdown
          sx={{ width: '100%' }}
          buttonLabel='Filtrar por Ambiente'
          selected={hasAmbientFilter}
          options={[
            { label: 'Ambiente 01', onClick: () => { onFilterByAmbient('ambiente_01') } },
            { label: 'Ambiente 02', onClick: () => { onFilterByAmbient('ambiente_02') } },
            { label: 'Ambiente 03', onClick: () => { onFilterByAmbient('ambiente_03') } }
          ]}
        />
        {hasFilters && (
          <Grid container marginTop={2} display='flex' flexDirection='column' >
            <Grid item md={12} >
              <Typography variant='body2' fontWeight={600} marginRight={1}>
              Filtros aplicados:
              </Typography>
            </Grid>
            <Grid item md={12} my={1}>
              {hasStatusFilter && (
                <Chip
                  label={`Estado: ${getOrderStatusLabel(filters.status)}`}
                  onDelete={onDeleteStatusFilter}
                />
              )}
            </Grid>
            <Grid item md={12}>
              {hasAmbientFilter && (
                <Chip
                  label={`Ambiente: ${filters?.ambient}`}
                  onDelete={onDeleteAmbientFilter}
                />
              )}
            </Grid>
          </Grid>
        )}
        <Box marginTop={5} display='flex' justifyContent='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => { setShowFiltersModal(false) }}
          >
          Aplicar Filtros
          </Button>
        </Box>
      </>
    </Modal>
  )
}

export default FiltersMobile
