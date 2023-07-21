import { isAxiosError } from 'axios'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type UpdateRestaurantOrder, type CreateRestaurantOrder } from 'api/interfaces/OrderApi'

const useOrderApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  /**
   * Get order by id from the API
   * @param {string} id
   */
  const getOrderById = async (id: string) => {
    try {
      const response = await axiosConfig.get(`${API_URL}/order/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Create a new order
   * @param {Order} order
   */
  const createOrder = async (order: CreateRestaurantOrder) => {
    try {
      const response = await axiosConfig.post(
        `${API_URL}/order`,
        { ...order, subsidiary, organization },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      )
      return response.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error('An error occurred during the invitation process.')
    }
  }

  /**
   * Update an order
   * @param {Order} order
   */
  const updateOrder = async (order: UpdateRestaurantOrder) => {
    const orderId: string = order.id ?? ''
    try {
      const response = await axiosConfig.put(
        `${API_URL}/order/${orderId}`,
        { ...order, subsidiary, organization },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      )
      return response.data
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response) {
          const serializedErrors = JSON.stringify(error.response.data.errors)
          throw new Error(serializedErrors)
        }
      }
      throw new Error('An error occurred during the invitation process.')
    }
  }

  /**
   * Delete an order
   * @param {string} orderId
   */
  const deleteOrder = async (orderId: string) => {
    try {
      const response = await axiosConfig.delete(`${API_URL}/order/${orderId}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
  }
}

export default useOrderApi
