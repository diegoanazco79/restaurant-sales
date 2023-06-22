import { type Product, type CategoryProductType } from '../interfaces/Products'

/**
 * Return a price for specific product
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
 * Return a label for price in product
 * @param {Product} product
 */
export const getProductPriceLabel = (product: Product) => {
  if (product.price) {
    return `S/ ${product.price.toFixed(2)}`
  } else if (product.types.length > 0) {
    const minPrice = Math.min(...product.types.map((type) => type.price))
    return `Desde S/ ${minPrice.toFixed(2)}`
  } else {
    return ''
  }
}

/**
 * Format a category item for the Select component.
 * @param {CategoryProductType | null} category - Category item.
 */
export const formatCategoryToSelect = (category: CategoryProductType | null) => {
  if (!category) return null
  else return { id: category?._id, label: category?.name }
}

export const formatCategory = (category: { id: string, label: string } | null) => {
  if (!category) return null
  else return { _id: category?.id, name: category?.label }
}

export const formatCategories = (categories: CategoryProductType[]) => (
  categories.map((category) => ({
    id: category._id,
    label: category.name
  }))
)
