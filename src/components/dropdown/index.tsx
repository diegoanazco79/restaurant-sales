import { useState, type MouseEvent } from 'react'
import { alpha, Button, MenuItem, useTheme, type SxProps, type Theme } from '@mui/material'

import StyledMenu from './StyledMenu'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

interface Option {
  label: string
  onClick: () => void
}

interface Props {
  buttonLabel: string
  selected: boolean
  sx?: SxProps<Theme> | undefined
  options: Option[]
}

const Dropdown = ({ buttonLabel, selected, sx, options }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)
  const theme = useTheme()
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option)
    option.onClick()
    handleClose()
  }

  return (
    <div>
      <Button
        sx={{
          ...sx,
          height: '100%',
          justifyContent: 'space-between',
          ...(!open) && {
            borderColor: alpha(theme.palette.grey[500], 0.32),
            color: theme.palette.grey[800]
          },
          '&:hover': {
            color: theme.palette.primary.main
          },
          ...(selected) && {
            borderColor: theme.palette.primary.light,
            background: alpha(theme.palette.primary.lighter, 0.8)
          }
        }}
        id="dropdown-component"
        aria-controls={open ? 'custom-dropdown' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {buttonLabel}
      </Button>
      <StyledMenu
        id="custom-dropdown"
        MenuListProps={{ 'aria-labelledby': 'dropdown-component' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => { handleOptionClick(option) }}
            selected={option.label === selectedOption?.label}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

export default Dropdown
