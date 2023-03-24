import { type OrderType } from '../interfaces/Orders'

/**
 * Return a label for roomtype
 * @param roomType - OrderType['type']
 * @returns A function that returns a string.
 */
export const getRoomTypeLabel = (roomType: OrderType['type']) => {
  switch (roomType) {
    case 'restaurant':
      return 'Restaurante'
    case 'delivery':
      return 'Delivery'
  }
}
