import axios from 'axios'

import { API_URL } from 'api/helpers/constants'

const useAuthApi = () => {
  /**
 * Check if a given organization name is available.
 * @param {string} name
 */
  const checkOrganizationStatus = async (name: string) => {
    try {
      const response = await axios.get(`${API_URL}/organization/${name}/check`)
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  /**
 * Handles a login request to the API.
 * @param {string} username
 * @param {string} password
 * @param {string} subsidiary
 */
  const loginApp = async (username: string, password: string, subsidiary: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password, subsidiary })
      return response.data
    } catch (error) {
      throw new Error(`Error: ${error as string}`)
    }
  }

  return {
    checkOrganizationStatus,
    loginApp
  }
}

export default useAuthApi
