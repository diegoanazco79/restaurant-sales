import { useState } from 'react'
import { Card, Popover } from '@mui/material'

import OrderActions from './components/OrderActions'
import OrderBody from './components/OrderBody'
import OrderHeader from './components/OrderHeader'

import styles from './styles'

const OrderCard = () => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <Card>
        <OrderHeader handleOpen={handleOpen} />
        <OrderBody />
      </Card>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { ...styles.popoverPaper } }}
      >
        <OrderActions handleClose={handleClose} />
      </Popover>
    </>
  )
}

export default OrderCard
