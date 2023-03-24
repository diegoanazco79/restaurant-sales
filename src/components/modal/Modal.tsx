import { Box, Modal as MaterialModal, useTheme } from '@mui/material'

import { pxToRem } from 'theme/helpers/functions'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element
}

const Modal = ({ open, setOpen, children }: Props) => {
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
    p: 4
  }

  return (
    <MaterialModal
      open={open}
      onClose={() => { setOpen(false) }}
    >
      <Box sx={style}>
        {children}
      </Box>
    </MaterialModal>
  )
}

export default Modal
