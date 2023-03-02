import { type Dispatch, type SetStateAction, useState } from 'react'
import { Popover, useTheme } from '@mui/material'

import OrderActions from './components/OrderActions'
import OrderBody from './components/OrderBody'
import OrderHeader from './components/OrderHeader'
import { StyledOrderBox } from './components/StyledOrderBox'

import { type OrderType } from 'pages/sales/interfaces/Orders'
import styles from './styles'

interface Props {
  order: OrderType
  onDeleteOrder: (setOpen: Dispatch<SetStateAction<HTMLButtonElement | null>>, idOrder: string) => void
}

const OrderCard = ({ order, onDeleteOrder }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)
  const theme = useTheme()

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(null)
  }

  /* Component's Props */
  const orderHeader = {
    orderName: order?.name,
    handleOpen
  }

  const orderBody = {
    startOrder: order?.start_order,
    clients: order?.clients,
    status: order?.status,
    totalPayment: order?.total_payment
  }

  const orderActions = {
    idOrder: order?.id,
    setOpen,
    onDeleteOrder
  }

  return (
    <>

      <StyledOrderBox
        theme={theme}
        onClick={() => { console.log('Click') }}
        status={order?.status}
      >
        <OrderHeader {...orderHeader} />
        <OrderBody {...orderBody} />
      </StyledOrderBox>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { ...styles.popoverPaper } }}
      >
        <OrderActions {...orderActions} />
      </Popover>
    </>
  )
}

export default OrderCard
