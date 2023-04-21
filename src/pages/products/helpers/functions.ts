import { type LabelDisplayedRowsArgs } from '@mui/material'

import { type Product } from '../interfaces/Products'

/**
 * Return a label for price column in products table.
 * @param {Product} product
 */
export const getProductPrice = (product: Product): string => {
  if (product.price) {
    return `S/ ${product.price.toFixed(2)}`
  } else if (product.types.length > 0) {
    const minPrice = Math.min(...product.types.map((type) => type.price))
    return `Desde S/ ${minPrice.toFixed(2)}`
  } else {
    return 'S/ --'
  }
}

/**
 * Return a label for displayed rows in products table.
 * @param {LabelDisplayedRowsArgs}
 */
export const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  return `${from}-${to} de ${count} productos`
}
