import 'moment-timezone'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import Swal from 'sweetalert2'

import { useAuthStore } from 'store/auth'
import useCategoryApi from 'api/services/useCategoryApi'
import useOrderApi from 'api/services/useOrderApi'
import useProductApi from 'api/services/useProductApi'
import useTableApi from 'api/services/useTableApi'

import { initialFilters as initialCategoryFilters } from 'pages/categories/helpers/constants'
import { initialFilters as initialProductFilters } from 'pages/products/helpers/constants'
import { initialOrder } from '../helpers/constants'

import { type Order } from '../interfaces/Order'
import { type Order as OrderApi } from 'api/interfaces/OrderApi'
import { type ProductType } from '../../../pages/products/interfaces/Products'
import { type TableType } from 'pages/restaurant/interfaces/Tables'

interface Props {
  tableId?: string
  orderId: string
}

const useOrders = ({ tableId, orderId }: Props) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [totalOrder, setTotalOrder] = useState(0)
  const [showSummaryModal, setShowSummaryModal] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<Order>(initialOrder)
  const [mainOrderNote, setMainOrderNote] = useState('')

  const [currentCategory, setCurrentCategory] = useState('all-categories')

  const [productFilters, setProductFilters] = useState(initialProductFilters)

  const navigate = useNavigate()

  const user = useAuthStore((state) => state.profile)

  const { getAllCategories } = useCategoryApi()
  const { getAllProducts } = useProductApi()
  const { getTableById, updateTable } = useTableApi()
  const { createOrder, getOrderById } = useOrderApi()

  /* Get all categories */
  const { data: categoriesList, isLoading: loadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await getAllCategories(initialCategoryFilters)
  })

  /* Get all products */
  const { data: productsList, isLoading: loadingProducts } = useQuery({
    queryKey: ['products', productFilters],
    queryFn: async () => await getAllProducts(productFilters)
  })

  /* Get table data */
  const { data: tableData, isLoading: loadingTable } = useQuery({
    queryKey: ['table'],
    queryFn: async () => await getTableById(tableId ?? '')
  })

  /* Get order data */
  const { isLoading: loadingOrder } = useQuery({
    queryKey: ['order'],
    queryFn: async () => await getOrderById(orderId),
    enabled: orderId !== 'new',
    onSuccess: (data) => {
      console.log(data)
      setOrders(data?.products ?? [])
      setMainOrderNote(data?.note ?? '')
    }
  })

  /* Create a order */
  const createMutation = useMutation({
    mutationFn: async (formValues: OrderApi) => await createOrder(formValues)
  })

  /* Update a table */
  const updateTableMutation = useMutation({
    mutationFn: async (formValues: TableType) => await updateTable(formValues)
  })

  useEffect(() => {
    let newTotal = 0
    for (let i = 0; i < orders.length; i++) {
      newTotal += orders[i].price * orders[i].amount
    }
    setTotalOrder(Number(newTotal.toFixed(2)))
  }, [orders])

  /**
   * Handles when user want add order to cart
   * @param {Order} order
   */
  const onAddOrder = (order: Order) => {
    const orderIndex = orders.findIndex(({ id, type }) => id === order.id && type?._id === order.type?._id)
    const newOrders = [...orders]
    if (orderIndex >= 0) {
      newOrders[orderIndex] = { ...newOrders[orderIndex], amount: newOrders[orderIndex].amount + 1 }
      const [removedOrder] = newOrders.splice(orderIndex, 1)
      newOrders.unshift(removedOrder)
    } else {
      newOrders.unshift({ ...order, amount: 1 })
    }
    setOrders(newOrders)
  }

  /**
 * This function handles incrementing the amount of a specific order in an array of orders.
 * @param orderId - The `orderId` parameter is of type `Order['id']`nding order
 */
  const handleIncrement = (orderId: Order['id'], typeId: ProductType['_id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === orderId && (!order?.type || order?.type?._id === typeId)) {
        return { ...order, amount: order.amount + 1 }
      } else return order
    })
    setOrders(newOrders)
  }

  /**
 * This function handles decrementing the amount of a specific order in an array of orders.
 * @param orderId - The `orderId` parameter is of type `Order['id']`nding order
 */
  const handleDecrement = (orderId: Order['id'], typeId?: ProductType['_id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === orderId && (!order?.type || order?.type?._id === typeId)) {
        return { ...order, amount: order.amount === 1 ? 1 : order.amount - 1 }
      } else return order
    })
    setOrders(newOrders)
  }

  /**
 * The function deletes an order from a list of orders based on its ID.
 * @param orderId - The `orderId` parameter is of type `Order['id']`
 * @param typeId - The `typeId` parameter is of type `ProductType['id']`
 */
  const onDeleteOrder = (orderId: Order['id'], typeId?: ProductType['_id']) => {
    const newOrders = orders.filter(order => {
      if (order?.id === orderId) {
        if (!order?.type || order?.type?._id === typeId) {
          return false
        } else {
          return true
        }
      }
      return true
    })
    setOrders(newOrders)
  }

  /**
   * This function updates the note field of an order
   * @param {string} note - The `note` that represents the note to be added
   * @param [typeId] - `typeId`
   */
  const onAddNote = (note: string, typeId?: ProductType['_id']) => {
    const newOrders = orders?.map((order) => {
      if (order.id === currentOrder?.id && (!order?.type || order?.type?._id === typeId)) {
        return { ...order, note }
      } else return order
    })
    setOrders(newOrders)
  }

  /**
 * Handles a search input box in products list.
 * @param {string} search
 */
  const onSearchProduct = (search: string) => {
    setProductFilters({ ...productFilters, search })
  }

  /**
   * Handles when user change the main order note
   * @param {string} note
   */
  const onChangeMainOrderNote = (note: string) => {
    setMainOrderNote(note)
  }

  /**
   * Handles when user select a category
   * @param {string} categoryId
   */
  const onSelectCategory = (categoryId: string) => {
    const category = categoryId === 'all-categories' ? '' : categoryId
    setCurrentCategory(categoryId)
    setProductFilters({ ...productFilters, category })
  }

  /**
   * Handles when user want cancel a order in resturant
   * @param {string} roomType
   * @param {boolean} isNewOrder
   * */
  const onCancelNewOrder = (roomType: string, isNewOrder: boolean) => {
    void Swal.fire({
      title: '¿Estás seguro de cancelar esta orden?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, volver'
    }).then((result) => {
      if (result.isConfirmed) {
        if (roomType === 'restaurant') {
          if (isNewOrder) {
            navigate('/restaurant')
          }
        }
      }
    })
  }

  /**
   * Handles when user want save a new order in resturant
   **/
  const onSaveNewResturantOrder = () => {
    const formartedOrders = orders.map((order) =>
      order.type
        ? { ...order, type: { id: order.type._id, name: order.type.name } }
        : order
    )
    const newResturantOrder = {
      products: formartedOrders,
      restaurant: tableData?._id,
      start_time: moment().tz('America/Lima').format(),
      total_price: totalOrder,
      user: user?.id ?? '',
      note: mainOrderNote,
      status: 'in-progress'
    }

    void Swal.fire({
      title: '¿Estás seguro de guardar esta orden?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, guardar',
      cancelButtonText: 'No, volver',
      reverseButtons: true,
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const { room } = tableData
          const orderResponse = await createMutation.mutateAsync(
            newResturantOrder
          )
          await updateTableMutation.mutateAsync({
            ...tableData,
            order: {
              _id: orderResponse._id,
              start_time: orderResponse.start_time,
              total_price: orderResponse.total_price
            },
            status: 'in_progress',
            room: { _id: room }
          })
          return { isConfirmed: true }
        } catch (error) {
          return { isConfirmed: false }
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value?.isConfirmed) {
        void Swal.fire({
          title: '¡Orden guardada!',
          text: 'La orden se guardó correctamente',
          icon: 'success'
        }).then(() => {
          navigate('/restaurant')
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
    orders,
    totalOrder,
    showSummaryModal,
    currentOrder,
    categoriesList,
    loadingCategories,
    currentCategory,
    productsList: productsList?.products ?? [],
    loadingProducts,
    tableData,
    loadingTable,
    mainOrderNote,
    loadingOrder,

    /* Function States */
    setShowSummaryModal,
    setCurrentOrder,

    /* Functions */
    onAddOrder,
    onDeleteOrder,
    onSearchProduct,
    handleIncrement,
    handleDecrement,
    onAddNote,
    onSelectCategory,
    onCancelNewOrder,
    onSaveNewResturantOrder,
    onChangeMainOrderNote
  }
}
export default useOrders
