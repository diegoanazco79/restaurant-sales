import {
  Box,
  Pagination, Typography,
  Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow
} from '@mui/material'

import ClientRow from './ClientRow'

import { clientsRows } from '../helpers/constants'
import { type Client } from '../interfaces/Clients'

interface Props {
  clients: Client[]
  currentPage: number
  totalPages: number
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  handleChangePage: (event: unknown, newPage: number) => void
  onSelectClient: (client: Client) => void
  onDeleteClient: (clientId: Client['_id']) => void
}

const ClientsTable = ({
  clients, currentPage, totalPages,
  setShowEditModal,
  handleChangePage, onSelectClient, onDeleteClient
}: Props) => {
  const clientRowProps = {
    setShowEditModal,
    onSelectClient,
    onDeleteClient
  }

  return (
    <>
      {clients?.length > 0
        ? (
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
                  {clients.map((client, idx) => (
                    <ClientRow
                      key={idx}
                      client={client}
                      {...clientRowProps}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {totalPages > 1 && (
              <Pagination
                sx={{ display: 'flex', justifyContent: 'center', py: '1rem' }}
                onChange={handleChangePage}
                page={currentPage}
                count={totalPages}
                variant="outlined"
                color="primary"
              />
            )}
          </Paper>
        )
        : (
          <Box display='flex' mt={5} justifyContent='center' width='100%'>
            <Typography variant="h5" align="center">
              No hay clientes que coincidan con tu búsqueda
            </Typography>
          </Box>
        )}
    </>
  )
}

export default ClientsTable
