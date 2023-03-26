import { type Dispatch, type SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'

import { type RoomType, type OrderType } from '../interfaces/Orders'
import { ordersMock } from '../mock/ordersMock'

const useOrders = () => {
  const [roomType, setRoomType] = useState<RoomType['type']>('restaurant')
  const [orders] = useState<OrderType[]>(ordersMock)

  /**
 * Handles a switch roomtype button
 * @param type - RoomType['type']
 */
  const onChangeRoomType = (type: RoomType['type']) => {
    setRoomType(type)
  }

  /**
   * Handles when user want to add a order
   * @param orderName - New order name
   */
  const onAddOrder = (
    orderName: string,
    setShow: Dispatch<SetStateAction<boolean>>
  ) => {
    setShow(false)
    void Swal.fire({
      title: 'Su mesa ha sido añadida correctamente',
      icon: 'success'
    })
  }

  /**
   * Handles when user want to edit a order
   * @param idOrder - Id order
   * @param orderName - New order name
   */
  const onEditOrder = (
    idOrder: string,
    orderName: string,
    setOpenEditModal: Dispatch<SetStateAction<boolean>>
  ) => {
    void Swal.fire({
      title: '¿Estas seguro de editar esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
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
          title: '¡Editada!',
          text: 'Su mesa ha sido editada correctamente',
          icon: 'success'
        })
        setOpenEditModal(false)
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
   * Handles when user want to block a order
   * @param idOrder - Id order
   */
  const onBlockOrder = (idOrder: string) => {
    void Swal.fire({
      title: '¿Estas seguro de bloquear esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, bloquear',
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
          title: '¡Bloqueada!',
          text: 'Su mesa ha sido bloqueada correctamente',
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
   * Handles when user want to unlock a order
   * @param idOrder - Id order
   */
  const onUnlockOrder = (idOrder: string) => {
    void Swal.fire({
      title: '¿Estas seguro de desbloquear esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, desbloquear',
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
          title: '¡Desbloqueada!',
          text: 'Su mesa ha sido desbloqueada correctamente',
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
   * Handles when user want to delete a order
   * @param idOrder - Id order
   */
  const onDeleteOrder = (idOrder: string) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta mesa?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
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
          title: '¡Eliminada!',
          text: 'Su mesa ha sido eliminada correctamente',
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
    orders,
    roomType,

    /* Function States */

    /* Functions */
    onDeleteOrder,
    onEditOrder,
    onAddOrder,
    onChangeRoomType,
    onBlockOrder,
    onUnlockOrder
  }
}

export default useOrders
