/**
 * Handles a format for phone number.
 * @param {string} phoneNumber
 */
export const prettyPhoneNumber = (phoneNumber: string) => {
  const formattedNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  return formattedNumber || '-'
}
