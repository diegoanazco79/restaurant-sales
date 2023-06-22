import { Button, ButtonGroup, Typography, useTheme } from '@mui/material'

import { buttonGroupStyles, pxToRem } from 'theme/helpers/functions'

interface Props {
  hasTypes: boolean
  setHasTypes: React.Dispatch<React.SetStateAction<boolean>>
  setHasStock: React.Dispatch<React.SetStateAction<boolean>>
}

const TypesSelection = ({ hasTypes, setHasTypes, setHasStock }: Props) => {
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
          onClick={() => {
            setHasTypes(false)
          }}
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
