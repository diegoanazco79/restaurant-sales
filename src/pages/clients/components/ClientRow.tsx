import { IconButton, TableCell, TableRow } from '@mui/material'

import { prettyPhoneNumber } from '../helpers/functions'

import { type Client } from '../interfaces/Clients'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  client: Client
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>
  onSelectClient: (client: Client) => void
  onDeleteClient: (clientId: Client['_id']) => void
}

const ClientRow = ({ client, setShowEditModal, onSelectClient, onDeleteClient }: Props) => {
  const clientEmail = client.email !== '' ? client.email : '-'

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    onDeleteClient(client._id)
  }

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}
      onClick={() => { onSelectClient(client); setShowEditModal(true) }} >

      <TableCell>{client.name}</TableCell>
      <TableCell><b>{(client.typeDocument).toUpperCase()}</b> {client.document}</TableCell>
      <TableCell>{prettyPhoneNumber(client.phone ?? '')}</TableCell>
      <TableCell>{clientEmail}</TableCell>
      <TableCell>
        <IconButton onClick={handleDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ClientRow
