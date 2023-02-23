import { useState } from 'react'
import { type LoginFormValues } from '../interfaces/loginTypes'
import { type Organization } from '../interfaces/organizationTypes'
import { useAuthStore } from 'store/auth'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const setOrganization = useAuthStore((state) => state.setOrganization)
  const setToken = useAuthStore((state) => state.setToken)
  const setProfile = useAuthStore((state) => state.setProfile)
  const setRoles = useAuthStore((state) => state.setRoles)

  const navigate = useNavigate()

  /**
 * Handles the validacy that there is an organization or not an organization
 * @param {string} organizationName - string - the name of the organization
 */
  const onCheckOrganization = (organizationName: string) => {
    setCurrentOrganization({
      id: `id_${organizationName}`,
      name: organizationName,
      logo: 'https://i.imgur.com/hwMF35t.png'
    })
  }

  /**
 * Handles a login form for specific organization
 * @param {LoginFormValues} values - The values of the form.
 */
  const onSubmitLogin = (values: LoginFormValues) => {
    setOrganization({
      id: currentOrganization?.id,
      name: currentOrganization?.name,
      logo: currentOrganization?.logo
    })
    setToken('token_123123123')
    setProfile({
      email: 'danazcob@gmail.com',
      name: 'Diego Añazco',
      username: 'danazcob'
    })
    setRoles([{ id: 'id_admin', name: 'Admin' }])
    navigate('/dashboard')
  }

  /* Handles a hide/unhide password button */
  const handleClickShowPassword = () => {
    setShowPassword(prev => !prev)
  }

  /**
  * It prevents the default behavior of the button from happening.
  * @param event - MouseEvent<HTMLButtonElement>
  */
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  /**
  * Handles a back button for input a organization
  */
  const onBackToOrganization = () => {
    setCurrentOrganization(null)
  }

  return {
    /* A comment. */
    /* States */
    currentOrganization,
    showPassword,

    /* Function States */

    /* Functions */
    onCheckOrganization,
    onSubmitLogin,
    handleClickShowPassword,
    handleMouseDownPassword,
    onBackToOrganization
  }
}

export default useLogin
