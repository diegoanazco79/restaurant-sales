import React, { useState } from 'react'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'

import Dropdown from 'components/dropdown'
import Modal from 'components/modal/Modal'

import { getOrderStatusLabel } from '../helpers/functions'

import { BLOCKED, EMPTY, IN_PROGRESS } from '../helpers/constants'

interface Props {
  showFiltersModal: boolean
  setShowFiltersModal: React.Dispatch<React.SetStateAction<boolean>>
  onApplyModalFilters: (status: string, ambient: string) => void
}

const FiltersModal = ({
  showFiltersModal,
  setShowFiltersModal,
  onApplyModalFilters
}: Props) => {
  const [statusFilter, setStatusFilter] = useState('')
  const [ambientFilter, setAmbientFilter] = useState('')

  const hasFilters = statusFilter !== '' || ambientFilter !== ''
  const hasStatusFilter = statusFilter !== ''
  const hasAmbientFilter = ambientFilter !== ''

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
            { label: 'Vacía', onClick: () => { setStatusFilter(EMPTY) } },
            { label: 'En progreso', onClick: () => { setStatusFilter(IN_PROGRESS) } },
            { label: 'Bloqueada', onClick: () => { setStatusFilter(BLOCKED) } }
          ]}
        />
        <Typography variant='body2' fontWeight={600} mt={2}>Ambiente</Typography>
        <Dropdown
          sx={{ width: '100%' }}
          buttonLabel='Filtrar por Ambiente'
          selected={hasAmbientFilter}
          options={[
            { label: 'Ambiente 01', onClick: () => { setAmbientFilter('ambiente_01') } },
            { label: 'Ambiente 02', onClick: () => { setAmbientFilter('ambiente_02') } },
            { label: 'Ambiente 03', onClick: () => { setAmbientFilter('ambiente_03') } }
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
                  label={`Estado: ${getOrderStatusLabel(statusFilter)}`}
                  onDelete={() => { setStatusFilter('') }}
                />
              )}
            </Grid>
            <Grid item md={12}>
              {hasAmbientFilter && (
                <Chip
                  label={`Ambiente: ${ambientFilter}`}
                  onDelete={() => { setAmbientFilter('') }}
                />
              )}
            </Grid>
          </Grid>
        )}
        <Box marginTop={5} display='flex' justifyContent='space-between'>
          <Button
            variant='contained'
            color='inherit'
            onClick={() => { setShowFiltersModal(false) }}
          >
            Cancelar
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              onApplyModalFilters(statusFilter, ambientFilter)
              setShowFiltersModal(false)
            }}
          >
            Aplicar Filtros
          </Button>
        </Box>
      </>
    </Modal>
  )
}

export default FiltersModal
