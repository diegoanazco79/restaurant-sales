import { Button, Container } from '@mui/material'

import Navigation from './components/Navigation'
import TitlePage from 'components/titlePage'

import useResponsive from 'helpers/hooks/useResponsive'

import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  roomType: string
  tableOrder?: TableType
  onBackAction: () => void
}

const OrderManagement = ({ roomType, tableOrder, onBackAction }: Props) => {
  const orderName = tableOrder?.name ?? ''

  const { isMobileOrTablet } = useResponsive()

  return (
    <Container maxWidth='xl'>
      {!isMobileOrTablet && (
        <Button variant='text' onClick={onBackAction} >
          {' < Volver a las mesas'}
        </Button>
      )}
      <TitlePage title={`Orden - ${orderName}`} />
      {isMobileOrTablet && (
        <Navigation onBackAction={onBackAction} />
      )}
    </Container>
  )
}

export default OrderManagement
