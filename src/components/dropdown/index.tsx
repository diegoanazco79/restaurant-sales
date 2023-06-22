import { useState, type MouseEvent } from 'react'
import { alpha, Button, MenuItem, useTheme, type SxProps, type Theme } from '@mui/material'

import StyledMenu from './StyledMenu'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

export interface Option {
  id: string
  filterLabel?: string
  label: string
}

interface Props {
  buttonLabel: string
  selected?: boolean
  fullWidth?: boolean
  sx?: SxProps<Theme> | undefined
  options: Option[]
  handleOptionClick: (option: Option) => void
}

const Dropdown = ({
  buttonLabel, selected = false, sx, options, fullWidth,
  handleOptionClick
}: Props) => {
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

  return (
    <div>
      <Button
        sx={{
          ...sx,
          height: '100%',
          justifyContent: 'space-between',
          fontWeight: 500,
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
        fullWidth={fullWidth}
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
        {options?.map((option) => (
          <MenuItem
            key={option.label}
            selected={selectedOption ? selectedOption.id === option.id : false}
            onClick={() => {
              setSelectedOption(option)
              handleOptionClick(option)
              handleClose()
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  )
}

export default Dropdown
