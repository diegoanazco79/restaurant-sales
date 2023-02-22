import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

import Header from './components/header'
import Main from './components/Main'
import Navbar from './components/navbar'

const DashboardLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <Box sx={{ display: 'flex', minHeight: '100%', overflow: 'hidden' }}>
      <Header onOpenNav={() => { setOpen(true) }} />
      <Navbar openNavbar={open} onCloseNavbar={() => { setOpen(false) }} />
      <Main>
        <Outlet />
      </Main>
    </Box>
  )
}

export default DashboardLayout
