import { type Theme, type LabelDisplayedRowsArgs, alpha } from '@mui/material'

import { type Product, type CategoryProductType } from '../interfaces/Products'

/**
 * Return a label for price column in products table.
 * @param {Product} product
 */
export const getProductPrice = (product: Product) => {
  if (product.price) {
    return product.price.toFixed(2)
  } else if (product.types.length > 0) {
    const minPrice = Math.min(...product.types.map((type) => type.price))
    return minPrice.toFixed(2)
  } else {
    return 0
  }
}

/**
 * Return a label for displayed rows in products table.
 * @param {LabelDisplayedRowsArgs}
 */
export const labelDisplayedRows = ({ from, to, count }: LabelDisplayedRowsArgs) => {
  return `${from}-${to} de ${count} productos`
}

/* Return a buttonGroupsStyles in product management modal */
export const buttonGroupStyles = (theme: Theme, hasTypes: boolean) => ({
  backgroundColor: `${
    !hasTypes ? `${alpha(theme.palette.primary.light, 0.4)} !important` : ''
  }`
})

/**
 * Format a category item for the Select component.
 * @param {CategoryProductType | null} category - Category item.
 */
export const formatCategoryToSelect = (category: CategoryProductType | null) => {
  if (!category) return null
  else return { id: category?.id, label: category?.name }
}

export const formatCategory = (category: { id: string, label: string } | null) => {
  if (!category) return null
  else return { id: category?.id, name: category?.label }
}
