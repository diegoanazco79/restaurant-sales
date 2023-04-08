import { useEffect, useState } from 'react'

import { type Order } from '../interfaces/Order'

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [totalOrder, setTotalOrder] = useState(0)

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
    const orderIndex = orders.findIndex(({ id }) => id === order.id)
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
  const handleIncrement = (orderId: Order['id']) => {
    const newOrders = orders.map((order) =>
      order.id === orderId ? { ...order, amount: order.amount + 1 } : order
    )
    setOrders(newOrders)
  }

  /**
   * This function handles decrementing the amount of a specific order in an array of orders.
   * @param orderId - The `orderId` parameter is of type `Order['id']`nding order
   */
  const handleDecrement = (orderId: Order['id']) => {
    const newOrders = orders.map((order) =>
      order.id === orderId && order.amount > 1
        ? { ...order, amount: order.amount - 1 }
        : order
    )
    setOrders(newOrders.filter((order) => order.amount > 0))
  }

  /**
 * The function deletes an order from a list of orders based on its ID.
 * @param orderId - The `orderId` parameter is of type `Order['id']`
 */
  const onDeleteOrder = (orderId: Order['id']) => {
    setOrders(orders.filter(order => order.id !== orderId))
  }

  return {
    /* States */
    orders,
    totalOrder,

    /* Function States */

    /* Functions */
    onAddOrder,
    onDeleteOrder,
    handleIncrement,
    handleDecrement
  }
}
export default useOrders
