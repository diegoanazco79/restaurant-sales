import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import useUsersApi from 'api/services/useUsersApi'

import { type RegisterUser } from 'api/interfaces/UsersApi'

const useRegister = () => {
  const [validRegister, setValidRegister] = useState(false)

  const { registerUser } = useUsersApi()

  /* Handles a register mutation when user confirm the password */
  const registerMutation = useMutation({
    mutationFn: async (registerForm: RegisterUser) => await registerUser(registerForm),
    onSuccess: () => {
      setValidRegister(true)
    },
    onError: () => {
      setValidRegister(false)
    }
  })

  return {
    /* States */
    validRegister,
    loadingRegister: registerMutation.isLoading,

    /* Function States */

    /* Functions */
    onRegisterUser: registerMutation.mutate
  }
}

export default useRegister
