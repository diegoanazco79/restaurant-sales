import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useUsersApi from 'api/services/useUsersApi'
import { useAuthStore } from 'store/auth'

import { initialFilters, initialUser } from '../helpers/constants'
import { type Filters, type User } from '../interfaces/User'

const useUsers = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [currentUser, setCurrentUser] = useState<User>(initialUser)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const subsidiary = useAuthStore((state) => state.subsidiary)
  const subsidiaryId = subsidiary?.id ?? ''

  const { getAllUsers } = useUsersApi()

  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', filters],
    queryFn: async () => await getAllUsers(subsidiaryId, filters)
  })

  /**
 * Handles a search input box in users list.
 * @param {string} search
 */
  const onSearchUser = (search: string) => {
    setFilters({ ...filters, search, page: 1, limit: 10 })
  }

  /**
 * Handles the editing of a user.
 * @param {User} user - User to edit?
 */
  const onSelectUser = (user: User) => {
    setCurrentUser(user)
  }

  /**
 * Handles a change in page and updates the current page number in users table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
    setFilters({ ...filters, page: newPage })
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
    usersList: usersData?.data ?? [],
    totalPages: usersData?.totalPages ?? 0,
    currentPage,
    currentUser,
    isLoading,

    /* Function States */

    /* Functions */
    onSearchUser,
    handleChangePage,
    onSelectUser,
    onInviteUser,
    onEditUser,
    onDeleteUser
  }
}

export default useUsers
