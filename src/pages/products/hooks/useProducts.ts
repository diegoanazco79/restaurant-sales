import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import Swal from 'sweetalert2'

import {
  type ProductType,
  type Product,
  type FiltersType,
  type AppliedFiltersType,
  type CategoryProductType
} from '../interfaces/Products'

import useProductApi from 'api/services/useProductApi'
import useCategoryApi from 'api/services/useCategoryApi'

import {
  initialAppliedFilters,
  initialFilters,
  initialProduct
} from '../helpers/constants'
import { type CreateProduct } from 'api/interfaces/ProductApi'

const useProducts = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [currentProduct, setCurrentProduct] = useState<Product>(initialProduct)

  const [filters, setFilters] = useState<FiltersType>(initialFilters)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFiltersType>(
    initialAppliedFilters
  )

  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  const { createProduct, getAllProducts, deleteProduct, updateProduct } =
    useProductApi()
  const { getAllCategories } = useCategoryApi()

  const {
    data: productsList,
    isLoading: loadingProducts,
    refetch: productRefetch,
    isRefetching: refetchingProducts
  } = useQuery({
    queryKey: ['products', filters],
    queryFn: async () => await getAllProducts(filters)
  })

  const {
    data: categoriesList,
    isLoading: loadingCategories,
    refetch: categoriesRefetch,
    isRefetching: refetchingCategories
  } = useQuery({
    queryKey: ['categories', filters],
    queryFn: async () => await getAllCategories(filters)
  })

  const createMutation = useMutation({
    mutationFn: async (formValues: CreateProduct) =>
      await createProduct(formValues),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Producto creado!',
        text: 'El producto ha sido creado correctamente',
        icon: 'success'
      }).then(async () => {
        await productRefetch()
        await categoriesRefetch()
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map(
        (error: { msg: string }) => error.msg
      )
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: errorMessages.join('</br>'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    }
  })

  const updateMutation = useMutation({
    mutationFn: async (formValues: CreateProduct) =>
      await updateProduct(formValues._id ?? '', formValues),
    onSuccess: () => {
      void Swal.fire({
        title: '¡Producto editado!',
        text: 'El producto ha sido editado correctamente',
        icon: 'success'
      }).then(async () => {
        await productRefetch()
        await categoriesRefetch()
      })
    },
    onError: (error: Error) => {
      const errorJson = JSON.parse(error.message)
      const errorMessages = errorJson.map(
        (error: { msg: string }) => error.msg
      )
      if (errorMessages.length > 0) {
        void Swal.fire({
          title: 'Oops...',
          html: errorMessages.join('</br>'),
          icon: 'error'
        })
      } else {
        void Swal.fire({
          title: 'Oops...',
          text: 'Algo salió mal, por favor vuelve a intentarlo. Si el problema persiste comunícate con soporte',
          icon: 'error'
        })
      }
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => await deleteProduct(id)
  })

  /**
   * Handles a search input box in products list.
   * @param {string} search
   */
  const onSearchProduct = (search: string) => {
    setFilters({ ...filters, search })
  }

  /**
   * Handles a category filter in products list.
   * @param categoryID
   */
  const onFilterByCategory = (categoryID: CategoryProductType['_id']) => {
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
  const onApplyMobileFilters = (categoryId: CategoryProductType['_id']) => {
    setFilters({ ...filters, category: categoryId })
    setAppliedFilters({ ...appliedFilters, category: categoryId !== '' })
  }

  /**
   * Handles a change in page and updates the current page number in users table.
   * @param {unknown} event
   * @param {number} newPage
   */
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage)
    setFilters({ ...filters, page: newPage })
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
   */
  const onAddProduct = async (product: Product) => {
    const productTypes = product.types.map((type: ProductType) => ({
      name: type.name,
      price: type.price,
      isInfinite: type.isInfinite,
      stockQuantity: type.stockQuantity
    }))
    const newProduct = {
      ...product,
      category: product.category?._id,
      types: productTypes
    }
    await Swal.fire({
      title: '¿Estas seguro de añadir este producto?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, añadir',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        createMutation.mutate(newProduct)
        setShowAddModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * Handles a edition of a product.
   * @param {Product} product - Product to edit
   * @param {Function} setShow - Function to close modal
   */
  const onEditProduct = (product: Product) => {
    const productTypes = product.types.map((type: ProductType) => ({
      name: type.name,
      price: type.price,
      isInfinite: type.isInfinite,
      stockQuantity: type.stockQuantity
    }))
    const newProduct = {
      ...product,
      category: product.category?._id,
      types: productTypes
    }
    void Swal.fire({
      title: '¿Estas seguro de editar este producto?',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        await updateMutation.mutateAsync(newProduct)
        setShowEditModal(false)
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  /**
   * This function updates a product type in the current product selected.
   * @param {ProductType['id']} typeId
   * @param {ProductType} newType
   */
  const onEditProductType = (
    typeId: ProductType['_id'],
    newType: ProductType
  ) => {
    const newTypes = currentProduct?.types?.map((type) => {
      if (type._id === typeId) {
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
    setCurrentProduct({
      ...currentProduct,
      types: [...currentProduct?.types, newType]
    })
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
          const newTypes = currentProduct?.types?.filter(
            (type, idxType) => idxType !== iType
          )
          setCurrentProduct({ ...currentProduct, types: newTypes })
          return { isConfirmed: true }
          // eslint-disable-next-line no-unreachable
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value?.isConfirmed ?? false) {
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
   * @param {string} productId - Product id to delete
   */
  const onDeleteProduct = (productId: string) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar este producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          await deleteMutation.mutateAsync(productId)
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value?.isConfirmed ?? false) {
        void Swal.fire({
          title: '¡Eliminado!',
          text: 'Su producto ha sido eliminado correctamente',
          icon: 'success'
        }).then(async () => await productRefetch())
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
   * This function displays a confirmation dialog and deletes all product types from the current product
   * if confirmed.
   * @param {React.Dispatch<React.SetStateAction<boolean>>} setHasTypes
   */
  const onDeleteAllProductsType = (
    setHasTypes: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    void Swal.fire({
      title: '¿Estas seguro de eliminar todos los tipos de este producto?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setHasTypes(false)
        setCurrentProduct({ ...currentProduct, types: [] })
        void Swal.fire({
          title: '¡Eliminado!',
          text: 'Todos los tipos de este producto han sido eliminados correctamente',
          icon: 'success'
        })
      }
    })
  }

  return {
    /* States */
    productsList: productsList?.products ?? [],
    totalPages: productsList?.totalPages ?? 0,
    currentPage,
    currentProduct,
    filters,
    appliedFilters,
    loadingProducts,
    showEditModal,
    showAddModal,
    categoriesList,
    loadingCategories,
    refetchingProducts,
    refetchingCategories,

    /* States Functions */
    setShowEditModal,
    setShowAddModal,
    setCurrentProduct,

    /* Functions */
    onSelectProduct,
    onDeleteProduct,
    onEditProduct,
    onEditProductType,
    onAddProductType,
    onDeleteProductType,
    onAddProduct,
    onFilterByCategory,
    onDeleteCategoryFilter,
    onApplyMobileFilters,
    onSearchProduct,
    handleChangePage,
    onDeleteAllProductsType
  }
}

export default useProducts
