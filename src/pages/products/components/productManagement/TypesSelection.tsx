import { Button, ButtonGroup, Typography, useTheme } from '@mui/material'

import { buttonGroupStyles } from 'pages/products/helpers/functions'
import { pxToRem } from 'theme/helpers/functions'

interface Props {
  hasTypes: boolean
  setHasTypes: React.Dispatch<React.SetStateAction<boolean>>
}

const TypesSelection = ({ hasTypes, setHasTypes }: Props) => {
  const theme = useTheme()

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
          onClick={() => { setHasTypes(false) }}
          sx={buttonGroupStyles(theme, hasTypes)}
        >
          No
        </Button>
        <Button
          onClick={() => { setHasTypes(true) }}
          sx={buttonGroupStyles(theme, !hasTypes)}
        >
          Si
        </Button>
      </ButtonGroup>
    </>
  )
}

export default TypesSelection
