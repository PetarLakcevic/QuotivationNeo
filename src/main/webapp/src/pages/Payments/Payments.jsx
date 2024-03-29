import React, { useState, useRef, useEffect } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  TextFieldItem,
  FormControl,
  InputLabel,
  Checkbox,
  CircularProgress,
  Fade,
  Modal,
} from '@mui/material';
import { CreditCard, Done, LocalOffer, SystemSecurityUpdateGood } from '@mui/icons-material';
import axios from 'axios';
import visaSecure from '../../assets/images/Logotipi/Visa Secure/visa-secure_blu_72dpi.png';
import masterId from '../../assets/images/Logotipi/masterID check/mc_idcheck_vrt_rgb_pos.png';
import maestro from '../../assets/images/Logotipi/Maestro Card/Maestro - White and Light Backgrounds/ms_vrt_opt_pos_73_2x.png';
import master from '../../assets/images/Logotipi/Master Card/Mastercard White and Light Backgrounds/mc_vrt_opt_pos_73_2x.png';
import dina from '../../assets/images/Logotipi/Dina/DinaCard znak.jpg';
import visa from '../../assets/images/Logotipi/Visa/Visa_Brandmark_Blue_RGB_2021.png';
import chipcard from '../../assets/images/Logotipi/ChipCard LOGO 2021_rgb.png';
import { Link, useNavigate } from 'react-router-dom';
import { paymentLink } from '../../axios/axios';
import Footer from '../../components/Footer';
import TermsModal from './TermsModal';
import crown from '../../assets/images/crown.png';
import UserContent from '../../components/UserContent';

