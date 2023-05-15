/**
 * The function handles a role label in users table
 * @param {string} role
 */
export const getLabelRole = (role: string) => {
  switch (role) {
    case 'admin':
      return 'Admin'
    case 'sales':
      return 'Ventas'
    default:
      return ''
  }
}
