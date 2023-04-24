import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material'

import FiltersMobile from './modals/FiltersMobile'
import FilterBadge from 'components/filterBadge'

import TuneIcon from '@mui/icons-material/Tune'
import { type AppliedFiltersType, type FiltersType } from '../interfaces/Tables'

interface Props {
  showFiltersModal: boolean
  filters: FiltersType
  appliedFilters: AppliedFiltersType
  setShowFiltersModal: React.Dispatch<React.SetStateAction<boolean>>
  onFilterByStatus: (status: string) => void
  onFilterByAmbient: (status: string) => void
  onDeleteStatusFilter: () => void
  onDeleteAmbientFilter: () => void
}

const Navigation = ({
  showFiltersModal, filters, appliedFilters,
  setShowFiltersModal,
  onFilterByStatus, onFilterByAmbient, onDeleteStatusFilter,
  onDeleteAmbientFilter
}: Props) => {
  const filtersLength = Object.values(appliedFilters).filter(val => val === true).length

  /* Component's Props */
  const filtersMobileProps = {
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
    <>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 10 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
        >
          <BottomNavigationAction
            onClick={() => { setShowFiltersModal(true) }}
            label="Filtros"
            icon={
              <FilterBadge
                color="secondary"
                badgeContent={filtersLength}
              >
                <TuneIcon />
              </FilterBadge>
            }
          />
        </BottomNavigation>
      </Paper>
      <FiltersMobile {...filtersMobileProps} />
    </>
  )
}

export default Navigation
