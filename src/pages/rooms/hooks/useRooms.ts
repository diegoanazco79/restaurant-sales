import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useRoomApi from 'api/services/useRoomApi'

import { initialFilters, initialRoom } from '../helpers/constants'

import { type Room, type Filters } from '../interfaces/Room'

const useRooms = () => {
  const [currentRoom, setCurrentRoom] = useState<Room>(initialRoom)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const { deleteRoom, updateRoom, createRoom, getAllRooms } = useRoomApi()

  const createMutation = useMutation({
    mutationFn: async (formValues: Room) =>
      await createRoom(formValues.name),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Ambiente creado!',
        text: 'El ambiente ha sido creado correctamente',
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
    mutationFn: async (formValues: Room) =>
      await updateRoom(formValues._id, formValues.name),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Ambiente editado!',
        text: 'El ambiente ha sido editado correctamente',
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
    mutationFn: async (roomId: Room['_id']) => await deleteRoom(roomId),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Ambiente eliminado!',
        text: 'El ambiente ha sido eliminado correctamente',
        icon: 'success'
      })
    },
    onError: () => {
      void Swal.fire({
        title: 'Oops...',
        text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
        icon: 'error'
      })
    }
  })

  /* Get all rooms with filters */
  const { data: roomsList, isLoading: loadingRooms } = useQuery({
    queryKey: ['rooms', filters, createMutation, updateMutation, deleteMutation],
    queryFn: async () => await getAllRooms(filters)
  })

  /**
   * Handles when user want to add a new room.
   * @param {Room} newRoom - New room to add
   **/
  const onAddRoom = async (newRoom: Room) => {
    await Swal.fire({
      title: '¿Estas seguro de añadir este ambiente?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        createMutation.mutate(newRoom)
        setShowAddModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * Handles when user want to edit a room.
   * @param {Room} newRoom - New room to edit
   **/
  const onEditRoom = async (newRoom: Room) => {
    await Swal.fire({
      title: '¿Estas seguro de editar este ambiente?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        updateMutation.mutate(newRoom)
        setShowEditModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * Handles when user want to delete a room.
   * @param {Room['id']} roomId - Room id to delete
   */
  const onDeleteRoom = (roomId: Room['_id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este ambiente?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteMutation.mutate(roomId)
      },
      allowOutsideClick: () => !Swal.isLoading()
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
    loadingRooms,
    showAddModal,
    showEditModal,

    /* Function States */
    setShowAddModal,
    setShowEditModal,

    /* Functions */
    onDeleteRoom,
    onAddRoom,
    onEditRoom,
    onSearchRoom,
    onSelectRoom
  }
}

export default useRooms
