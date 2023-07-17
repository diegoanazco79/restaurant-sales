import { Container, LinearProgress } from '@mui/material'

import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import TitlePage from 'components/titlePage'

import useRestaurant from './hooks/useRestaurant'

import TablesList from './components/TablesList'
import EmptyData from './components/EmptyData'
import TablesManagement from './components/TablesManagement'

const RestaurantPage = () => {
  const {
    filters, appliedFilters, tablesList, showEditModal, currentTable, roomsList,
    loadingRooms, loadingTables, showAddModal, isRefetchingRooms, isRefetchingTables,
    setShowEditModal, setTableOrder, setShowAddModal,
    onDeleteTable, onEditTable, onBlockTable, onUnlockTable, onAddTable,
    onFilterByStatus, onFilterByRoom, onDeleteStatusFilter, onDeleteRoomFilter,
    onSearchTable, onSelectTable
  } = useRestaurant()

  /* Component's Props */
  const filtersProps = {
    roomsList,
    filters,
    appliedFilters,
    onSearchTable,
    onFilterByStatus,
    onFilterByRoom,
    onDeleteStatusFilter,
    onDeleteRoomFilter
  }

  const tableListProps = {
    tables: tablesList,
    onSelectTable,
    setShowAddModal,
    setTableOrder,
    onDeleteTable,
    onEditTable,
    onBlockTable,
    onUnlockTable
  }

  return (
    <Container maxWidth='xl' sx={{ height: '100%' }}>
      <TitlePage title='Restaurante' />
      <Filters {...filtersProps} />
      {loadingRooms || loadingTables || isRefetchingRooms || isRefetchingTables
        ? <LinearProgress />
        : (
          <>
            {!tablesList && !loadingTables && !isRefetchingTables && !isRefetchingRooms
              ? <EmptyData setShowAddModal={setShowAddModal} />
              : <TablesList {...tableListProps} />
            }
          </>
        )
      }
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar Mesa'
      >
        <TablesManagement
          actionType='edit'
          table={currentTable}
          roomsList={roomsList}
          setShow={setShowEditModal}
          onFinishModal={onEditTable}
        />
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir Mesa'
      >
        <TablesManagement
          actionType='create'
          roomsList={roomsList}
          setShow={setShowAddModal}
          onFinishModal={onAddTable}
        />
      </Modal>
    </Container>
  )
}

export default RestaurantPage
