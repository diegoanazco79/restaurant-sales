import { type Dispatch, type SetStateAction, useState } from 'react'
import Swal from 'sweetalert2'

import { tablesMock } from '../mock/tablesMock'
import { initialOrdersAppliedFilters, initialOrdersFilters, initialTable } from '../helpers/constants'
import { type AppliedFiltersType, type FiltersType, type TableType } from '../interfaces/Tables'

const useRestaurant = () => {
  const [tables] = useState<TableType[]>(tablesMock)

  const [showFiltersModal, setShowFiltersModal] = useState(false)
  const [filters, setFilters] = useState<FiltersType>(initialOrdersFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType>(initialOrdersAppliedFilters)

  const [showEditModal, setShowEditModal] = useState(false)
  const [currentTableEdit, setCurrentTableEdit] = useState<TableType>(initialTable)

  const [tableOrder, setTableOrder] = useState<TableType>(initialTable)

  /**
 * Handles when user filter tables by status
 * @param {string} status - string - this is the status that is passed in from the filter component
 */
  const onFilterByStatus = (status: string) => {
    setFilters({ ...filters, status })
    setAppliedFilters({ ...appliedFilters, status: true })
  }

  /**
 * Handles when user filter tables by ambient
 * @param {string} status - string - this is the ambient that is passed in from the filter component
 */
  const onFilterByAmbient = (ambient: string) => {
    setFilters({ ...filters, ambient })
    setAppliedFilters({ ...appliedFilters, ambient: true })
  }

  /**
 * Handles when user detele status filter
 */
  const onDeleteStatusFilter = () => {
    setFilters({ ...filters, status: '' })
    setAppliedFilters({ ...appliedFilters, status: false })
  }

  /**
 * Handles when user delete ambient filter
 */
  const onDeleteAmbientFilter = () => {
    setFilters({ ...filters, ambient: '' })
    setAppliedFilters({ ...appliedFilters, ambient: false })
  }

  /**
   * Handles when user want to add a table
   * @param tableName - New table name
   */
  const onAddTable = (
    tableName: string,
    setShow: Dispatch<SetStateAction<boolean>>
  ) => {
    setShow(false)
    void Swal.fire({
      title: 'Su mesa ha sido añadida correctamente',
      icon: 'success'
    })
  }

  /**
   * Handles when user want to edit a rable
   * @param idTable - Id order
   * @param tableName - New table name
   */
  const onEditTable = (
    idTable: any,
    tableName: string,
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
   * Handles when user want to block a table
   * @param idTable - Id table
   */
  const onBlockTable = (idTable: string) => {
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
   * Handles when user want to unlock a table
   * @param idTable - Id table
   */
  const onUnlockTable = (idTable: string) => {
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
   * Handles when user want to delete a table
   * @param idTable - Id table
   */
  const onDeleteTable = (idTable: string) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta mesa?',
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
    tables,
    filters,
    appliedFilters,
    showEditModal,
    currentTableEdit,
    showFiltersModal,
    tableOrder,

    /* Function States */
    setShowEditModal,
    setCurrentTableEdit,
    setShowFiltersModal,
    setTableOrder,

    /* Functions */
    onDeleteTable,
    onEditTable,
    onAddTable,
    onBlockTable,
    onUnlockTable,
    onFilterByStatus,
    onFilterByAmbient,
    onDeleteStatusFilter,
    onDeleteAmbientFilter
  }
}

export default useRestaurant
