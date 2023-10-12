import { Box } from '@mui/system'
import React from 'react'

const UserContainer = ({children}) => {
  return (
      <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '100vh',
          // height: window.innerHeight,
      }}>
          {children}
    </Box>
  )
}

export default UserContainer