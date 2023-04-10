import { Box, Button, Typography } from '@mui/material'
import React from 'react'

const ListItemStyled = ({children}) => {
  return (
    <Box
    sx={{
      backgroundImage: 'linear-gradient(115deg, rgba(245, 247, 250, 0.9) 0%, rgba(195, 207, 226,  0.4) 74%)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    {/* <Typography variant="h6" sx={{ fontWeight: '100' }}> */}
      {children}
    {/* </Typography> */}
          {/* <Button onPointerDown={onPointerDown}>See more</Button> */}
  </Box>
  )
}

export default ListItemStyled