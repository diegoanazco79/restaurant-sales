import {
  Stack, MenuItem, ListItemIcon, Typography, useTheme
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import { type Category } from '../interfaces/Category'

interface Props {
  category: Category
  setOpen: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>
  onDeleteCategory: (categoryId: Category['id']) => void
}

const CategoryActions = ({ category, setOpen, onDeleteCategory }: Props) => {
  const { palette } = useTheme()
  return (
    <Stack sx={{ p: 1 }}>
      <MenuItem
        sx={{ px: 1 }}
        onClick={(ev) => {
          ev.stopPropagation()
          onDeleteCategory(category.id)
          setOpen(null)
        }}
      >
        <ListItemIcon>
          <DeleteIcon sx={{ color: palette.error.main }} fontSize="small" />
        </ListItemIcon>
        <Typography sx={{ color: palette.error.main }} variant="body2">
          Eliminar
        </Typography>
      </MenuItem>
    </Stack>
  )
}

export default CategoryActions
