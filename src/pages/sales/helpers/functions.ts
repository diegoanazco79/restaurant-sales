import { type RoomType } from '../interfaces/Orders'
import { BLOCKED, EMPTY, IN_PROGRESS } from './constants'

/**
 * Return a label for roomtype
 * @param roomType - RoomType['type']
 * @returns A function that returns a string.
 */
export const getRoomTypeLabel = (roomType: RoomType['type']) => {
  switch (roomType) {
    case 'restaurant':
      return 'Restaurante'
    case 'delivery':
      return 'Delivery'
  }
}

/**
 * Return a label for order status
 * @param status - status id
 * @returns A function that returns a string.
 */
export const getOrderStatusLabel = (status: string) => {
  switch (status) {
    case EMPTY:
      return 'Vacía'
    case IN_PROGRESS:
      return 'En progreso'
    case BLOCKED:
      return 'Bloqueada'
    default:
      return ''
  }
}
