import { Button, ButtonGroup, Typography, useTheme } from '@mui/material'

import { buttonGroupStyles } from 'pages/products/helpers/functions'
import { pxToRem } from 'theme/helpers/functions'

interface Props {
  hasStock: boolean
  setHasStock: React.Dispatch<React.SetStateAction<boolean>>
}

const StockSelection = ({ hasStock, setHasStock }: Props) => {
  const theme = useTheme()

  return (
    <>
      <Typography
        variant="body2"
        fontWeight={600}
        mb={`${pxToRem(4)} !important`}
      >
        ¿Este producto tiene stock?
      </Typography>
      <ButtonGroup variant="contained">
        <Button
          onClick={() => { setHasStock(false) }}
          sx={buttonGroupStyles(theme, hasStock)}
        >
          No
        </Button>
        <Button
          onClick={() => { setHasStock(true) }}
          sx={buttonGroupStyles(theme, !hasStock)}
        >
          Si
        </Button>
      </ButtonGroup>
    </>
  )
}

export default StockSelection
