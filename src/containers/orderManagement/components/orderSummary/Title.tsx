import { Box, Typography } from '@mui/material'

import ListAltIcon from '@mui/icons-material/ListAlt'

interface Props {
  orderTitle: string
}

const Title = ({ orderTitle }: Props) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <ListAltIcon />
      <Typography variant="body1" marginLeft={1} fontWeight={600}>
        {`Platos de la ${orderTitle}`}
      </Typography>
    </Box>
  )
}

export default Title
