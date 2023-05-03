import type React from 'react'
import Swal from 'sweetalert2'

import { type Room } from 'pages/rooms/interfaces/Room'

const useRoomManagement = () => {
  /**
 * Handles a creation of a room.
 * @param {Room} room - Room to create
 * @param {Function} setShow - Function to close modal
 */
  const onAddRoom = (room: Room, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      void Swal.fire({
        title: '¡Creado!',
        text: 'Su ambiente ha sido creado correctamente',
        icon: 'success'
      })
      console.log(room)
      setShow(false)
    } catch (error) {
      void Swal.fire({
        title: 'Oops...',
        text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
        icon: 'error'
      })
    }
  }

  /**
   * Handles a edition of a room.
   * @param {Room} room - Room to edit
   * @param {Function} setShow - Function to close modal
   */
  const onEditRoom = (room: Room, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    void Swal.fire({
      title: '¿Estas seguro de editar este ambiente?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          console.log(room)
          setShow(false)
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
          title: '¡Editado!',
          text: 'Su ambiente ha sido editado correctamente',
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
  return {
    /* States */

    /* State Functions */

    /* Functions */
    onAddRoom,
    onEditRoom
  }
}

export default useRoomManagement
