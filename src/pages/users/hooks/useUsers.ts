import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useUsersApi from 'api/services/useUsersApi'
import { useAuthStore } from 'store/auth'

import { initialFilters, initialUser } from '../helpers/constants'
import { type Filters, type User } from '../interfaces/User'
import { type UpdateUser } from 'api/interfaces/UsersApi'

const useUsers = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [currentUser, setCurrentUser] = useState<User>(initialUser)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const subsidiary = useAuthStore((state) => state.subsidiary)
  const subsidiaryId = subsidiary?.id ?? ''

  const { updateUser, getAllUsers } = useUsersApi()

  /* Handles a edit user mutation */
  const editUserMutation = useMutation({
    mutationFn: async (user: UpdateUser) => await updateUser(user),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Editado!',
        text: 'El usuario ha sido editado correctamente',
        icon: 'success'
      })
    },
    onError: () => {
      void Swal.fire({
        title: 'Oops...',
        text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
        icon: 'error'
      })
    }
  })

  /* Get all users with filters */
  const { data: usersData, isLoading } = useQuery({
    queryKey: ['users', filters, editUserMutation],
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
        editUserMutation.mutate({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status,
          role: user.role._id
        })
        setShow(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
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
    onEditUser
  }
}

export default useUsers
