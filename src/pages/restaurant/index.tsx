import { Container, Grid } from '@mui/material'

import AddTable from './components/modals/AddTable'
import EditTable from './components/modals/EditTable'
import Filters from './components/Filters'
import Modal from 'components/modal/Modal'
import Navigation from './components/Navigation'
import TableCard from './components/TableCard'
import TitlePage from 'components/titlePage'

import useRestaurant from './hooks/useRestaurant'
import useResponsive from 'helpers/hooks/useResponsive'

const RestaurantPage = () => {
  const {
    filters, appliedFilters, tables, showEditModal, currentTableEdit,
    showFiltersModal,
    setShowEditModal, setCurrentTableEdit, setShowFiltersModal,
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

  return (
    <Container maxWidth='xl'>
      <TitlePage title='Restaurante' />
      {!isMobileOrTablet && <Filters {...filtersProps} /> }
      {isMobileOrTablet && <Navigation {...navigationProps} />}
      <Grid container spacing={3}>
        {tables?.map(table => (
          <Grid key={table.id} item xs={12} sm={6} md={3}>
            <TableCard
              table={table}
              {...tableCardProps}
            />
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={3}>
          <AddTable onAddTable={onAddTable}/>
        </Grid>
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
}

export default RestaurantPage
