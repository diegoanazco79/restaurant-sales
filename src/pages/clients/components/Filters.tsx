import { useState } from 'react'
import { Box, Grid, Button } from '@mui/material'

import Modal from 'components/modal/Modal'
import SearchInput from 'components/searchInput'

interface Props {
  onSearchClient: (search: string) => void
}

const Filters = ({ onSearchClient }: Props) => {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={4} lg={4}>
          <SearchInput
            placeholder='Escribe para buscar un cliente'
            onChange={onSearchClient}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={8} lg={8} textAlign='end'>
          <Button
            variant='contained' color='primary'
            onClick={() => { setShowAddModal(true) }}
          >
            Añadir cliente
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Invitar usuario'
      >
        <span>Client Management</span>
      </Modal>
    </Box>
  )
}

export default Filters
