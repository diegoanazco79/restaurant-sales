import { Container, LinearProgress } from '@mui/material'

import ClientManagement from './components/ClientManagement'
import ClientsTable from './components/ClientsTable'
import EmptyData from './components/EmptyData'
import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import TitlePage from 'components/titlePage'

import useClients from './hooks/useClients'

const ClientsPage = () => {
  const {
    clientList, currentPage, currentClient, totalPages, loadingClients,
    showAddModal, showEditModal, isRefetchingClients,
    setShowAddModal, setShowEditModal,
    onSearchClient, handleChangePage,
    onSelectClient, onDeleteClient, onEditClient, onAddClient
  } = useClients()

  /* Component's Props */
  const filtersProps = { setShowAddModal, onSearchClient }

  const clientsTableProps = {
    clients: clientList,
    currentPage,
    totalPages,
    setShowEditModal,
    handleChangePage,
    onSelectClient,
    onDeleteClient
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%', pb: 5 }}>
      <TitlePage title="Gestión de Clientes"/>
      {loadingClients || isRefetchingClients
        ? <LinearProgress />
        : (
          <>
            {!clientList && !loadingClients && !isRefetchingClients
              ? <EmptyData setShowAddModal={setShowAddModal} />
              : <>
                <Filters {...filtersProps} />
                <ClientsTable {...clientsTableProps} />
              </>
            }
          </>
        )
      }
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir cliente'
      >
        <ClientManagement
          actionType='create'
          setShow={setShowAddModal}
          onFinishModal={onAddClient}
        />
      </Modal>

      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar Cliente'
      >
        <ClientManagement
          actionType='edit'
          currentClient={currentClient}
          setShow={setShowEditModal}
          onFinishModal={onEditClient}
        />
      </Modal>
    </Container>
  )
}

export default ClientsPage
