import { Grid, IconButton, Typography, useTheme } from '@mui/material'

import Counter from './Counter'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

interface Props {
  id: string
  name: string
  price: number
  amount: number
  isMobileOrTablet: boolean
  onDeleteOrder: (id: string) => void
  handleIncrement: (id: string) => void
  handleDecrement: (id: string) => void
}

const OrderItem = ({
  id, name, price, amount, isMobileOrTablet,
  onDeleteOrder, handleIncrement, handleDecrement
}: Props) => {
  const theme = useTheme()

  return (
    <Grid
      id={`order-${id}`}
      container
      direction='row'
      alignItems='center'
      minHeight={40}
      paddingBottom={1}
      marginY={2}
      sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}
    >
      <Grid item xs={1} sm={1} md={1}>
        <IconButton sx={{ padding: '2px' }} onClick={() => { onDeleteOrder(id) }} >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={8}
        sm={8}
        md={6}
        pl={ isMobileOrTablet ? 1 : 0}
        sx={{ ...(isMobileOrTablet && { display: 'flex', alignItems: 'center', flexDirection: 'column' }) }}
      >
        <Typography variant='body2'> {name} </Typography>
        {isMobileOrTablet && (
          <Counter
            id={id}
            amount={amount}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        )}
      </Grid>
      {!isMobileOrTablet && (
        <Grid item xs={3} sm={3} md={3}>
          <Counter
            id={id}
            amount={amount}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        </Grid>
      )}
      <Grid item xs={3} sm={3} md={2}>
        <Typography variant='body2'>
          S/ {(price * amount).toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default OrderItem
