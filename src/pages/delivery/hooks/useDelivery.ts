import { useState } from 'react'
import { initialDelivery } from '../helpers/constants'
import { type DeliveryOrder } from '../interfaces/DeliveryOrder'

const useDelivery = () => {
  const [deliveryOrder, setDeliveryOrder] = useState<DeliveryOrder>(initialDelivery)
  const [showOrderManagement, setShowOrderManagement] = useState(false)

  /**
 * The function sets the selected delivery order and shows the order management.
 * @param {DeliveryOrder} delivery - DeliveryOrder
 */
  const onSelectDelivery = (delivery: DeliveryOrder) => {
    setDeliveryOrder(delivery)
    setShowOrderManagement(true)
  }

  /**
 * This function sets the delivery order to its initial state and shows the order management.
 */
  const onAddNewDelivery = () => {
    setDeliveryOrder(initialDelivery)
    setShowOrderManagement(true)
  }

  /**
 * The function sets the state of "showOrderManagement" to false.
 */
  const onBackToDeliveryList = () => {
    setShowOrderManagement(false)
  }

  return {
    /* States */
    deliveryOrder,
    showOrderManagement,

    /* States Functions */

    /* Functions */
    onSelectDelivery,
    onAddNewDelivery,
    onBackToDeliveryList
  }
}

export default useDelivery
