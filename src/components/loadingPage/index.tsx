import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'

import styles from './styles'

const LoadingPage = () => {
  return (
    <Box sx={styles.mainContainer}>
      <Card sx={styles.cardContainer}>
        <CardContent sx={styles.cardContent}>
          <Box>
            <Typography variant='h4' align='left'>
              Cargando página
            </Typography>
            <Typography variant='body2' align='left' mt={1}>
              Por favor espere un momento.
            </Typography>
          </Box>
          <Box sx={styles.loadingContainer}>
            <CircularProgress size={30} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default LoadingPage
