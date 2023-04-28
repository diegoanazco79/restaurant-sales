import { type LabelDisplayedRowsArgs } from '@mui/material'

/**
 * Return a label for displayed rows in client table.
 * @param {LabelDisplayedRowsArgs}
 */
export const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  return `${from}-${to} de ${count} clientes`
}

/**
 * Handles a format for phone number.
 * @param {string} phoneNumber
 */
export const prettyPhoneNumber = (phoneNumber: string) => {
  const cleanedNumber = phoneNumber.replace('+51 ', '')
  const formattedNumber = cleanedNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')
  return formattedNumber
}
