import { isAxiosError } from 'axios'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type Order } from 'api/interfaces/OrderApi'

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
  const createOrder = async (order: Order) => {
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

  return {
    getOrderById,
    createOrder
  }
}

export default useOrderApi
