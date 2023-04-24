import { Container, Grid } from '@mui/material'

import AddTable from './components/modals/AddTable'
import EditTable from './components/modals/EditTable'
import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import Navigation from './components/Navigation'
import OrderManagement from 'containers/orderManagement'
import TableCard from './components/TableCard'
import TitlePage from 'components/titlePage'

import useRestaurant from './hooks/useRestaurant'
import useResponsive from 'helpers/hooks/useResponsive'

import { initialTable } from './helpers/constants'

const RestaurantPage = () => {
  const {
    filters, appliedFilters, tables, showEditModal, currentTableEdit,
    showFiltersModal, tableOrder,
    setShowEditModal, setCurrentTableEdit, setShowFiltersModal, setTableOrder,
    onAddTable, onDeleteTable, onEditTable, onBlockTable, onUnlockTable,
    onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter, onDeleteAmbientFilter
  } = useRestaurant()

  const { isMobileOrTablet } = useResponsive()

  /* Component's Props */
  const filtersProps = {
    filters,
    appliedFilters,
    onFilterByStatus,
    onFilterByAmbient,
    onDeleteStatusFilter,
    onDeleteAmbientFilter
  }

  const tableCardProps = {
    setShowEditModal,
    setCurrentTableEdit,
    setTableOrder,
    onDeleteTable,
    onEditTable,
    onBlockTable,
    onUnlockTable
  }

  const editTableProps = {
    table: currentTableEdit,
    setShowEditModal,
    onEditTable
  }

  const navigationProps = {
    showFiltersModal,
    filters,
    appliedFilters,
    setShowFiltersModal,
    onFilterByStatus,
    onFilterByAmbient,
    onDeleteStatusFilter,
    onDeleteAmbientFilter
  }

  const orderManagementProps = {
    tableOrder,
    roomType: 'restaurant',
    onBackAction: () => { setTableOrder(initialTable) }
  }

  return (
    <>
      {tableOrder === initialTable
        ? (
          <Container maxWidth='xl' sx={{ height: '100%' }}>
            <TitlePage title='Restaurante' />
            {isMobileOrTablet
              ? <Navigation {...navigationProps} />
              : <Filters {...filtersProps} />
            }
            <Grid container spacing={3} pb={10}>
              <Grid item xs={12} sm={6} md={3}>
                <AddTable onAddTable={onAddTable}/>
              </Grid>
              {tables?.map(table => (
                <Grid key={table.id} item xs={12} sm={6} md={3}>
                  <TableCard
                    table={table}
                    {...tableCardProps}
                  />
                </Grid>
              ))}
            </Grid>
            <Modal
              open={showEditModal}
              setOpen={setShowEditModal}
              title='Editar Mesa'
            >
              <EditTable {...editTableProps} />
            </Modal>
          </Container>
        )
        : <OrderManagement {...orderManagementProps} />
      }
    </>
  )
}

export default RestaurantPage
