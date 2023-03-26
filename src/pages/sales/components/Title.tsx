import { useState } from 'react'
import {
  BottomNavigation, BottomNavigationAction, Box, ButtonGroup,
  Divider, Paper, Typography
} from '@mui/material'

import { StyledSwitchBtn } from './styled/StyledSwitchBtn'

import useResponsive from 'helpers/hooks/useResponsive'
import { getRoomTypeLabel } from '../helpers/functions'

import StorefrontIcon from '@mui/icons-material/Storefront'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'

import { type RoomType } from '../interfaces/Orders'

interface Props {
  roomType: RoomType['type']
  onChangeRoomType: (type: RoomType['type']) => void
}

const Title = ({ roomType, onChangeRoomType }: Props) => {
  const { isMobile } = useResponsive()

  const [bottomValue, setBottomValue] = useState(0)

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography variant="h4">{getRoomTypeLabel(roomType)}</Typography>
        {!isMobile && (
          <ButtonGroup>
            <StyledSwitchBtn
              selected={roomType === 'restaurant'}
              onClick={() => {
                onChangeRoomType('restaurant')
              }}
            >
              <StorefrontIcon />
            </StyledSwitchBtn>
            <StyledSwitchBtn
              selected={roomType === 'delivery'}
              onClick={() => {
                onChangeRoomType('delivery')
              }}
            >
              <DeliveryDiningIcon />
            </StyledSwitchBtn>
          </ButtonGroup>
        )}
        {isMobile && (
          <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }}
            elevation={3}
          >
            <BottomNavigation
              showLabels
              value={bottomValue}
              onChange={(event, newValue) => {
                setBottomValue(newValue)
              }}
            >
              <BottomNavigationAction
                onClick={() => { onChangeRoomType('restaurant') }}
                label="Restaurante"
                icon={<StorefrontIcon />}
              />
              <BottomNavigationAction
                onClick={() => { onChangeRoomType('delivery') }}
                label="Delivery"
                icon={<DeliveryDiningIcon />}
              />
            </BottomNavigation>
          </Paper>
        )}
      </Box>
      <Divider />
    </>
  )
}

export default Title
