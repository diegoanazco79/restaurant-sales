import { useState } from 'react'
import Swal from 'sweetalert2'

import { initialCategory, initialFilters } from '../helpers/constants'
import { type Category, type Filters } from '../interfaces/Category'
import { categoriesMock } from '../mock/categoriesMock'

const useCategories = () => {
  const [categoriesList] = useState<Category[]>(categoriesMock)
  const [currentCategory, setCurrentCategory] = useState<Category>(initialCategory)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  /**
   * Handles when user want to delete a category.
   * @param {Category['id']} categoryId - Category id to delete
   */
  const onDeleteCategory = (categoryId: Category['id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta categoría?',
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
          title: '¡Eliminada!',
          text: 'Su categoría ha sido eliminada correctamente',
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
 * Handles a search input box in categories list.
 * @param {string} search
 */
  const onSearchCategory = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
 * Handles the editing of a category.
 * @param {Category} category - Category to edit
 */
  const onSelectCategory = (category: Category) => {
    setCurrentCategory(category)
  }

  return {
    /* States */
    categoriesList,
    currentCategory,

    /* State Functions */

    /* Functions */
    onSearchCategory,
    onSelectCategory,
    onDeleteCategory
  }
}

export default useCategories
