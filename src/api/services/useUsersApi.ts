import axios from 'axios'
import { useAuthStore } from 'store/auth'

import { type Filters } from 'pages/users/interfaces/User'
import { type UpdateUser } from 'api/interfaces/UsersApi'
import { API_URL } from 'api/helpers/constants'

const useUsersApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  /**
 * Get all users from the API with filters
 * @param {String} subsidiaryId
 * @param {Filters} filters
 */
  const getAllUsers = async (subsidiaryId: string, filters: Filters) => {
    try {
      const { search, page, limit } = filters
      const response = await axios.get(`${API_URL}/subsidiary/${subsidiaryId}/users`, {
        params: { search, page, limit },
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  /**
 * Update user from the API
 * @param {UpdateUser} newUser
 */
  const updateUser = async (newUser: UpdateUser) => {
    const userId = newUser.id ?? ''
    try {
      const response = await axios.put(`${API_URL}/user/${userId}`, newUser, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getAllUsers,
    updateUser
  }
}

export default useUsersApi
