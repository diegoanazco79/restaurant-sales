import { useCallback, useEffect, useState } from 'react'
import { isEmpty } from 'lodash'

import { useAuthStore } from 'store/auth'

import { menuItems } from '../helpers/menuItems'
import { type MenuElements } from '../interfaces/MenuType'

const useMenuNavigation = () => {
  const [menuElements, setMenuElements] = useState<MenuElements[]>([])
  const accountRoles = useAuthStore((state) => state.roles)

  /**
   * Function that generates the menu according to the user permissions
   */
  const showMenuElements = useCallback(() => {
    const showElements: MenuElements[] = []

    const roles = accountRoles?.map((role) => role?.id)

    menuItems?.forEach((element) => {
      const hasRoles = element?.roles?.every((role) => roles?.includes(role))
      if (isEmpty(element?.roles) || (hasRoles ?? false)) showElements.push(element)
    })

    setMenuElements(showElements)
  }, [accountRoles])

  /* Execute the callback for show menu elements */
  useEffect(() => {
    showMenuElements()
  }, [showMenuElements])

  return {
    /* States */
    menuElements

    /* Function States */

    /* Functions */
  }
}

export default useMenuNavigation
