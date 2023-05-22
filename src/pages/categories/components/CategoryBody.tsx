import { useState } from 'react'
import { Box, Typography, IconButton, Popover } from '@mui/material'

import CategoryActions from './CategoryActions'

import { type Category } from '../interfaces/Category'
import MoreVertIcon from '@mui/icons-material/MoreVert'

interface Props {
  category: Category
  onDeleteCategory: (categoryId: Category['_id']) => void
}

const CategoryBody = ({ category, onDeleteCategory }: Props) => {
  const [open, setOpen] = useState<HTMLButtonElement | null>(null)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen(event.currentTarget)
  }

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setOpen(null)
  }

  return (
    <>
      <Box display='flex' alignItems='center' justifyContent='flex-end'>
        <IconButton onClick={handleOpen} sx={{ p: 0 }}>
          <MoreVertIcon fontSize='small' />
        </IconButton>
      </Box>
      <Box display='flex' alignItems='center' justifyContent='center' height='100%' pb={3}>
        <Typography variant='h4' fontWeight={600}>
          {category.name}
        </Typography>
      </Box>

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
    </>
  )
}

export default CategoryBody
