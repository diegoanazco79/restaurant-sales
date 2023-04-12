import { Box, Divider, IconButton, Modal as MaterialModal, Typography, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

import CloseIcon from '@mui/icons-material/Close'

interface Props {
  open: boolean
  title: string
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element
}

const Modal = ({ open, title, setOpen, children }: Props) => {
  const theme = useTheme()

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '95%',
    width: 600,
    bgcolor: theme.palette.common.white,
    border: `${pxToRem(1)} solid ${theme.palette.grey[200]}`,
    borderRadius: pxToRem(6),
    boxShadow: 'rgb(145 158 171 / 20%) 0px 5px 5px -3px, rgb(145 158 171 / 14%) 0px 8px 10px 1px, rgb(145 158 171 / 12%) 0px 3px 14px 2px',
    p: 4,
    outline: 'none',
    maxHeight: '90vh',
    overflowY: 'auto'
  }

  return (
    <MaterialModal
      open={open}
      onClose={() => { setOpen(false) }}
    >
      <Box sx={style}>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>{title}</Typography>
          <IconButton onClick={() => { setOpen(false) }}>
            <CloseIcon/>
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        {children}
      </Box>
    </MaterialModal>
  )
}

export default Modal
