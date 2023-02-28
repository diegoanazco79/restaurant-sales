import { CardHeader, IconButton, Typography } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  orderName: string
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const OrderHeader = ({ orderName, handleOpen }: Props) => {
  return (
    <CardHeader
      title={<Typography variant='h6'>{orderName}</Typography>}
      action={
        <IconButton onClick={handleOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default OrderHeader
