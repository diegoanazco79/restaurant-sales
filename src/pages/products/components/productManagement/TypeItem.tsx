import { Grid, IconButton, Typography, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import { type ProductType } from 'pages/products/interfaces/Products'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

interface Props {
  idx: number
  type: ProductType
  onDeleteProductType: (iProduct: number) => void
  onEditType: (type: ProductType) => void
}

const TypeItem = ({
  idx, type,
  onDeleteProductType, onEditType
}: Props) => {
  const theme = useTheme()

  return (
    <Grid
      container ml={pxToRem(2)} spacing={1} mt={0}
      sx={{ border: `${pxToRem(1)} solid ${theme.palette.grey[400]}`, borderTopColor: 'transparent' }}
    >
      <Grid item xs={4} sm={4} md={5} pl={pxToRem(8)} py={1}>
        <Typography variant='body2'>
          {type.name}
        </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2} pl={pxToRem(8)} py={1}>
        <Typography variant='body2'>
        S/ {type.price}
        </Typography>
      </Grid>
      <Grid item xs={2} sm={2} md={2} pl={pxToRem(8)} py={1}>
        {type?.stockQuantity
          ? (
            <Typography variant='body2'>
              {type.stockQuantity}
            </Typography>
          )
          : <Typography variant='body2'> Sin stock</Typography>}
      </Grid>
      <Grid item xs={4} sm={4} md={3} textAlign='center' py={1}>
        <IconButton
          sx={{ p: 0, mr: 3 }} color='success'
          onClick={() => { onEditType(type) }}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          color='error' sx={{ p: 0 }}
          onClick={() => { onDeleteProductType(idx) }}
        >
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default TypeItem
