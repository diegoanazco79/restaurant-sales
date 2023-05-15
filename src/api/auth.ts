import axios from 'axios'

const API_URL = 'http://localhost:8080'

/**
 * Check if a given organization name is available.
 * @param {string} name
 */
const checkOrganizationStatus = async (name: string) => {
  const response = await axios.get(`${API_URL}/organization/${name}/check`)
  return response.data
}

/**
 * Handles a login request to the API.
 * @param {string} username
 * @param {string} password
 * @param {string} subsidiary
 */
const loginApp = async (username: string, password: string, subsidiary: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password, subsidiary })
  return response.data
}

export const authService = {
  checkOrganizationStatus,
  loginApp
}
