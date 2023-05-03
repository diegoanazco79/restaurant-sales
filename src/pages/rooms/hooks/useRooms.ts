import { useState } from 'react'
import Swal from 'sweetalert2'

import { initialFilters, initialRoom } from '../helpers/constants'
import { type Room, type Filters } from '../interfaces/Room'
import { roomsMockList } from '../mock/roomsMock'

const useRooms = () => {
  const [roomsList] = useState<Room[]>(roomsMockList)
  const [currentRoom, setCurrentRoom] = useState<Room>(initialRoom)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  /**
   * Handles when user want to delete a room.
   * @param {Room['id']} roomId - Room id to delete
   */
  const onDeleteRoom = (roomId: Room['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este ambiente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if ((result.value?.isConfirmed) ?? false) {
        void Swal.fire({
          title: '¡Eliminado!',
          text: 'Su ambiente ha sido eliminado correctamente',
          icon: 'success'
        })
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /**
 * Handles a search input box in rooms list.
 * @param {string} search
 */
  const onSearchRoom = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
 * Handles the editing of a room.
 * @param {Room} room - Room to edit
 */
  const onSelectRoom = (room: Room) => {
    setCurrentRoom(room)
  }
  return {
    /* States */
    roomsList,
    currentRoom,

    /* Function States */

    /* Functions */
    onDeleteRoom,
    onSearchRoom,
    onSelectRoom
  }
}

export default useRooms
