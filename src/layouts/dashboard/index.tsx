import { Box } from '@mui/material'
import { useState } from 'react'

import Header from './components/header'
import Navbar from './components/navbar'

const DashboardLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100%', overflow: 'hidden' }}>
      <Header onOpenNav={() => { setOpen(true) }} />
      <Navbar openNavbar={open} onCloseNavbar={() => { setOpen(false) }} />
    </Box>
  )
}

export default DashboardLayout
