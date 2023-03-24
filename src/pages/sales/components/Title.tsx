import { Box, ButtonGroup, Divider, Typography } from '@mui/material'

import { StyledSwitchBtn } from './StyledSwitchBtn'

import { getRoomTypeLabel } from '../helpers/functions'

import StorefrontIcon from '@mui/icons-material/Storefront'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'

import { type RoomType } from '../interfaces/Orders'

interface Props {
  roomType: string
  onChangeRoomType: (type: RoomType['type']) => void
}

const Title = ({ roomType, onChangeRoomType }: Props) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography variant="h4">{getRoomTypeLabel(roomType)}</Typography>
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
      </Box>
      <Divider />
    </>
  )
}

export default Title
