import { useState } from 'react'
import Swal from 'sweetalert2'

import { initialClient, initialFilters } from '../helpers/constants'
import { type Client, type Filters } from '../interfaces/Clients'
import { clientsMock } from '../mock/clientMock'

const useClients = () => {
  const [clientList] = useState<Client[]>(clientsMock)
  const [currentClient, setCurrentClient] = useState<Client>(initialClient)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [filters, setFilters] = useState<Filters>(initialFilters)

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
 * Handles a change in page and updates the current page number in client table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  /**
 * Handles when user change a rows per page in users table.
 * @param event
 */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  /**
   * Handles when you want to delete a client.
   * @param {Client['id']} clientId - Cliend id to delete
   */
  const onDeleteClient = (clientId: Client['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este cliente?',
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
          text: 'Su cliente ha sido eliminado correctamente',
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
    clientList,
    currentClient,
    currentPage,
    rowsPerPage,

    /* Function States */

    /* Functions */
    onSearchClient,
    onSelectClient,
    onDeleteClient,
    handleChangePage,
    handleChangeRowsPerPage
  }
}

export default useClients
