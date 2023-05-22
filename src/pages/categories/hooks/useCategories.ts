import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import useCategoryApi from 'api/services/useCategoryApi'

import { initialCategory, initialFilters } from '../helpers/constants'
import { type Category, type Filters } from '../interfaces/Category'

const useCategories = () => {
  const [currentCategory, setCurrentCategory] =
    useState<Category>(initialCategory)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const [filters, setFilters] = useState<Filters>(initialFilters)

  const { deleteCategory, updateCategory, createCategory, getAllCategories } =
    useCategoryApi()

  const createMutation = useMutation({
    mutationFn: async (formValues: Category) =>
      await createCategory(formValues.name)
  })

  const updateMutation = useMutation({
    mutationFn: async (formValues: Category) =>
      await updateCategory(formValues._id, formValues.name)
  })

  const deleteMutation = useMutation({
    mutationFn: async (categoryId: Category['_id']) =>
      await deleteCategory(categoryId)
  })

  /* Get all categories with filters */
  const { data: categoriesList, isLoading: loadingCategories } = useQuery({
    queryKey: [
      'categories',
      filters,
      createMutation,
      updateMutation,
      deleteMutation
    ],
    queryFn: async () => await getAllCategories(filters),
    retry: 1
  })

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

  /**
   * Handles when user want to add a new category.
   * @param {Category} newCategory - Category to add
   */
  const onAddCategory = async (newCategory: Category) => {
    await Swal.fire({
      title: '¿Estas seguro de añadir esta categoría?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await createMutation.mutateAsync(newCategory)
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      if (result?.value?.isConfirmed) {
        setShowAddModal(false)
        await Swal.fire({
          title: '¡Categoría creada!',
          text: 'Su categoría ha sido creada correctamente',
          icon: 'success'
        })
      } else if (!result.isDismissed) {
        await Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /**
   * Handles when user want to edit a category.
   * @param {Category} newCategory - Category to edit
   */
  const onEditCategory = async (newCategory: Category) => {
    await Swal.fire({
      title: '¿Estas seguro de editar esta categoría?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await updateMutation.mutateAsync(newCategory)
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(async (result) => {
      setShowEditModal(false)
      if (result?.value?.isConfirmed) {
        setShowEditModal(false)
        await Swal.fire({
          title: '¡Categoría editada!',
          text: 'Su categoría ha sido editada correctamente',
          icon: 'success'
        })
      } else if (!result.isDismissed) {
        await Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    })
  }

  /**
   * Handles when user want to delete a category.
   * @param {Category['_id']} categoryId - Category id to delete
   */
  const onDeleteCategory = async (categoryId: Category['_id']) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar esta categoría?',
      html: 'Al eliminar la categoría <b> todos los productos que estén incluidos en ella se eliminarán. </b>  </br>  Esta acción no se puede deshacer.',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(categoryId)
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value?.isConfirmed) {
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

  return {
    /* States */
    categoriesList,
    currentCategory,
    loadingCategories,
    showAddModal,
    showEditModal,

    /* State Functions */
    setShowAddModal,
    setShowEditModal,

    /* Functions */
    onSearchCategory,
    onSelectCategory,
    onDeleteCategory,
    onAddCategory,
    onEditCategory
  }
}

export default useCategories
