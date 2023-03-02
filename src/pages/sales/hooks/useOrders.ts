import { type Dispatch, type SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'

import { type OrderType } from '../interfaces/Orders'
import { ordersMock } from '../mock/ordersMock'

const useOrders = () => {
  const [orders] = useState<OrderType[]>(ordersMock)

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
      title: '¿Estas seguro de editar esta orden?',
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
          text: 'Su orden ha sido editada correctamente',
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
   * Handles when user want to delete a order
   * @param idOrder - Id order
   */
  const onDeleteOrder = (idOrder: string) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta orden?',
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
          text: 'Su orden ha sido eliminada correctamente',
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

    /* Function States */

    /* Functions */
    onDeleteOrder,
    onEditOrder
  }
}

export default useOrders
