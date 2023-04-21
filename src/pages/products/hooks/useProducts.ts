import { useState } from 'react'
import Swal from 'sweetalert2'

import { type Product } from '../interfaces/Products'

import productsMock from '../mock/productsMock'
import { initialProduct } from '../helpers/constants'

const useProducts = () => {
  const [productsList] = useState<Product[]>(productsMock)
  const [currentPage, setCurrentPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [showProductModal, setShowProductModal] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct)

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
  const onEditProduct = (product: Product) => {
    setShowProductModal(true)
    setCurrentProduct(product)
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
    showProductModal,
    currentProduct,

    /* States Functions */
    setShowProductModal,

    /* Functions */
    handleChangePage,
    handleChangeRowsPerPage,
    onEditProduct,
    onDeleteProduct
  }
}

export default useProducts
