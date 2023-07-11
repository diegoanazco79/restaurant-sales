import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useRoomApi from 'api/services/useRoomApi'
import useTableApi from 'api/services/useTableApi'

import { initialOrdersAppliedFilters, initialOrdersFilters, initialTable } from '../helpers/constants'
import { type AppliedFiltersType, type FiltersType, type TableType } from '../interfaces/Tables'
import { initialFilters as roomFilters } from 'pages/rooms/helpers/constants'

const useRestaurant = () => {
  const [currentTable, setCurrentTable] = useState<TableType>(initialTable)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [showFiltersModal, setShowFiltersModal] = useState(false)

  const [filters, setFilters] = useState<FiltersType>(initialOrdersFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType>(initialOrdersAppliedFilters)

  const [tableOrder, setTableOrder] = useState<TableType>(initialTable)

  const { createTable, getAllTables, deleteTable, updateTable } = useTableApi()
  const { getAllRooms } = useRoomApi()

  const {
    data: tablesList,
    isLoading: loadingTables,
    refetch: refetchTables,
    isRefetching: isRefetchingTables
  } = useQuery({
    queryKey: ['tables', filters],
    queryFn: async () => await getAllTables(filters)
  })

  const {
    data: roomsList,
    isLoading: loadingRooms,
    refetch: refetchRooms,
    isRefetching: isRefetchingRooms
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => await getAllRooms(roomFilters)
  })

  const createMutation = useMutation({
    mutationFn: async (formValues: TableType) =>
      await createTable(formValues),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Mesa creada!',
        text: 'La mesa ha sido creada correctamente',
        icon: 'success'
      }).then(async () => {
        await refetchTables()
        await refetchRooms()
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
    mutationFn: async (formValues: TableType) =>
      await updateTable(formValues)
  })

  const deleteMutation = useMutation({
    mutationFn: async (idTable: string) => await deleteTable(idTable)
  })

  /**
 * Handles a search input box in tables list.
 * @param {string} search
 */
  const onSearchTable = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
 * Handles when user filter tables by status
 * @param {string} status - string - this is the status that is passed in from the filter component
 */
  const onFilterByStatus = (status: string) => {
    setFilters({ ...filters, status })
    setAppliedFilters({ ...appliedFilters, status: true })
  }

  /**
 * Handles when user filter tables by room
 * @param {string} status - string - this is the room that is passed in from the filter component
 */
  const onFilterByRoom = (room: string) => {
    setFilters({ ...filters, room })
    setAppliedFilters({ ...appliedFilters, room: true })
  }

  /**
 * Handles when user detele status filter
 */
  const onDeleteStatusFilter = () => {
    setFilters({ ...filters, status: '' })
    setAppliedFilters({ ...appliedFilters, status: false })
  }

  /**
 * Handles when user delete room filter
 */
  const onDeleteRoomFilter = () => {
    setFilters({ ...filters, room: '' })
    setAppliedFilters({ ...appliedFilters, room: false })
  }

  /**
   * Handles when user want to add a table
   * @param {TableType} newTable - New table name
   */
  const onAddTable = async (newTable: TableType) => {
    await Swal.fire({
      title: '¿Estas seguro de añadir esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        createMutation.mutate(newTable)
        setShowAddModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * Handles when user want to edit a rable
   * @param {TableType} newTable
   */
  const onEditTable = async (newTable: TableType) => {
    void Swal.fire({
      title: '¿Estas seguro de editar esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true,
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await updateMutation.mutateAsync(newTable)
          return { isConfirmed: true }
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
        }).then(async () => {
          await refetchTables()
          await refetchRooms()
        })
        setShowEditModal(false)
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
   * Handles when user want to block a table
   * @param {TableType} newTable - Modified table
   */
  const onBlockTable = (newTable: TableType) => {
    void Swal.fire({
      title: '¿Estas seguro de bloquear esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, bloquear',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await updateMutation.mutateAsync({ ...newTable, status: 'blocked' })
          return { isConfirmed: true }
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
        }).then(async () => await refetchTables())
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
   * Handles when user want to unlock a table
   * @param {TableType} newTable - Modified table
   */
  const onUnlockTable = (newTable: TableType) => {
    void Swal.fire({
      title: '¿Estas seguro de desbloquear esta mesa?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, desbloquear',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await updateMutation.mutateAsync({ ...newTable, status: 'empty' })
          return { isConfirmed: true }
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
        }).then(async () => await refetchTables())
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
   * Handles when user want to delete a table
   * @param idTable - Id table
   */
  const onDeleteTable = (idTable: TableType['_id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta mesa?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(idTable ?? '')
          return { isConfirmed: true }
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
        }).then(async () => await refetchTables())
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /** Handles selection a table for edit */
  const onSelectTable = (table: TableType) => {
    setCurrentTable(table)
    setShowEditModal(true)
  }

  return {
    /* States */
    currentTable,
    tablesList,
    loadingTables,
    filters,
    appliedFilters,
    showEditModal,
    showFiltersModal,
    tableOrder,
    showAddModal,
    roomsList,
    loadingRooms,
    isRefetchingTables,
    isRefetchingRooms,

    /* Function States */
    setShowEditModal,
    setShowAddModal,
    setShowFiltersModal,
    setTableOrder,

    /* Functions */
    onSearchTable,
    onDeleteTable,
    onEditTable,
    onAddTable,
    onBlockTable,
    onUnlockTable,
    onFilterByStatus,
    onFilterByRoom,
    onDeleteStatusFilter,
    onDeleteRoomFilter,
    onSelectTable
  }
}

export default useRestaurant
