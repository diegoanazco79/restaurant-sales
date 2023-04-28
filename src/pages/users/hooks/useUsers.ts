import { useState } from 'react'
import Swal from 'sweetalert2'

import { initialFilters, initialUser } from '../helpers/constants'
import { usersMock } from '../mock/usersMock'
import { type User } from '../interfaces/User'

const useUsers = () => {
  const [usersList] = useState<User[]>(usersMock)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [currentUser, setCurrentUser] = useState<User>(initialUser)

  const [filters, setFilters] = useState(initialFilters)

  /**
 * Handles a search input box in users list.
 * @param {string} search
 */
  const onSearchUser = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
 * Handles the editing of a user.
 * @param {User} user - User to edit
 */
  const onSelectUser = (user: User) => {
    setCurrentUser(user)
  }

  /**
 * Handles a change in page and updates the current page number in products table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  /**
 * Handles when user change a rows per page in products table.
 * @param event
 */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  /**
 * Handles a invitation of a user.
 * @param {User} user - User to invite
 * @param {Function} setShow - Function to close modal
 */
  const onInviteUser = (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      void Swal.fire({
        title: '¡Invitado!',
        text: 'El usuario ha sido invitado correctamente. Por favor indiquele que revise su buzón de correo electrónico',
        icon: 'success'
      })
      console.log(user)
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
 * Handles a edition of a user.
 * @param {User} user - User to edit
 * @param {Function} setShow - Function to close modal
 */
  const onEditUser = (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    void Swal.fire({
      title: '¿Estas seguro de editar este usuario?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          console.log(user)
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
          text: 'El usuario ha sido editado correctamente',
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
   * Handles when user want to delete a user.
   * @param {User['id']} userId - User id to delete
   */
  const onDeleteUser = (userId: User['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este usuario?',
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
          text: 'Su usuario ha sido eliminado correctamente',
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
    usersList,
    currentPage,
    rowsPerPage,
    currentUser,

    /* Function States */

    /* Functions */
    onSearchUser,
    handleChangePage,
    handleChangeRowsPerPage,
    onSelectUser,
    onInviteUser,
    onEditUser,
    onDeleteUser
  }
}

export default useUsers
