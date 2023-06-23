import { Button, ButtonGroup, Typography, useTheme } from '@mui/material'
import { type Product } from 'pages/products/interfaces/Products'

import { buttonGroupStyles, pxToRem } from 'theme/helpers/functions'

interface Props {
  product: Product
  hasTypes: boolean
  setHasTypes: React.Dispatch<React.SetStateAction<boolean>>
  setHasStock: React.Dispatch<React.SetStateAction<boolean>>
  onDeleteAllProductsType: (setHastTypes: React.Dispatch<React.SetStateAction<boolean>>) => void
}

const TypesSelection = ({ hasTypes, product, setHasTypes, setHasStock, onDeleteAllProductsType }: Props) => {
  const theme = useTheme()

  const handleCancelTypes = () => {
    if (product.types.length > 0) {
      onDeleteAllProductsType(setHasTypes)
    } else {
      setHasTypes(false)
    }
  }

  return (
    <>
      <Typography
        variant="body2"
        fontWeight={600}
        mb={`${pxToRem(4)} !important`}
      >
        ¿Este producto tiene tipos?
      </Typography>
      <ButtonGroup variant="contained" sx={{ mb: 2, mr: 2 }}>
        <Button
          onClick={handleCancelTypes}
          sx={buttonGroupStyles(theme, !hasTypes)}
        >
          No
        </Button>
        <Button
          onClick={() => {
            setHasTypes(true)
            setHasStock(false)
          }}
          sx={buttonGroupStyles(theme, hasTypes)}
        >
          Si
        </Button>
      </ButtonGroup>
    </>
  )
}

export default TypesSelection
