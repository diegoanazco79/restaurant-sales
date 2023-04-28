import { Container } from '@mui/material'

import ClientsTable from './components/ClientsTable'
import Filters from './components/Filters'
import TitlePage from 'components/titlePage'

import useClients from './hooks/useClients'

const ClientsPage = () => {
  const {
    clientList, currentPage, rowsPerPage, currentClient,
    onSearchClient, handleChangePage, handleChangeRowsPerPage,
    onSelectClient, onDeleteClient
  } = useClients()

  /* Component's Props */
  const filtersProps = {
    onSearchClient
  }

  const clientsTableProps = {
    clients: clientList,
    currentClient,
    currentPage,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
    onSelectClient,
    onDeleteClient
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%', pb: 5 }}>
      <TitlePage title="Gestión de Clientes"/>
      <Filters {...filtersProps} />
      <ClientsTable {...clientsTableProps} />
    </Container>
  )
}

export default ClientsPage
