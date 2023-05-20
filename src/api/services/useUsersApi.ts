import axios from 'axios'
import { useAuthStore } from 'store/auth'

import { API_URL } from 'api/helpers/constants'
import { type Filters } from 'pages/users/interfaces/User'
import { type InvitationUser, type RegisterUser, type UpdateUser } from 'api/interfaces/UsersApi'

const useUsersApi = () => {
  const currentToken = useAuthStore((state) => state.token)

  /**
  * Handles when admin invite a new user
  * @param {InvitationUser} newUser
  */
  const inviteUser = async (newUser: InvitationUser) => {
    try {
      const response = await axios.post(`${API_URL}/auth/invite`, newUser, {
        headers: { Authorization: `Bearer ${currentToken}` }
      })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
  * Handles when user confirm the email and password
  * @param {RegisterUser} newUser
  */
  const registerUser = async (newUser: RegisterUser) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, newUser)
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

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
      throw new Error(`Error: ${error as string}`)
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
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
 * Send a email for reset password
 * @param {String} email
 */
  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
 * Change password for user
 * @param {String} email
 */
  const changePassword = async (password: string, token: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, { password, token })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    changePassword,
    forgotPassword,
    getAllUsers,
    inviteUser,
    registerUser,
    updateUser
  }
}

export default useUsersApi
