import {
  Button, Grid, IconButton, InputAdornment, TextField, Typography
} from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import { type Product } from 'pages/products/interfaces/Products'
import CloseIcon from '@mui/icons-material/Close'

interface Props {
  product?: Product
}

const TypesList = ({ product }: Props) => {
  return (
    <>
      <Typography
        variant="body2"
        fontWeight={600}
        mb={`${pxToRem(4)} !important`}
      >
        Tipos
      </Typography>
      {product?.types.map((type, idx) => (
        <Grid container key={idx} mt="0 !important">
          <Grid item xs={9}>
            <TextField value={type.name} fullWidth />
          </Grid>
          <Grid item xs={2}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">S/</InputAdornment>
                )
              }}
              type="number"
              value={type.price.toFixed(2)}
              fullWidth
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button variant="text" sx={{ width: 'fit-content', mt: '0 !important' }}>
        + Añadir tipo
      </Button>
    </>
  )
}

export default TypesList