function CustomStepIcon(props) {
  const { active, completed, icon } = props;

  return (
    <Box
      sx={{
        bgcolor: '#478D8A',
        color: '#fff',
        borderRadius: '50%',
        padding: '0.3em',
        aspectRatio: '1/1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {active ? icon : completed ? <Done /> : icon}
    </Box>
  );
}

const Payments = ({ isLandscape }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [planType, setPlanType] = useState('yearly');

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const cardNumberRef = useRef();
  const cardExpirationRef = useRef();
  const cardCVCRef = useRef();

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardExpirationError, setCardExpirationError] = useState('');
  const [cardCVCError, setCardCVCError] = useState('');

  const checkFirstName = () => {
    if (firstNameRef.current.value === '') {
      setFirstNameError('First name is required');
      return false;
    } else {
      setFirstNameError('');
      return true;
    }
  };

  const checkLastName = () => {
    if (lastNameRef.current.value === '') {
      setLastNameError('Last name is required');
      return false;
    } else {
      setLastNameError('');
      return true;
    }
  };

  const checkCardNumber = () => {
    const regex = /^(\d{4} ){3}\d{4}$/; // Matches "1234 5678 9012 3456"
    let value = cardNumberRef.current.value;

    if (value === '') {
      setCardNumberError('Card number is required');
      return false;
    } else if (!regex.test(value)) {
      setCardNumberError('Card number must be 16 digits long');
      return false;
    } else {
      setCardNumberError('');
      return true;
    }
  };

  const checkCardExpiration = () => {
    const regex = /^[0-9]{2}\/[0-9]{4}$/;
    if (cardExpirationRef.current.value === '') {
      setCardExpirationError('Card expiration is required');
      return false;
    } else if (!regex.test(cardExpirationRef.current.value)) {
      setCardExpirationError('Card expiration must be in format MM/YYYY');
      return false;
    } else {
      setCardExpirationError('');
      return true;
    }
  };

  const checkCardCVC = () => {
    const regex = /^[0-9]{3}$/;
    if (cardCVCRef.current.value === '') {
      setCardCVCError('Card CVC is required');
      return false;
    } else if (!regex.test(cardCVCRef.current.value)) {
      setCardCVCError('Card CVC must be 3 digits long');
      return false;
    } else {
      setCardCVCError('');
      return true;
    }
  };

  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => i + 2023);

  const [selectedMonth, setSelectedMonth] = React.useState(months[0]);
  const [selectedYear, setSelectedYear] = React.useState(years[0]);
  const handleSubmit = event => {
    event.preventDefault();
    if (!checkFirstName() || !checkLastName() || !checkCardNumber() || !checkCardCVC()) return;

    const data = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      cardNumber: cardNumberRef.current.value,
      cardExpiration: `${selectedMonth}/${selectedYear}`, // `cardExpiration: cardExpirationRef.current.value,
      cardCVC: cardCVCRef.current.value,
    };
    console.log(data);
    setActiveStep(2);
  };
  const handleMonthChange = event => {
    setSelectedMonth(event.target.value);
    cardExpirationRef.current = `${event.target.value}/${selectedYear}`;
  };

  const handleYearChange = event => {
    setSelectedYear(event.target.value);
    cardExpirationRef.current = `${selectedMonth}/${event.target.value}`;
  };

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(true);

  const handlePaymentLink = () => {
    setLoading(true);
    paymentLink()
      .then(res => {
        setLoading(false);
        console.log(res.data);
        // const timer = setTimeout(() => {
        window.location.href = res.data;
        // }, 1000);
      })
      .catch(err => console.log(err));
  };

  const [accepted, setAccepted] = useState(false);

  return (
    <UserContent>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 2.5,
            // pb: 0,
            maxWidth: '90%',
            marginInline: 'auto',
            mt: 2,
            gap: 1,
            borderRadius: '0.5em',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.35)',
          }}
        >
          <Box
            sx={{
              // mt: isLandscape ? 10 : 2,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
              }}
            >
              PREMIUM PLAN
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isLandscape ? 'row' : 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                gap: 1,
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 1,
                  width: isLandscape ? '50%' : '100%',
                  minHeight: '200px',
                  backgroundImage: `url(${crown})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: isLandscape ? '50%' : '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isLandscape ? 0 : 1,
                    p: 2,
                    pb: 0,
                    bgcolor: '#fff',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    // mt: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6">Annual Subscription</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: isLandscape ? 'row' : 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1,
                    }}
                  >
                    <Typography variant="h5">2,000.00 RSD</Typography>
                    <Typography variant="h6"> ~ 17 EUR</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // gap: 1,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={
                        {
                          // whiteSpace: 'nowrap',
                        }
                      }
                    >
                      166.67 RSD/month, billed annually
                    </Typography>
                    <Typography variant="body2">~ 1.42 EUR/month</Typography>{' '}
                  </Box>
                  <Typography variant="body1">Conversion rate: 117.2</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: isLandscape ? 0 : 1,
                    p: 2,
                    pb: 0,
                    pt: 0,
                    bgcolor: '#fff',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    // mt: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" mt={2}>
                    What you get:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      // fontSize: '1.1em',
                    }}
                  >
                    ~ 2 quotes per day for an entire year! <br /> (That is 730 quotes!)
                  </Typography>{' '}
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'center',
                      // fontSize: '1.1em',
                    }}
                  >
                    {' '}
                    ~ Access to History
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                mt: 5,
                fontStyle: 'italic',
              }}
            >
              * When the premium plan expires, it will NOT be renewed automatically!
            </Typography>{' '}
            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',

                fontStyle: 'italic',
              }}
            >
              We don't store your credit card information.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mt: 4,
              }}
            >
              <Checkbox onChange={() => setAccepted(!accepted)} />
              <Typography variant="body1" >
                By checking this box, you agree to our <Link to="/privacy">Privacy Policy</Link> and{' '}
                <Link to="/terms-&-conditions">Terms & Conditions</Link>.
              </Typography>
            </Box>
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
                variant="contained"
                sx={{
                  // mt: 2,
                  // mb: 2,
                  marginInline: 'auto',
                  bgcolor: '#478D8A',
                }}
                onPointerDown={() => setShowModal(true)}
                disabled={!accepted}
              >
                BUY NOW
              </Button>
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
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80vw',
                maxWidth: '500px',
                bgcolor: '#fff',
                p: 2,
                borderRadius: '0.5em',
                outline: 'none',
              }}
            >
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                Complete Your Premium Subscription
              </Typography>
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                Unlock unlimited access to all of our exclusive features for an entire year!
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                Annual Plan: 2,000.00 RSD (~17 EUR at a conversion rate of 117.2)
              </Typography>
              <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
                That's only 166.67 RSD (~1.42 EUR) per month, billed annually.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: '#478D8A',
                  color: '#fff',
                  marginInline: 'auto',
                  display: 'block',
                }}
                onClick={handlePaymentLink}
              >
                Continue to Payment
              </Button>
            </Box>
          </Modal>
          <Modal open={showModal2}>
            <TermsModal setShowModal2={setShowModal2} />
          </Modal>
          <Box mt={2}>
            <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms-&-conditions">Terms & Conditions</Link>
          </Box>
        </Box>
      </Box>
    </UserContent>
  );
};

export default Payments;
