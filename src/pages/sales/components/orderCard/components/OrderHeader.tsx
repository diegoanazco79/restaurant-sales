import { CardHeader, IconButton, Typography } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const OrderHeader = ({ handleOpen }: Props) => {
  return (
    <CardHeader
      title={<Typography variant='h6'>Mesa</Typography>}
      action={
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default OrderHeader
