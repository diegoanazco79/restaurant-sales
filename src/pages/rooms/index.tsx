import { Container } from '@mui/material'

import Filters from './components/Filters'
import RoomList from './components/RoomsList'
import TitlePage from 'components/titlePage'

import useRooms from './hooks/useRooms'

const RoomsPage = () => {
  const {
    roomsList, currentRoom,
    onSearchRoom, onSelectRoom, onDeleteRoom
  } = useRooms()

  /* Component's Props */
  const filtersProps = {
    onSearchRoom
  }

  const roomsListProps = {
    rooms: roomsList,
    currentRoom,
    onSelectRoom,
    onDeleteRoom
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }} >
      <TitlePage title="Gestión de Ambientes" />
      <Filters {...filtersProps} />
      <RoomList {...roomsListProps} />
    </Container>
  )
}

export default RoomsPage
