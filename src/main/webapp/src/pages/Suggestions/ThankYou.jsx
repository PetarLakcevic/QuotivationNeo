import React from 'react'
import UserContainer from '../../components/UserContainer'
import UserNavbar from '../../components/UserNavbar'
import UserContent from '../../components/UserContent'
import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
    const navigate = useNavigate();
  return (
      <UserContainer>
          {/* <UserNavbar /> */}
          <UserContent>
              <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '1rem',
                    padding: '2rem',
              }}>
              <Typography variant="h4">Thank you!</Typography>
              <Typography variant="h6">Thank you for your contribution! Your suggestion has been submitted.
                  </Typography>
                  <Box>
                      <Button variant="outlined" color="primary" sx={{ mt: 3 }}
                      onPointerDown={() => navigate('/home')}
                      >
                          {/* <Typography variant="h6"> */}
                              Back to Home
                          {/* </Typography> */}
                      </Button>
                      <Button variant="outlined" color="primary" sx={{ mt: 3 }}
                          onPointerDown={() => navigate('/suggestions')}
                      >
                          {/* <Typography variant="h6"> */}
                              Submit another suggestion
                          {/* </Typography> */}
                        </Button>
                      
                  </Box>
              </Box>
          </UserContent>
    </UserContainer>
  )
}

export default ThankYou