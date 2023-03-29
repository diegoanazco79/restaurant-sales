import { useState } from 'react'
import {
  BottomNavigation, BottomNavigationAction, Box, ButtonGroup,
  Divider, Paper, Typography
} from '@mui/material'

import { StyledSwitchBtn } from './styled/StyledSwitchBtn'
import { StyledFilterBadge } from './styled/StyledFilterBadge'

import useResponsive from 'helpers/hooks/useResponsive'
import { getRoomTypeLabel } from '../helpers/functions'

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import StorefrontIcon from '@mui/icons-material/Storefront'
import TuneIcon from '@mui/icons-material/Tune'

import { type OrdersAppliedFiltersType, type RoomType } from '../interfaces/Orders'

interface Props {
  roomType: RoomType['type']
  orderAppliedFilters: OrdersAppliedFiltersType
  setShowFiltersModal: React.Dispatch<React.SetStateAction<boolean>>
  onChangeRoomType: (type: RoomType['type']) => void
}

const Navigation = ({
  roomType, orderAppliedFilters,
  setShowFiltersModal,
  onChangeRoomType
}: Props) => {
  const { isMobileOrTablet } = useResponsive()

  const [bottomValue, setBottomValue] = useState(0)

  const filtersLength = Object.values(orderAppliedFilters).filter(val => val === true).length

  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom={1}>
        <Typography variant="h4">{getRoomTypeLabel(roomType)}</Typography>
        {!isMobileOrTablet && (
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
        {isMobileOrTablet && (
          <>
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

            <StyledFilterBadge
              color="secondary"
              badgeContent={filtersLength}
              onClick={() => { setShowFiltersModal(true) }}
            >
              <TuneIcon sx={{ marginRight: 1 }}/>
              <Typography variant='body2'>Filtros</Typography>
            </StyledFilterBadge>
          </>
        )}
      </Box>
      <Divider sx={{ marginBottom: 2 }} />
    </>
  )
}

export default Navigation
