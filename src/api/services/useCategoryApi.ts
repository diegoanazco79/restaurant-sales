import { isAxiosError } from 'axios'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type Filters } from 'pages/categories/interfaces/Category'

const useCategoryApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  /**
   * Get all categories from the API with filters
   * @param {Filters} filters
   */
  const getAllCategories = async (filters: Filters) => {
    try {
      const { search } = filters
      const response = await axiosConfig.get(
        `${API_URL}/category/subsidiary/${subsidiary}`,
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

  /**
   * Create a new category
   * @param {String} name
   */
  const createCategory = async (name: string) => {
    try {
      const response = await axiosConfig.post(
        `${API_URL}/category`,
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

  /**
   * Update a category
   * @param {String} categoryId
   * @param {String} name
   */
  const updateCategory = async (categoryId: string, name: string) => {
    try {
      const response = await axiosConfig.put(
        `${API_URL}/category/${categoryId}`,
        { _id: categoryId, name, subsidiary, organization },
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
   * Delete a category
   * @param {String} categoryId
   */
  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await axiosConfig.delete(`${API_URL}/category/${categoryId}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory
  }
}

export default useCategoryApi
