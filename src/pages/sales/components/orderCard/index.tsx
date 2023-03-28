import { type Dispatch, type SetStateAction, useState } from 'react'
import { Popover } from '@mui/material'

import { StyledOrderBox } from '../styled/StyledOrderBox'
import EditOrder from './EditOrder'
import Modal from 'components/modal/Modal'
import OrderActions from './OrderActions'
import OrderBody from './OrderBody'
import OrderHeader from './OrderHeader'

import { type OrderType } from 'pages/sales/interfaces/Orders'
import styles from './styles'

interface Props {
  order: OrderType
  onDeleteOrder: (idOrder: string) => void
  onEditOrder: (idOrder: string, orderName: string, setOpenEditModal: Dispatch<SetStateAction<boolean>>) => void
  onBlockOrder: (idOrder: string) => void
  onUnlockOrder: (idOrder: string) => void
}

const OrderCard = ({
  order, onDeleteOrder, onEditOrder, onBlockOrder,
  onUnlockOrder
}: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)
  const [openEditModal, setOpenEditModal] = useState(false)

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
    ambient: order?.ambient,
    status: order?.status,
    totalPayment: order?.total_payment
  }

  const orderActionsProps = {
    idOrder: order?.id,
    status: order?.status,
    setOpen,
    setOpenEditModal,
    onDeleteOrder,
    onBlockOrder,
    onUnlockOrder
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
        title='Editar Mesa'
        open={openEditModal}
        setOpen={setOpenEditModal}
      >
        <EditOrder {...editOrderProps} />
      </Modal>
    </>
  )
}

export default OrderCard
