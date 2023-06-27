import { Container, LinearProgress } from '@mui/material'

import EmptyData from './components/EmptyData'
import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import RoomList from './components/RoomsList'
import RoomManagement from 'containers/roomManagement'
import TitlePage from 'components/titlePage'

import useRooms from './hooks/useRooms'

const RoomsPage = () => {
  const {
    roomsList, currentRoom, loadingRooms, showAddModal, showEditModal,
    setShowAddModal, setShowEditModal,
    onSearchRoom, onSelectRoom, onDeleteRoom, onAddRoom, onEditRoom
  } = useRooms()

  /* Component's Props */
  const filtersProps = {
    onSearchRoom
  }

  const roomsListProps = {
    rooms: roomsList,
    setShowAddModal,
    setShowEditModal,
    onSelectRoom,
    onDeleteRoom
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }} >
      <TitlePage title="Gestión de Ambientes" />
      <Filters {...filtersProps} />
      {loadingRooms
        ? <LinearProgress />
        : (
          <>
            {!roomsList && !loadingRooms
              ? <EmptyData setShowAddModal={setShowAddModal} />
              : <RoomList {...roomsListProps} />
            }
          </>
        )
      }
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar ambiente'
      >
        <RoomManagement
          actionType='edit'
          room={currentRoom}
          setShow={setShowEditModal}
          onFinishModal={onEditRoom}
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
          onFinishModal={onAddRoom}
        />
      </Modal>
    </Container>
  )
}

export default RoomsPage
