import React from 'react'
import { Box, Typography } from '@mui/material'

import ClientCard from './styled/ClientCard'

import AddIcon from '@mui/icons-material/Add'

interface Props {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const EmptyData = ({ setShowAddModal }: Props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={5}
      width="100%"
    >
      <ClientCard
        display="flex" flexDirection="column" alignItems="center" justifyContent="center"
        width='fit-content'
        onClick={() => { setShowAddModal(true) }}
      >
        <AddIcon sx={{ height: 115, width: 115, opacity: '0.3' }} />
        <Typography variant="body1" align="center">
          Añadir nuevo cliente
        </Typography>
      </ClientCard>
    </Box>
  )
}

export default EmptyData
