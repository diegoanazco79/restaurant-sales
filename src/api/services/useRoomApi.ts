import { isAxiosError } from 'axios'

import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type Filters } from 'pages/rooms/interfaces/Room'
import axiosConfig from 'api/config'

const useRoomApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  /* List all rooms with filters */
  const getAllRooms = async (filters: Filters) => {
    try {
      const { search } = filters
      const response = await axiosConfig.get(
        `${API_URL}/room/subsidiary/${subsidiary}`,
        {
          params: { search },
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /* Create a new room */
  const createRoom = async (name: string) => {
    try {
      const response = await axiosConfig.post(
        `${API_URL}/room`,
        { name, subsidiary, organization },
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

  /* Update a room */
  const updateRoom = async (roomId: string, name: string) => {
    try {
      const response = await axiosConfig.put(
        `${API_URL}/room/${roomId}`,
        { _id: roomId, name, subsidiary, organization },
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

  /* Delete a room */
  const deleteRoom = async (roomId: string) => {
    try {
      const response = await axiosConfig.delete(
        `${API_URL}/room/${roomId}`,
        { headers: { Authorization: `Bearer ${currentToken}` } }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    getAllRooms,
    createRoom,
    updateRoom,
    deleteRoom
  }
}

export default useRoomApi
