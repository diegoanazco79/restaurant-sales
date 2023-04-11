import { Box, Typography } from '@mui/material'

const EmptyOrders = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      paddingBottom={5}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/8280/8280802.png"
        width={150}
        style={{ opacity: 0.5 }}
      />
      <Typography variant="body1" marginTop={2} sx={{ opacity: 0.7 }}>
        No hay ordenes aún
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.7 }}>
        Por favor selecciona un producto
      </Typography>
    </Box>
  )
}

export default EmptyOrders
