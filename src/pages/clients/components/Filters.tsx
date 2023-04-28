import { useState } from 'react'
import { Box, Grid, Button } from '@mui/material'

import ClientManagement from './ClientManagement'
import Modal from 'components/modal/Modal'
import SearchInput from 'components/searchInput'

import { type Client } from '../interfaces/Clients'

interface Props {
  onSearchClient: (search: string) => void
  onAddClient: (client: Client, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const Filters = ({ onSearchClient, onAddClient }: Props) => {
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
        title='Añadir cliente'
      >
        <ClientManagement
          actionType='create'
          setShow={setShowAddModal}
          onFinishModal={onAddClient}
        />
      </Modal>
    </Box>
  )
}

export default Filters
