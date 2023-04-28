import { type LabelDisplayedRowsArgs } from '@mui/material'

/**
 * Return a label for displayed rows in users table.
 * @param {LabelDisplayedRowsArgs}
 */
export const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  return `${from}-${to} de ${count} usuarios`
}
