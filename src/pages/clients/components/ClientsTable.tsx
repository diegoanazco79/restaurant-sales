import { useState } from 'react'
import {
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TablePagination, TableRow
} from '@mui/material'

import ClientManagement from './ClientManagement'
import ClientRow from './ClientRow'
import Modal from 'components/modal/Modal'

import { labelDisplayedRows } from '../helpers/functions'

import { clientsRows } from '../helpers/constants'
import { type Client } from '../interfaces/Clients'

interface Props {
  clients: Client[]
  currentClient: Client
  currentPage: number
  rowsPerPage: number
  handleChangePage: (event: unknown, newPage: number) => void
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSelectClient: (client: Client) => void
  onEditClient: (client: Client, setShow: React.Dispatch<React.SetStateAction<boolean>>) => void
  onDeleteClient: (clientId: Client['id']) => void
}

const ClientsTable = ({
  clients, currentPage, rowsPerPage, currentClient,
  handleChangePage, handleChangeRowsPerPage,
  onSelectClient, onDeleteClient, onEditClient
}: Props) => {
  const [showEditModal, setShowEditModal] = useState(false)

  const clientRowProps = {
    setShowEditModal,
    onSelectClient,
    onDeleteClient
  }

  return (
    <>
      <Paper>
        <TableContainer sx={{ maxHeight: '65vh' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {clientsRows.map((row, idx) => (
                  <TableCell key={idx}>{row.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {clients
                .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
                .map((client, idx) => (
                  <ClientRow
                    key={idx}
                    client={client}
                    {...clientRowProps}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={currentPage}
          labelRowsPerPage="Clientes por página"
          labelDisplayedRows={labelDisplayedRows}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
    </>
  )
}

export default ClientsTable
