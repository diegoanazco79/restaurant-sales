import { Grid, IconButton, Typography, useTheme } from '@mui/material'

import Counter from './Counter'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { useState } from 'react'

interface Props {
  id: string
  name: string
  price: number
}

const Item = ({ id, name, price }: Props) => {
  const theme = useTheme()

  const [counter, setCounter] = useState(1)

  return (
    <Grid
      container
      direction='row'
      alignItems='center'
      minHeight={40}
      paddingBottom={1}
      marginY={2}
      sx={{ borderBottom: `1px solid ${theme.palette.grey[300]}` }}
    >
      <Grid item xs={1} sm={1} md={1}>
        <IconButton sx={{ padding: '2px' }} >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
      <Grid item xs={5} sm={6} md={6}>
        <Typography variant='body2'> {name} </Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <Counter
          counter={counter}
          setCounter={setCounter}
          price={price}
        />
      </Grid>
      <Grid item xs={3} sm={2} md={2}>
        <Typography variant='body2'>
          S/ {price * counter}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Item
