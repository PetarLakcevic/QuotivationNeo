import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Button, IconButton, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Info } from '@mui/icons-material';
import visaSecure from '../../assets/images/Logotipi/Visa Secure/visa-secure_blu_72dpi.png';
import masterId from '../../assets/images/Logoi/Master Secure crni.svg';
import maestro from '../../assets/images/Logotipi/Maestro Card/Maestro - White and Light Backgrounds/ms_vrt_pos.svg';
import master from '../../assets/images/Logoi/Mastercard black.svg';
import dina from '../../assets/images/Logoi/dinacard-new.svg';
import visa from '../../assets/images/Logoi/Visa New 2021.svg';
import chipcard from '../../assets/images/Logotipi/ChipCard LOGO 2021_rgb.png';


const Step1 = ({ account }) => {
  const navigate = useNavigate();

  const [modalFree, setModalFree] = useState(false);
  const [modalPremium, setModalPremium] = useState(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
      <UserContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 3,
            textAlign: 'center',
            textDecoration: 'none',
            maxWidth: '760px',
            margin: '0 auto',
            // minWidth: '350px',
            mt: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: matches ? 'row' : 'column',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              width: '100%',
              gap: 2,
            }}
          >
            <Box
              sx={{
                width: matches ? '50%' : '100%',
                border: '1px solid #478D8A',
                borderRadius: '5px',

                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  pb: 0.5,
                  // bgcolor: '#478D8A',
                  // color: '#fff',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              >
                <Typography variant="h6">Explore plan</Typography>
                <Typography sx={{ fontWeight: 'bold', visibility: 'hidden', fontSize: '1.15rem' }} variant="h6">
                  2000 RSD/Year
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                  (Free)
                </Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2,
                  p: 2,
                  mt: 1,
                }}
              >
                <Box>
                  <Typography>-2 quotes a day for the first 7 days</Typography>
                  <Typography>-1 quote every 3 days after the first 7 days expire</Typography>
                  <Typography>-Daily notifications</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    detailed informations
                    <IconButton
                    onClick={() => setModalFree(true)}
                    >
                      <Info />
                    </IconButton>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      //   marginInline: 'auto',
                      bgcolor: '#478D8A',
                    }}
                    disabled
                  >
                    {' '}
                    <Typography variant="body1">
                      FREE <br />
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 'normal',
                        }}
                      >
                        {' '}
                        (ALREADY ACTIVE)
                      </span>
                    </Typography>{' '}
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                width: matches ? '50%' : '100%',
                border: '1px solid #478D8A',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={{
                  p: 1,
                  bgcolor: '#478D8A',
                  color: '#fff',
                  borderBottomLeftRadius: '10px',
                  borderBottomRightRadius: '10px',
                }}
              >
                <Typography variant="h6">Premium plan</Typography>
                <Typography sx={{ fontWeight: 'bold' }} variant="h6">
                  2000 RSD/Year
                </Typography>
                <Typography> (approx. 117.2 EUR/Year)</Typography>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 2,
                  p: 2,
                  mt: 1,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                  }}
                >
                  <Typography>- 2 quotes a day for an entire year (365 days)</Typography>
                  <Typography>- Daily notifications</Typography>{' '}
                  <Typography>- Access to History (see the list of your previously received quotes)</Typography>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    detailed informations
                    <IconButton
                    onClick={() => setModalPremium(true)}
                    >
                      <Info />
                    </IconButton>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      //   marginInline: 'auto',
                      bgcolor: '#478D8A',
                    }}
                    onPointerDown={() => navigate('/payments/step2')}
                  >
                    {' '}
                    <Typography variant="body1" sx={{ color: '#fff' }}>
                      BUY NOW
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <ul style={{
              textAlign: 'left',
              padding: 10,
            }}>
              <li>
                Quotivation.io does not save your credit card information. 
              </li>
              <li>
                When the Premium plan expires, it will not renew automatically, instead you will be switched to the Explore plan.
              </li>
              <li>
                There is no monthly plan, only annual.
              </li>
            </ul>
          </Box>
          {/* <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '3px',
        }}
      >
        {' '}
        <img
          src={visa}
          alt="visa"
          style={{
            width: '65px',
            height: '50px',
            objectFit: 'contain',
            // padding: '5px',
          }}
        />{' '}
        <img
          src={master}
          alt="master"
          style={{
            width: '65px',
            height: '50px',
            objectFit: 'contain',
            padding: '5px',
          }}
        />
        <img
          src={maestro}
          alt="maestro"
          style={{
            width: '65px',
            height: '50px',
            objectFit: 'contain',
          }}
        />
        <img
          src={dina}
          alt="dina"
          style={{
            width: '65px',
            height: '50px',
            objectFit: 'contain',
            //   backgroundColor: 'white',
            // padding: '5px',
          }}
        />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <a href="https://chipcard.rs/ecommerce/" target="_blank" rel="noreferrer">
          <img
            src={chipcard}
            alt="chipcard"
            style={{
              width: '85px',
              height: '50px',
              objectFit: 'contain',
              // backgroundColor: 'white',
              //   padding: '5px',
            }}
          />
        </a>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <a href="http://www.mastercard.com/rs/consumer/credit-cards.html" target="_blank" rel="noreferrer">
          <img
            src={visaSecure}
            alt="visa secure"
            style={{
              width: '75px',
              height: '50px',
              objectFit: 'contain',
              // backgroundColor: 'white',
              //   padding: '5px',
            }}
          />
        </a>
        <a href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html " target="_blank" rel="noreferrer">
          <img
            src={masterId}
            alt="master id"
            style={{
              width: '75px',
              height: '50px',
              objectFit: 'contain',
              // backgroundColor: 'white',
              //   padding: '5px',
            }}
          />
        </a>
      </Box> */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: '#478D8A',
                borderColor: '#478D8A',
              }}
              onPointerDown={() => navigate('/home')}
            >
              {' '}
              <Typography variant="body1" sx={{ color: '#478D8A' }}>
                Back to home
              </Typography>
            </Button>
          </Box>
        </Box>
        <Modal open={modalFree} onClose={() => setModalFree(false)}>
          <Box
            sx={{
              position: 'absolute',
        bgcolor: '#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'scroll',
        width: '90%',
        maxHeight: '90%',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 3,
        textAlign: 'center',
        textDecoration: 'none',
        maxWidth: '760px',
        margin: '0 auto',
            }}
          >
            <Typography variant="h6">Explore plan</Typography>
            <Typography variant="body1">
            Embark on a journey of inspiration with our free Explore Plan. For the first week, receive a boost of motivation with 2 daily quotes. After that, continue your journey with a special quote every 3 days, reminding you of the power within.
            </Typography>
            <Button variant="contained" sx={{ bgcolor: '#478D8A', color: '#fff' }} onPointerDown={() => setModalFree(false)}>
              <Typography variant="body1">Close</Typography>
            </Button>
          </Box>
        </Modal>
        <Modal open={modalPremium} onClose={() => setModalPremium(false)}>
          <Box
            sx={{
              position: 'absolute',
        bgcolor: '#fff',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflowY: 'scroll',
        width: '90%',
        maxHeight: '90%',
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 3,
        textAlign: 'center',
        textDecoration: 'none',
        maxWidth: '760px',
        margin: '0 auto',
            }}
          >
            <Typography variant="h6">Premium Plan (Paid)</Typography>
            <Typography variant="body1">
            Elevate your daily dose of motivation with our <b>Premium Plan</b>. For an annual subscription, enjoy <b>2 inspirational quotes every single day</b>, ensuring you're constantly fueled with positivity. Plus, with <b>exclusive access to your personal quote history</b>, you'll never lose track of those words that resonated with you the most. 
The total cost for the Premium Plan is <b>2,000.00 RSD</b>
            </Typography>
            <Button variant="contained" sx={{ bgcolor: '#478D8A', color: '#fff' }} onPointerDown={() => setModalPremium(false)}>
              <Typography variant="body1">Close</Typography>
            </Button>
          </Box>
        </Modal>
      </UserContent>

  );
};

export default Step1;
