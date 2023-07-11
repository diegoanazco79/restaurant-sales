import { Typography } from '@mui/material'

import { StyledTableBox } from './styled/StyledTableBox'

import AddIcon from '@mui/icons-material/Add'

interface Props {
  isEmpty: boolean
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewTable = ({ isEmpty, setShowAddModal }: Props) => {
  return (
    <StyledTableBox
      status="empty"
      display="flex" flexDirection="column" alignItems="center" justifyContent="center"
      width={isEmpty ? 'fit-content' : '100%'}
      onClick={() => { setShowAddModal(true) }}
    >
      <AddIcon sx={{ height: 115, width: 115, opacity: '0.3' }} />
      <Typography variant="body1" align="center">
        Añadir nueva mesa
      </Typography>
    </StyledTableBox>
  )
}

export default NewTable
