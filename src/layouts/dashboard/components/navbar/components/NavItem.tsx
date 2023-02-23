import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme
} from '@mui/material'

interface Props {
  id: string
  name: string
  to: string
  icon: JSX.Element | undefined
}

const NavItem = ({ id, name, to, icon }: Props) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [itemOpen, setItemOpen] = useState(false)

  const handleClick = () => {
    setItemOpen(!itemOpen)
    navigate(to)
  }

  return (
    <ListItem key={id} sx={{ px: 2.5, py: 0 }}>
      <ListItemButton
        sx={{
          ...theme.typography.body2,
          height: 48,
          position: 'relative',
          textTransform: 'capitalize',
          color: theme.palette.text.secondary,
          borderRadius: '6px',
          pl: 0
        }}
        selected={pathname === to}
        onClick={handleClick}
      >
        <ListItemIcon sx={{
          width: 22,
          height: 22,
          color: 'inherit',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {icon}
        </ListItemIcon>
        <ListItemText >
          <Typography variant="body2">{name}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  )
}

export default NavItem
