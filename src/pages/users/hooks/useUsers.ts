import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useUsersApi from 'api/services/useUsersApi'
import { useAuthStore } from 'store/auth'

import { initialFilters, initialUser } from '../helpers/constants'
import { type Filters, type User } from '../interfaces/User'
import { type InvitationUser, type UpdateUser } from 'api/interfaces/UsersApi'

const useUsers = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [currentUser, setCurrentUser] = useState<User>(initialUser)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const subsidiary = useAuthStore((state) => state.subsidiary)
  const subsidiaryId = subsidiary?.id ?? ''

  const organization = useAuthStore((state) => state.organization)
  const organizationId = organization?.id ?? ''

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { updateUser, inviteUser, getAllUsers } = useUsersApi()

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

  /* Handles a invitation user mutation */
  const inviteUserMutation = useMutation({
    mutationFn: async (user: InvitationUser) => await inviteUser(user),
    onSuccess: () => {
      setShowAddModal(false)
      void Swal.fire({
        title: '¡Invitado!',
        html: 'El usuario ha sido invitado correctamente. </br> Por favor indique que revise su correo electrónico para continuar con el proceso de registro',
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

  /* Handles an activation user mutation */
  const activeUserMutation = useMutation({
    mutationFn: async (user: UpdateUser) => await updateUser(user),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Activado!',
        text: 'El usuario ha sido activado correctamente',
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

  /* Handles a deactivation user mutation */
  const deactiveUserMutation = useMutation({
    mutationFn: async (user: UpdateUser) => await updateUser(user),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Desactivado!',
        text: 'El usuario ha sido desactivado correctamente',
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
    queryKey: ['users', filters, editUserMutation, activeUserMutation, deactiveUserMutation],
    queryFn: async () => await getAllUsers(subsidiaryId, filters),
    retry: 1
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
  const onInviteUser = async (user: User, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    const newUser = {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role._id,
      subsidiary: subsidiaryId,
      organization: organizationId
    }
    inviteUserMutation.mutate(newUser)
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
      showLoaderOnConfirm: true,
      preConfirm: () => {
        editUserMutation.mutate({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: user.status ?? '',
          role: user.role._id
        })
        setShow(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
 * Handles an activation of a user.
 * @param {User} user - User to active
 */
  const onActiveUser = (user: User) => {
    void Swal.fire({
      title: '¿Estas seguro de activar este usuario?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, activar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        activeUserMutation.mutate({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: 'active',
          role: user.role._id
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
 * Handles an deactivation of a user.
 * @param {User} user - User to active
 */
  const onDeactiveUser = (user: User) => {
    void Swal.fire({
      title: '¿Estas seguro de desactivar este usuario?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deactiveUserMutation.mutate({
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          status: 'inactive',
          role: user.role._id
        })
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
    showAddModal,
    showEditModal,
    loadingInvitation: inviteUserMutation.isLoading,

    /* Function States */
    setShowAddModal,
    setShowEditModal,

    /* Functions */
    onSearchUser,
    handleChangePage,
    onSelectUser,
    onInviteUser,
    onEditUser,
    onActiveUser,
    onDeactiveUser
  }
}

export default useUsers
