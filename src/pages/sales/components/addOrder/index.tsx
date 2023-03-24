import AddIcon from '@mui/icons-material/Add'
import { Typography } from '@mui/material'
import Modal from 'components/modal/Modal'
import { type Dispatch, type SetStateAction, useState } from 'react'

import { StyledOrderBox } from '../StyledOrderBox'
import AddOrderModal from './AddOrderModal'

interface Props {
  onAddOrder: (orderName: string, setShow: Dispatch<SetStateAction<boolean>>) => void
}

const AddOrderCard = ({ onAddOrder }: Props) => {
  const [openAddOrder, setOpenAddOrder] = useState(false)

  return (
    <>
      <StyledOrderBox
        status="empty"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        onClick={() => { setOpenAddOrder(true) }}
      >
        <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
        <Typography variant="body1"> Añadir nueva mesa </Typography>
      </StyledOrderBox>
      <Modal
        open={openAddOrder}
        setOpen={setOpenAddOrder}
      >
        <AddOrderModal setOpenAddOrder={setOpenAddOrder} onAddOrder={onAddOrder} />
      </Modal>
    </>
  )
}

export default AddOrderCard
