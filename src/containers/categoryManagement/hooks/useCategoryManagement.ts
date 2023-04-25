import type React from 'react'
import Swal from 'sweetalert2'

import { type Category } from 'pages/categories/interfaces/Category'

const useCategoryManagement = () => {
  /**
 * Handles a creation of a category.
 * @param {Category} category - Category to create
 * @param {Function} setShow - Function to close modal
 */
  const onAddCategory = (category: Category, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      void Swal.fire({
        title: '¡Creado!',
        text: 'Su categoría ha sido creada correctamente',
        icon: 'success'
      })
      console.log(category)
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
   * Handles a edition of a category.
   * @param {Category} category - Category to edit
   * @param {Function} setShow - Function to close modal
   */
  const onEditCategory = (category: Category, setShow: React.Dispatch<React.SetStateAction<boolean>>) => {
    void Swal.fire({
      title: '¿Estas seguro de editar esta categoría?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      preConfirm: () => {
        try {
          console.log(category)
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
          text: 'Su categoría ha sido editada correctamente',
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

    /* State Functions */

    /* Functions */
    onAddCategory,
    onEditCategory
  }
}

export default useCategoryManagement
