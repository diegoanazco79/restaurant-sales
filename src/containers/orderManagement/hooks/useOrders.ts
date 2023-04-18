import { useEffect, useState } from 'react'

import { initialOrder } from '../helpers/constants'
import { type Order } from '../interfaces/Order'
import { type ProductType } from '../interfaces/Products'

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order>(initialOrder)

  useEffect(() => {
    let newTotal = 0
    for (let i = 0; i < orders.length; i++) {
      newTotal += orders[i].price * orders[i].amount
    }
    setTotalOrder(Number(newTotal.toFixed(2)))
  }, [orders])

  /**
   * Handles when user want add order to cart
   * @param {Order} order
   */
  const onAddOrder = (order: Order) => {
    const orderIndex = orders.findIndex(({ id, type }) => id === order.id && type?.id === order.type?.id)
    const newOrders = [...orders]
    if (orderIndex >= 0) {
      newOrders[orderIndex] = { ...newOrders[orderIndex], amount: newOrders[orderIndex].amount + 1 }
      const [removedOrder] = newOrders.splice(orderIndex, 1)
      newOrders.unshift(removedOrder)
    } else {
      newOrders.unshift({ ...order, amount: 1 })
    }
    setOrders(newOrders)
  }

  /**
 * This function handles incrementing the amount of a specific order in an array of orders.
 * @param orderId - The `orderId` parameter is of type `Order['id']`nding order
 */
  const handleIncrement = (orderId: Order['id'], typeId: ProductType['id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === orderId && (!order?.type || order?.type?.id === typeId)) {
        return { ...order, amount: order.amount + 1 }
      } else return order
    })
    setOrders(newOrders)
  }

  /**
 * This function handles decrementing the amount of a specific order in an array of orders.
 * @param orderId - The `orderId` parameter is of type `Order['id']`nding order
 */
  const handleDecrement = (orderId: Order['id'], typeId?: ProductType['id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === orderId && (!order?.type || order?.type?.id === typeId)) {
        return { ...order, amount: order.amount === 1 ? 1 : order.amount - 1 }
      } else return order
    })
    setOrders(newOrders)
  }

  /**
 * The function deletes an order from a list of orders based on its ID.
 * @param orderId - The `orderId` parameter is of type `Order['id']`
 * @param typeId - The `typeId` parameter is of type `ProductType['id']`
 */
  const onDeleteOrder = (orderId: Order['id'], typeId?: ProductType['id']) => {
    const newOrders = orders.filter(order => {
      if (order?.id === orderId) {
        if (!order?.type || order?.type?.id === typeId) {
          return false
        } else {
          return true
        }
      }
      return true
    })
    setOrders(newOrders)
  }

  /**
   * This function updates the note field of an order
   * @param {string} note - The `note` that represents the note to be added
   * @param [typeId] - `typeId`
   */
  const onAddNote = (note: string, typeId?: ProductType['id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === currentOrder?.id && (!order?.type || order?.type?.id === typeId)) {
        return { ...order, note }
      } else return order
    })
    setOrders(newOrders)
  }

  return {
    /* States */
    orders,
    totalOrder,
    showSummaryModal,
    currentOrder,

    /* Function States */
    setShowSummaryModal,
    setCurrentOrder,

    /* Functions */
    onAddOrder,
    onDeleteOrder,
    handleIncrement,
    handleDecrement,
    onAddNote
  }
}
export default useOrders
