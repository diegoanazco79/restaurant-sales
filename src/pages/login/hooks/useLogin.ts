import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { useAuthStore } from 'store/auth'
import { authService } from 'api/auth'

import { type LoginFormValues } from '../interfaces/loginTypes'
import { type Organization } from '../interfaces/organizationTypes'

const useLogin = () => {
  const [isValidOrganization, setIsValidOrganization] = useState(true)
  const [isValidLogin, setIsValidLogin] = useState(true)
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const setOrganization = useAuthStore((state) => state.setOrganization)
  const setToken = useAuthStore((state) => state.setToken)
  const setProfile = useAuthStore((state) => state.setProfile)
  const setRoles = useAuthStore((state) => state.setRoles)
  const setSubsidiary = useAuthStore((state) => state.setSubsidiary)

  const navigate = useNavigate()

  /**
 * Handles the validacy that there is an organization or not an organization
 */
  const { mutate: onCheckOrganization, isLoading: loadingOrganization } = useMutation({
    mutationFn: authService.checkOrganizationStatus,
    onSuccess: (data) => {
      setCurrentOrganization({
        id: data.organization._id,
        name: data.organization.name,
        fullName: data.organization.fullName,
        subsidiaries: data.subsidiaries
      })
      setIsValidOrganization(true)
    },
    onError: () => {
      setIsValidOrganization(false)
    }
  })

  /**
 * Handles the login of the user in specific organization and subsidiary
 */
  const { mutate: onSubmitLogin, isLoading: loadingLogin } = useMutation({
    mutationFn: async (loginForm: LoginFormValues) => await authService.loginApp(loginForm.username, loginForm.password, loginForm.subsidiary),
    onSuccess: (data) => {
      const { organization, token, email, username, firstName, lastName, role, subsidiary } = data
      const profileName = `${firstName as string} ${lastName as string}`
      setOrganization({
        id: organization?._id,
        name: organization?.name,
        fullName: organization?.fullName
      })
      setSubsidiary({
        id: subsidiary?._id,
        name: subsidiary?.name
      })
      setToken(token)
      setProfile({
        email,
        name: profileName,
        username
      })
      setRoles([{ id: role._id, name: role.name }])
      navigate('/restaurant')
    },
    onError: () => {
      setIsValidLogin(false)
    }
  })

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
    /* States */
    currentOrganization,
    showPassword,
    isValidOrganization,
    loadingOrganization,
    loadingLogin,
    isValidLogin,

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
