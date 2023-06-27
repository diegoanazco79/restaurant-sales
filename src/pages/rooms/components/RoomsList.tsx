import { Grid, Typography, Box } from '@mui/material'

import NewRoom from './NewRoom'
import RoomBody from './RoomBody'
import RoomCard from './styled/RoomCard'

import { type Room } from '../interfaces/Room'

interface Props {
  rooms: Room[]
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onDeleteRoom: (roomId: Room['_id']) => void
  onSelectRoom: (room: Room) => void
}

const RoomList = ({
  rooms,
  setShowAddModal, setShowEditModal,
  onSelectRoom, onDeleteRoom
}: Props) => {
  return (
    <>
      <Grid container spacing={3} pb={10}>
        {rooms?.length > 0
          ? (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <NewRoom isEmpty={false} setShowAddModal={setShowAddModal} />
              </Grid>
              {rooms?.map((room, idx) => (
                <Grid
                  item key={idx} xs={12} sm={6} md={3}
                  onClick={(ev) => {
                    ev.stopPropagation()
                    onSelectRoom(room)
                    setShowEditModal(true)
                  }}
                >
                  <RoomCard height="100% !important">
                    <RoomBody room={room} onDeleteRoom={onDeleteRoom} />
                  </RoomCard>

                </Grid>
              ))}
            </>
          )
          : (
            <Box display='flex' mt={5} justifyContent='center' width='100%'>
              <Typography variant="h5" align="center">
                No hay ambientes que coincidan con tu búsqueda
              </Typography>
            </Box>
          )}
      </Grid>
    </>
  )
}

export default RoomList
