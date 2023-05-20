import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import useUsersApi from 'api/services/useUsersApi'

const useForgotPassword = () => {
  const [validEmail, setValidEmail] = useState(false)

  const { forgotPassword } = useUsersApi()

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => await forgotPassword(email),
    onSuccess: () => {
      setValidEmail(true)
    },
    onError: () => {
      setValidEmail(false)
    }
  })

  return {
    /* States */
    validEmail,
    loadingForgotPassword: forgotPasswordMutation.isLoading,
    errorForgotPassword: forgotPasswordMutation.isError,

    /* Functions */
    onForgotPassword: forgotPasswordMutation.mutate
  }
}

export default useForgotPassword
