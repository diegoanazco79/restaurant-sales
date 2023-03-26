import { type RoomType } from '../interfaces/Orders'

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
