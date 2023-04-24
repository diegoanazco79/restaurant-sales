import { useState } from 'react'
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'

import FilterBadge from 'components/filterBadge'
import FiltersModal from './FiltersModal'
import Modal from 'components/modal/Modal'

import { type FiltersType, type AppliedFiltersType, type CategoryProductType } from 'pages/products/interfaces/Products'
import TuneIcon from '@mui/icons-material/Tune'

interface Props {
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  onApplyMobileFilters: (categoryId: CategoryProductType['id']) => void
}

const Navigation = ({
  appliedFilters, filters,
  onApplyMobileFilters
}: Props) => {
  const [showFiltersModal, setShowFiltersModal] = useState(false)

  const filtersLength = Object.values(appliedFilters).filter(val => val === true).length

  return (
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }}
        elevation={3}
      >
        <BottomNavigation showLabels >
          <BottomNavigationAction
            onClick={() => { setShowFiltersModal(true) }}
            label="Filtros"
            icon={
              <FilterBadge color="secondary" badgeContent={filtersLength} >
                <TuneIcon />
              </FilterBadge>
            }
          />
        </BottomNavigation>
      </Paper>
      <Modal
        open={showFiltersModal}
        setOpen={setShowFiltersModal}
        title='Filtros'
      >
        <FiltersModal
          filters={filters}
          setShowFiltersModal={setShowFiltersModal}
          onApplyMobileFilters={onApplyMobileFilters}
        />
      </Modal>
    </>
  )
}

export default Navigation
