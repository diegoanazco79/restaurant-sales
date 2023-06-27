import { isAxiosError } from 'axios'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'

import { type Client, type Filters } from 'pages/clients/interfaces/Clients'

const useClientApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  /**
   * Get all clients from the API with filters
   * @param {Filters} filters
   */
  const getAllClients = async (filters: Filters) => {
    try {
      const { search, page, limit } = filters
      const response = await axiosConfig.get(
        `${API_URL}/client/subsidiary/${subsidiary}`,
        {
          params: { search, page, limit },
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Create a new client
   * @param {Client} client
   */
  const createClient = async (client: Client) => {
    const { _id, ...clientData } = client
    try {
      const response = await axiosConfig.post(
        `${API_URL}/client`,
        { ...clientData, subsidiary, organization },
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
   * Update a client
   * @param {Client} client
   */
  const updateClient = async (client: Client) => {
    const { _id, ...clientData } = client
    try {
      const response = await axiosConfig.put(
        `${API_URL}/client/${_id}`,
        { ...clientData, subsidiary, organization },
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
   * Delete a client
   * @param {string} clientId
   */
  const deleteClient = async (clientId: string) => {
    try {
      const response = await axiosConfig.delete(`${API_URL}/client/${clientId}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    getAllClients,
    createClient,
    updateClient,
    deleteClient
  }
}

export default useClientApi
