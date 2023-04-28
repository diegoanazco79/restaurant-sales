import { useState } from 'react'
import { Box, Grid, Button } from '@mui/material'

import Modal from 'components/modal/Modal'
import SearchInput from 'components/searchInput'
import UserManagement from './userManagement/UserManagement'

import { type User } from '../interfaces/User'

interface Props {
  onSearchUser: (search: string) => void
  onInviteUser: (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const Filters = ({ onSearchUser, onInviteUser }: Props) => {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <Box mb={2}>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={6} md={3}>
          <SearchInput
            placeholder='Escribe para buscar un usuario'
            onChange={onSearchUser}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={9} textAlign='end'>
          <Button
            variant='contained' color='primary'
            onClick={() => { setShowAddModal(true) }}
          >
            Invitar Usuario
          </Button>
        </Grid>
      </Grid>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Invitar usuario'
      >
        <UserManagement
          actionType='create'
          setShow={setShowAddModal}
          onFinishModal={onInviteUser}
        />
      </Modal>
    </Box>
  )
}

export default Filters
