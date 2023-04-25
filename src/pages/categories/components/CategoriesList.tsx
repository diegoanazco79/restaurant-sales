import { useState } from 'react'
import { Grid, Typography, Popover } from '@mui/material'

import CategoryActions from './CategoryActions'
import CategoryBody from './CategoryBody'
import CategoryCard from './styled/CategoryCard'
import CategoryManagement from 'containers/categoryManagement'
import Modal from 'components/modal/Modal'

import { type Category } from '../interfaces/Category'
import AddIcon from '@mui/icons-material/Add'

interface Props {
  categories: Category[]
  currentCategory: Category
  onDeleteCategory: (categoryId: Category['id']) => void
  onSelectCategory: (category: Category) => void
}

const CategoriesList = ({
  categories, currentCategory,
  onSelectCategory, onDeleteCategory
}: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget)
    event.stopPropagation()
  }

  const handleClose = () => {
    setOpen(null)
  }

  return (
    <>
      <Grid container spacing={3} pb={10}>
        <Grid item xs={12} sm={6} md={3}>
          <CategoryCard
            display="flex" flexDirection="column" alignItems="center" justifyContent="center"
            onClick={() => { setShowAddModal(true) }}
          >
            <AddIcon sx={{ height: '115px', width: '115px', opacity: '0.3' }} />
            <Typography variant="body1"> Añadir nueva categoría </Typography>
          </CategoryCard>
        </Grid>
        {categories.map((category, idx) => (
          <Grid
            item key={idx} xs={12} sm={6} md={3}
            onClick={() => {
              onSelectCategory(category)
              setShowEditModal(true)
            }}
          >
            <CategoryCard height='100% !important'>
              <CategoryBody category={category} handleOpen={handleOpen} />
            </CategoryCard>
            <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: {
                  p: 0,
                  width: 'fit-content',
                  '& .MuiMenuItem-root': {
                    typography: 'body2',
                    borderRadius: 0.75
                  }
                }
              }}
            >
              <CategoryActions
                category={category}
                setOpen={setOpen}
                onDeleteCategory={onDeleteCategory}
              />
            </Popover>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={showEditModal}
        setOpen={setShowEditModal}
        title='Editar categoría'
      >
        <CategoryManagement
          actionType='edit'
          category={currentCategory}
          setShow={setShowEditModal}
        />
      </Modal>
      <Modal
        open={showAddModal}
        setOpen={setShowAddModal}
        title='Añadir categoría'
      >
        <CategoryManagement
          actionType='create'
          setShow={setShowAddModal}
        />
      </Modal>
    </>
  )
}

export default CategoriesList
