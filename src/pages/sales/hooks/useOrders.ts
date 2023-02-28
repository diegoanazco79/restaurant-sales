import { type Dispatch, type SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'

import { type OrderType } from '../interfaces/Orders'
import { ordersMock } from '../mock/ordersMock'

const useOrders = () => {
  const [orders] = useState<OrderType[]>(ordersMock)

  /**
   * Handles when user want to delete a order
   * @param setOpen - Handles a popover state
   * @param idOrder - Id order
   */
  const onDeleteOrder = (setOpen: Dispatch<SetStateAction<HTMLButtonElement | null>>, idOrder: string) => {
    setOpen(null)
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
    onDeleteOrder
  }
}

export default useOrders
