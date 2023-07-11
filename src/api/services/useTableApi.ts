import { isAxiosError } from 'axios'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type TableType, type FiltersType } from 'pages/restaurant/interfaces/Tables'

const useTableApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  /**
   * Get all tables from the API with filters
   * @param {Filters} filters
   */
  const getAllTables = async (filters: FiltersType) => {
    try {
      const { search, room, status, limit, page } = filters
      const response = await axiosConfig.get(
        `${API_URL}/table/subsidiary/${subsidiary}/list`,
        {
          params: { search, room, status, limit, page },
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Get table by id from the API
   * @param {string} id
   */
  const getTableById = async (id: string) => {
    try {
      const response = await axiosConfig.get(`${API_URL}/table/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Create a new table
   * @param {TableType} table
   */
  const createTable = async (table: TableType) => {
    const { _id, room, ...tableData } = table
    try {
      const response = await axiosConfig.post(
        `${API_URL}/table`,
        { ...tableData, room: room?._id, subsidiary, organization },
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
   * Update a table
   * @param {TableType} table
   */
  const updateTable = async (table: TableType) => {
    const { _id, room, ...tableData } = table
    try {
      const response = await axiosConfig.put(
        `${API_URL}/table/${_id ?? ''}`,
        { ...tableData, room: room?._id, subsidiary, organization },
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
   * Delete a table
   * @param {string} id
   */
  const deleteTable = async (id: string) => {
    try {
      const response = await axiosConfig.delete(`${API_URL}/table/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    getAllTables,
    getTableById,
    createTable,
    updateTable,
    deleteTable
  }
}

export default useTableApi
