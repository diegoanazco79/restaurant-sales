import { Box, IconButton, Typography } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  tableName: string
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const TableHeader = ({ tableName, handleOpen }: Props) => {
  return (
    <Box display='flex' alignItems='center' justifyContent='space-between'>
      <Typography variant='h6'>{tableName}</Typography>
      <IconButton onClick={handleOpen} sx={{ p: 0 }} >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default TableHeader
