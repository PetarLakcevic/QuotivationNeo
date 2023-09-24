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
import { Link } from 'react-router-dom';
import { paymentLink } from '../../axios/axios';

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

const Payments = () => {
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

  // useEffect(() => {
  //   const url = "https://entegrasyon.asseco-see.com.tr/msu/api/v2";
  //   const data = {
  //     ACTION: 'SESSIONTOKEN',
  //     MERCHANTUSER: 'api.test@payten.com',
  //     MERCHANTPASSWORD: 'Hephr=R4SKNycaLf', // Ubacite pravi password
  //     MERCHANT: 'chipcardtest01',
  //     CUSTOMER: 'customer', // Ovde koristite pravu promenljivu ili vrednost iz forme
  //     SESSIONTYPE: 'PAYMENTSESSION',
  //     MERCHANTPAYMENTID: 'merpID', // Ovde koristite pravu promenljivu ili vrednost
  //     AMOUNT: '750.00',
  //     CURRENCY: 'RSD',
  //     CUSTOMEREMAIL: 'customerEmail', // Ovde koristite pravu promenljivu ili vrednost iz forme
  //     CUSTOMERNAME: 'customerName', // Ovde koristite pravu promenljivu ili vrednost iz forme
  //     CUSTOMERPHONE: 'customerPhone', // Ovde koristite pravu promenljivu ili vrednost iz forme
  //     RETURNURL: 'http://www.dummystore.com/response_from_msu.php',
  //     ORDERITEMS: '[{"code":123456789,"name":"Proizvod1","description":"Opis1","quantity":1,"amount":500.00},{"code":987654321,"name":"Proizvod2","description":"Opis2","quantity":1,"amount":250.00}]',
  //     // Dodajte i ostale opcione promenljive ako su potrebne
  //   };

  //   axios.post(url, data)
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // }, [null]);
  return (
    <UserContainer>
      <UserNavbar />
      <Fade in={loading} timeout={500}>
        <Box
          sx={{
            // display: loading ? 'block' : 'none',
            position: 'fixed',
            top: '0%',
            left: '0%',
            width: '100vw !important',
            // bgcolor: 'rgba(0,0,0,0.5)',
            height: '100vh',
            // right: '0%',
            // bottom: '0%',
            color: '#000',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress
            sx={{
              color: 'black',
            }}
          />
        </Box>
      </Fade>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
          opacity: loading ? 0.5 : 1,
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h5">PREMIUM</Typography>
          <Typography variant="body1">Get unlimited quotes!</Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              p: 4,
              bgcolor: '#fff',
              boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
              height: '100%',
              transition: 'all 0.3s ease',
              mt: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">
              Annual <br /> Subscription
            </Typography>
            <Typography variant="h5">€19.08</Typography>
            <Typography variant="body1">
              €1.59/month,
              <br /> billed annually
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mt: 2 }}>
            We don't store your credit card information.
          </Typography>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Checkbox sx={{ mt: 2 }} onChange={() => setAccepted(!accepted)} />
            <Typography variant="body1" sx={{ mt: 2 }}>
              By checking this box, you agree to our <Link to="/privacy">Privacy Policy</Link> and <Link to="/refund">Refund Policy</Link>.
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              marginInline: 'auto',
              bgcolor: '#478D8A',
            }}
            onPointerDown={handlePaymentLink}
            disabled={!accepted}
          >
            BUY NOW
          </Button>
        </Box>

        <Box mt={2}>
          <Link to="/privacy">Privacy Policy</Link> | <Link to="/refund">Refund Policy</Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            // width: '90vw',
            margin: '5vh auto',
            gap: '2vw',
          }}
        >
          <Link to="http://www.mastercard.com/rs/consumer/credit-cards.html" target="_blank" rel="noreferrer">
            <img
              src={visaSecure}
              alt="visa secure"
              style={{
                width: '30vw',
                objectFit: 'contain',
              }}
            />
          </Link>
          <Link to="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html " target="_blank" rel="noreferrer">
            <img
              src={masterId}
              alt="master id"
              style={{
                width: '30vw',
                objectFit: 'contain',
              }}
            />
          </Link>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // width: '90vw',
            margin: '6vh auto 5vh',
          }}
        >
          <img
            src={maestro}
            alt="maestro"
            style={{
              width: '22%',
              objectFit: 'contain',
            }}
          />
          <img
            src={master}
            alt="master"
            style={{
              width: '22%',
              objectFit: 'contain',
            }}
          />
          <img
            src={dina}
            alt="dina"
            style={{
              width: '22%',
              objectFit: 'contain',
            }}
          />
          <img
            src={visa}
            alt="visa"
            style={{
              width: '22%',
              objectFit: 'contain',
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            // width: '90vw',
            margin: '5vh auto',
          }}
        >
          <a href="https://chipcard.rs/ecommerce/" target="_blank" rel="noreferrer">
            <img
              src={chipcard}
              alt="chipcard"
              style={{
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </a>
        </Box>
      </Box>
      <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
        Wermax Consulting doo | PIB 109871829 | MB 21258385
      </Typography>
    </UserContainer>
  );
};

export default Payments;
