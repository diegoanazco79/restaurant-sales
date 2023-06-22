import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material'

import Counter from './Counter'

import { type Order } from 'containers/orderManagement/interfaces/Order'
import { type ProductType } from 'pages/products/interfaces/Products'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
interface Props {
  id: string
  name: string
  price: number
  amount: number
  note: string | undefined
  type: ProductType | undefined
  isMobileOrTablet: boolean
  setCurrentOrder: (order: Order) => void
  setShowNoteModal: (value: boolean) => void
  onDeleteOrder: (id: string, orderType: ProductType['_id']) => void
  handleIncrement: (id: string, type: ProductType['_id']) => void
  handleDecrement: (id: string, type: ProductType['_id']) => void
}

const OrderItem = ({
  id, name, price, amount, note, type, isMobileOrTablet,
  setShowNoteModal, setCurrentOrder,
  onDeleteOrder, handleIncrement, handleDecrement
}: Props) => {
  const theme = useTheme()
  const currentType = type ?? { _id: '', name: '', price: 0 }

  const onAddNote = () => {
    const order = { id, name, price, amount, note, type: currentType }
    setShowNoteModal(true)
    setCurrentOrder(order)
  }

  return (
    <Grid
      id={`order-${id}`}
      container direction="row" alignItems="center"
      minHeight={40}
      pb={1} my={2}
      sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}
    >
      <Grid item xs={1} sm={1} md={1}>
        <IconButton
          sx={{ padding: '2px' }}
          onClick={() => {
            onDeleteOrder(id, currentType?._id)
          }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid
        item xs={8} sm={8} md={6}
        pl={isMobileOrTablet ? 1 : 0}
        sx={{
          ...(isMobileOrTablet && {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
          })
        }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="body2" fontWeight={600}> {name} </Typography>
          {type && (
            <Typography variant="caption">Tipo: {type?.name}</Typography>
          )}
          {note && (
            <Typography variant="caption">Nota: {note}</Typography>
          )}
        </Box>
        {isMobileOrTablet && (
          <Counter
            id={id}
            amount={amount}
            type={currentType}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        )}
      </Grid>
      {!isMobileOrTablet && (
        <Grid item xs={3} sm={3} md={2}>
          <Counter
            id={id}
            amount={amount}
            type={currentType}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </Grid>
      )}
      <Grid
        item xs={3} sm={3} md={3}
        display="flex" justifyContent="flex-end" alignItems="center"
      >
        <Typography variant="body2" mr={1}>
          S/ {(price * amount).toFixed(2)}
        </Typography>
        <IconButton
          sx={{ padding: '2px' }}
          onClick={() => { onAddNote() }}
        >
          <DescriptionOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default OrderItem
