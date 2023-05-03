import { useState } from 'react'
import { Grid, Typography, Popover } from '@mui/material'

import Modal from 'components/modal/Modal'
import RoomActions from './RoomActions'
import RoomBody from './RoomBody'
import RoomCard from './styled/RoomCard'
import RoomManagement from 'containers/roomManagement'

import { type Room } from '../interfaces/Room'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  rooms: Room[]
  currentRoom: Room
  onDeleteRoom: (roomId: Room['id']) => void
  onSelectRoom: (room: Room) => void
}

const RoomList = ({
  rooms, currentRoom,
  onSelectRoom, onDeleteRoom
}: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <Grid container spacing={3} pb={10}>
        <Grid item xs={12} sm={6} md={3}>
          <RoomCard
            display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            onClick={() => { setShowAddModal(true) }}
          >
            <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
            <Typography variant="body1"> Añadir nuevo ambiente </Typography>
          </RoomCard>
        </Grid>
        {rooms.map((room, idx) => (
          <Grid
            item key={idx} xs={12} sm={6} md={3}
            onClick={() => {
              onSelectRoom(room)
              setShowEditModal(true)
            }}
          >
            <RoomCard height='100% !important'>
              <RoomBody room={room} handleOpen={handleOpen} />
            </RoomCard>
            <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 0,
                  width: 'fit-content',
                  '& .MuiMenuItem-root': {
                    typography: 'body2',
                    borderRadius: 0.75
                  }
                }
              }}
            >
              <RoomActions
                room={room}
                setOpen={setOpen}
                onDeleteRoom={onDeleteRoom}
              />
            </Popover>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar ambiente'
      >
        <RoomManagement
          actionType='edit'
          room={currentRoom}
          setShow={setShowEditModal}
        />
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir ambiente'
      >
        <RoomManagement
          actionType='create'
          setShow={setShowEditModal}
        />
      </Modal>
    </>
  )
}

export default RoomList
