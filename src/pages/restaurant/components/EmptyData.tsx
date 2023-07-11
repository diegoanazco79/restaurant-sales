import React from 'react'
import { Box, Typography } from '@mui/material'

import NewTable from './NewTable'

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
      <Typography variant="h5" align="center" mb={2}>
        Crea tu primera categoría
      </Typography>
      <NewTable isEmpty setShowAddModal={setShowAddModal} />
    </Box>
  )
}

export default EmptyData
