import { Typography } from '@mui/material'

import CategoryCard from './styled/CategoryCard'

import AddIcon from '@mui/icons-material/Add'

interface Props {
  isEmpty: boolean
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>
}

const NewCategory = ({ isEmpty, setShowAddModal }: Props) => {
  return (
    <CategoryCard
      display="flex" flexDirection="column" alignItems="center" justifyContent="center"
      width={isEmpty ? 'fit-content' : '100%'}
      onClick={() => { setShowAddModal(true) }}
    >
      <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
      <Typography variant="body1" align="center">
        Añadir nueva categoría
      </Typography>
    </CategoryCard>
  )
}

export default NewCategory
