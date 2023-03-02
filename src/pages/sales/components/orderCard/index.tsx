import { type Dispatch, type SetStateAction, useState } from 'react'
import { Popover, useTheme } from '@mui/material'

import { StyledOrderBox } from './components/StyledOrderBox'
import EditOrder from './components/EditOrder'
import Modal from 'components/modal/Modal'
import OrderActions from './components/OrderActions'
import OrderBody from './components/OrderBody'
import OrderHeader from './components/OrderHeader'

import { type OrderType } from 'pages/sales/interfaces/Orders'
import styles from './styles'

interface Props {
  order: OrderType
  onDeleteOrder: (idOrder: string) => void
  onEditOrder: (idOrder: string, orderName: string, setOpenEditModal: Dispatch<SetStateAction<boolean>>) => void
}

const OrderCard = ({ order, onDeleteOrder, onEditOrder }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

  const theme = useTheme()

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  /* Component's Props */
  const orderHeaderProps = {
    orderName: order?.name,
    handleOpen
  }

  const orderBodyProps = {
    startOrder: order?.start_order,
    clients: order?.clients,
    status: order?.status,
    totalPayment: order?.total_payment
  }

  const orderActionsProps = {
    idOrder: order?.id,
    setOpen,
    setOpenEditModal,
    onDeleteOrder
  }

  const editOrderProps = {
    idOrder: order?.id,
    orderName: order?.name,
    setOpenEditModal,
    onEditOrder
  }

  return (
    <>
      <StyledOrderBox
        theme={theme}
        onClick={() => { console.log('Click') }}
        status={order?.status}
      >
        <OrderHeader {...orderHeaderProps} />
        <OrderBody {...orderBodyProps} />
      </StyledOrderBox>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ sx: { ...styles.popoverPaper } }}
      >
        <OrderActions {...orderActionsProps} />
      </Popover>
      <Modal
        open={openEditModal}
        setOpen={setOpenEditModal}
      >
        <EditOrder {...editOrderProps} />
      </Modal>
    </>
  )
}

export default OrderCard
