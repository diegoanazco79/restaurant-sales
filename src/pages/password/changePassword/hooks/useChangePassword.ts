import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import useUsersApi from 'api/services/useUsersApi'

import { type ChangePassword } from 'api/interfaces/UsersApi'

const useChangePassword = () => {
  const [validForm, setValidForm] = useState(false)

  const { changePassword } = useUsersApi()

  const changePasswordMutation = useMutation({
    mutationFn: async (changeForm: ChangePassword) =>
      await changePassword(changeForm.password, changeForm.token),
    onSuccess: () => {
      setValidForm(true)
    },
    onError: () => {
      setValidForm(false)
    }
  })

  return {
    /* States */
    validForm,
    loadingChangePassword: changePasswordMutation.isLoading,
    errorChangePassword: changePasswordMutation.isError,

    /* Functions */
    onChangePassword: changePasswordMutation.mutate
  }
}

export default useChangePassword
