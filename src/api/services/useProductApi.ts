import { isAxiosError } from 'axios'
import { type FiltersType } from 'pages/products/interfaces/Products'

import axiosConfig from 'api/config'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type CreateProduct } from 'api/interfaces/ProductApi'

const useProductApi = () => {
  const currentToken = useAuthStore((state) => state.token)
  const subsidiary = useAuthStore((state) => state.subsidiary)?.id ?? ''
  const organization = useAuthStore((state) => state.organization)?.id ?? ''

  const getAllProducts = async (filters: FiltersType) => {
    try {
      const { search, category, page, limit } = filters
      const response = await axiosConfig.get(
        `${API_URL}/product/${subsidiary}/list`,
        {
          params: { search, category, page, limit },
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      )
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  const createProduct = async (product: CreateProduct) => {
    try {
      const response = await axiosConfig.post(
        `${API_URL}/product`,
        { ...product, organization, subsidiary },
        {
          headers: { Authorization: `Bearer ${currentToken}` }
        }
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

  const updateProduct = async (id: string, product: CreateProduct) => {
    try {
      const response = await axiosConfig.put(
        `${API_URL}/product/${id}`,
        { ...product, organization, subsidiary },
        {
          headers: { Authorization: `Bearer ${currentToken}` }
        }
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

  const deleteProduct = async (id: string) => {
    try {
      const response = await axiosConfig.delete(`${API_URL}/product/${id}`, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    getAllProducts,
    createProduct,
    deleteProduct,
    updateProduct
  }
}

export default useProductApi
