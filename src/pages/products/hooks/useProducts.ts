import { useState } from 'react'
import Swal from 'sweetalert2'

import { type ProductType, type Product, type FiltersType, type AppliedFiltersType, type CategoryProductType } from '../interfaces/Products'

import productsMock from '../mock/productsMock'
import { initialAppliedFilters, initialFilters, initialProduct } from '../helpers/constants'

const useProducts = () => {
  const [productsList] = useState<Product[]>(productsMock)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct)

  const [filters, setFilters] = useState<FiltersType>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType>(initialAppliedFilters)

  /**
 * Handles a category filter in products list.
 * @param categoryID
 */
  const onFilterByCategory = (categoryID: CategoryProductType['id']) => {
    setFilters({ ...filters, category: categoryID })
    setAppliedFilters({ ...appliedFilters, category: true })
  }

  /**
 * The function deletes the category filter in products list
 */
  const onDeleteCategoryFilter = () => {
    setFilters({ ...filters, category: '' })
    setAppliedFilters({ ...appliedFilters, category: false })
  }

  /**
 * Handles a filters in mobile view.
 * @param categoryID
 */
  const onApplyMobileFilters = (categoryId: CategoryProductType['id']) => {
    setFilters({ ...filters, category: categoryId })
    setAppliedFilters({ ...appliedFilters, category: categoryId !== '' })
  }

  /**
 * Handles a change in page and updates the current page number in products table.
 * @param {unknown} event
 * @param {number} newPage
 */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  /**
 * Handles when user change a rows per page in products table.
 * @param event
 */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setCurrentPage(0)
  }

  /**
 * Handles the editing of a product.
 * @param {Product} product - Product to edit
 */
  const onSelectProduct = (product: Product) => {
    setCurrentProduct(product)
  }

  /**
 * Handles a creation of a product.
 * @param {Product} product - Product to create
 * @param {Function} setShow - Function to close modal
 */
  const onAddProduct = (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      void Swal.fire({
        title: '¡Creado!',
        text: 'Su producto ha sido creado correctamente',
        icon: 'success'
      })
      console.log(product)
      setShow(false)
    } catch (error) {
      void Swal.fire({
        title: 'Oops...',
        text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
        icon: 'error'
      })
    }
  }

  /**
 * Handles a edition of a product.
 * @param {Product} product - Product to edit
 * @param {Function} setShow - Function to close modal
 */
  const onEditProduct = (product: Product, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    void Swal.fire({
      title: '¿Estas seguro de editar este producto?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          console.log(product)
          setShow(false)
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if ((result.value?.isConfirmed) ?? false) {
        void Swal.fire({
          title: '¡Editado!',
          text: 'Su producto ha sido editado correctamente',
          icon: 'success'
        })
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /**
 * This function updates a product type in the current product selected.
 * @param {ProductType['id']} typeId
 * @param {ProductType} newType
 */
  const onEditProductType = (typeId: ProductType['id'], newType: ProductType) => {
    const newTypes = currentProduct?.types?.map((type) => {
      if (type.id === typeId) {
        return newType
      }
      return type
    })
    setCurrentProduct({ ...currentProduct, types: newTypes })
  }

  /**
 * The function adds a new product type to the current product selected.
 * @param {ProductType} newType
 */
  const onAddProductType = (newType: ProductType) => {
    setCurrentProduct({ ...currentProduct, types: [...currentProduct?.types, newType] })
  }

  /**
   * This function displays a confirmation dialog and deletes a product type from the current product
   * if confirmed.
   * @param {number} iType - Index of the type to delete
   */
  const onDeleteProductType = (iType: number) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este tipo del producto?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          const newTypes = currentProduct?.types?.filter((type, idxType) => idxType !== iType)
          setCurrentProduct({ ...currentProduct, types: newTypes })
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if ((result.value?.isConfirmed) ?? false) {
        void Swal.fire({
          title: '¡Eliminado!',
          text: 'Su tipo del producto ha sido eliminado correctamente',
          icon: 'success'
        })
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /**
   * Handles when user want to delete a product.
   * @param {Product['id']} productId - Product id to delete
   */
  const onDeleteProduct = (productId: Product['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if ((result.value?.isConfirmed) ?? false) {
        void Swal.fire({
          title: '¡Eliminado!',
          text: 'Su producto ha sido eliminado correctamente',
          icon: 'success'
        })
      } else if (!result?.isDismissed) {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunicate con soporte',
          icon: 'error'
        })
      }
    })
  }

  return {
    /* States */
    productsList,
    currentPage,
    rowsPerPage,
    currentProduct,
    filters,
    appliedFilters,

    /* States Functions */

    /* Functions */
    handleChangePage,
    handleChangeRowsPerPage,
    onSelectProduct,
    onDeleteProduct,
    onEditProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType,
    onAddProduct,
    onFilterByCategory,
    onDeleteCategoryFilter,
    onApplyMobileFilters
  }
}

export default useProducts
