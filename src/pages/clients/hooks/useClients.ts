import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useClientApi from 'api/services/useClientApi'

import { initialClient, initialFilters } from '../helpers/constants'
import { type Client, type Filters } from '../interfaces/Clients'

const useClients = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [currentClient, setCurrentClient] = useState<Client>(initialClient)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { getAllClients, createClient, updateClient, deleteClient } = useClientApi()

  const createMutation = useMutation({
    mutationFn: async (client: Client) => await createClient(client),
    onSuccess: () => {
      setShowAddModal(false)
      void Swal.fire({
        title: '¡Cliente creado!',
        text: 'El cliente ha sido creado correctamente',
        icon: 'success'
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map((error: { msg: string }) => error.msg)
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: errorMessages.join('</br>'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (client: Client) => await updateClient(client),
    onSuccess: () => {
      setShowEditModal(false)
      void Swal.fire({
        title: '¡Cliente actualizado!',
        text: 'El cliente ha sido actualizado correctamente',
        icon: 'success'
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map((error: { msg: string }) => error.msg)
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: errorMessages.join('</br>'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (clientId: Client['_id']) => await deleteClient(clientId),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Cliente eliminado!',
        text: 'El cliente ha sido eliminado correctamente',
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
  const { data: clientList, isLoading: loadingClients } = useQuery({
    queryKey: ['clients', filters, createMutation, updateMutation, deleteMutation],
    queryFn: async () => await getAllClients(filters)
  })

  /**
 * Handles a search input box in client list.
 * @param {string} search
 */
  const onSearchClient = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
 * Handles the editing of a client.
 * @param {Client} client - Client to edit
 */
  const onSelectClient = (client: Client) => {
    setCurrentClient(client)
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
 * Handles a creation of a client.
 * @param {Client} client - Client to create
 */
  const onAddClient = (client: Client) => {
    void Swal.fire({
      title: '¿Estas seguro de crear este cliente?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        createMutation.mutate(client)
        setShowAddModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
* Handles a edition of a client.
* @param {Client} client - Client to edit
*/
  const onEditClient = (client: Client) => {
    void Swal.fire({
      title: '¿Estas seguro de editar este cliente?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        updateMutation.mutate(client)
        setShowEditModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * Handles when you want to delete a client.
   * @param {Client['id']} clientId - Cliend id to delete
   */
  const onDeleteClient = (clientId: Client['_id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este cliente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        deleteMutation.mutate(clientId)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  return {
    /* States */
    clientList: clientList?.clients ?? [],
    totalPages: clientList?.totalPages ?? 0,
    currentClient,
    currentPage,
    loadingClients,
    showAddModal,
    showEditModal,

    /* Function States */
    setShowAddModal,
    setShowEditModal,

    /* Functions */
    onSearchClient,
    onSelectClient,
    onDeleteClient,
    onAddClient,
    onEditClient,
    handleChangePage
  }
}

export default useClients
