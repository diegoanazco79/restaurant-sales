import axios from 'axios'

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
      const response = await axios.get(
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
      const response = await axios.post(
        `${API_URL}/category`,
        { name, subsidiary, organization },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Update a category
   * @param {String} categoryId
   * @param {String} name
   */
  const updateCategory = async (categoryId: string, name: string) => {
    try {
      const response = await axios.put(
        `${API_URL}/category/${categoryId}`,
        { name, subsidiary, organization },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
   * Delete a category
   * @param {String} categoryId
   */
  const deleteCategory = async (categoryId: string) => {
    try {
      const response = await axios.delete(`${API_URL}/category/${categoryId}`, {
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
