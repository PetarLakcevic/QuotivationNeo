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

  // useEffect(() => {
  //   const url = "https://entegrasyon.asseco-see.com.tr/msu/api/v2";
  //   const data = {
  //     ACTION: 'SESSIONTOKEN',
  //     MERCHANTUSER: 'nenad.pavlovic@asseco-see.rs',
  //     MERCHANTPASSWORD: '********', // Ubacite pravi password
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        {/* <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '100%' }}> */}
        {/* <Step> */}
        {/* <StepLabel
              onPointerDown={() => {
                setActiveStep(0);
              }}
              StepIconComponent={props => <CustomStepIcon {...props} icon={<LocalOffer />} />}
            >
              Annual Plan
            </StepLabel> */}
        {/* <StepContent> */}
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
          <Button
            variant="contained"
            sx={{
              mt: 2,
              marginInline: 'auto',
              bgcolor: '#478D8A',
            }}
            onPointerDown={() => setActiveStep(1)}
          >
            BUY NOW
          </Button>
        </Box>
        {/* </StepContent> */}
        {/* </Step> */}

        {/* <Step>
            <StepLabel
              onPointerDown={() => {
                setActiveStep(1);
              }}
              StepIconComponent={props => <CustomStepIcon {...props} icon={<CreditCard />} />}
            >
              Payment details
            </StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <form onSubmit={handleSubmit}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      // minHeight: '100vh',
                      width: 'min(100vw, 300px)',
                      margin: '0 auto',
                      gap: '1rem',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <TextField
                        id="firstName"
                        label="First name"
                        variant="outlined"
                        color="primary"
                        inputRef={firstNameRef}
                        onBlur={checkFirstName}
                        onInput={checkFirstName}
                        error={firstNameError}
                        helperText={firstNameError}
                        sx={{
                          width: '100%',
                          //   marginTop: '2rem',
                        }}
                      />
                      <TextField
                        id="lastName"
                        label="Last name"
                        variant="outlined"
                        color="primary"
                        inputRef={lastNameRef}
                        onBlur={checkLastName}
                        onInput={checkLastName}
                        error={lastNameError}
                        helperText={lastNameError}
                        sx={{
                          width: '100%',
                          //   marginTop: '2rem',
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                    <TextField
                      id="cardNumber"
                      label="Card number"
                      placeholder="1234 5674 9012 3456"
                      variant="outlined"
                      color="primary"
                      inputRef={cardNumberRef}
                      onBlur={checkCardNumber}
                      onInput={() => {
                        setCardNumberError('');
                        // remove all non-digits or spaces
                        let value = cardNumberRef.current.value.replace(/[^0-9 ]/g, '');
                        // remove all spaces
                        value = value.replace(/ /g, '');
                        // add a space after every fourth digit
                        value = value.replace(/(\d{4})/g, '$1 ').trim();
                        // limit to 16 digits plus 3 spaces
                        cardNumberRef.current.value = value.slice(0, 19);
                      }}
                      error={cardNumberError}
                      helperText={cardNumberError}
                      sx={{
                        width: '100%',
                      }}
                    />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, width: '100%' }}>
                      <FormControl fullWidth>
                        <InputLabel>Month</InputLabel>
                        <Select
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          label="Month"
                          sx={{
                            width: '100%',
                            minWidth: '60px',
                          }}
                        >
                          {months.map((month, index) => (
                            <MenuItem key={index} value={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl fullWidth>
                        <InputLabel>Year</InputLabel>
                        <Select
                          value={selectedYear}
                          onChange={handleYearChange}
                          fullWidth
                          label="Year"
                          sx={{
                            width: '100%',
                            minWidth: '80px',
                          }}
                        >
                          {years.map((year, index) => (
                            <MenuItem key={index} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>{' '}
                    <TextField
                      id="cardCVC"
                      label="Card CVC"
                      variant="outlined"
                      color="primary"
                      inputRef={cardCVCRef}
                      onBlur={checkCardCVC}
                      placeholder="123"
                      fullWidth
                      onInput={() => {
                        setCardCVCError('');
                        // allow only numbers 3 digits long
                        cardCVCRef.current.value = cardCVCRef.current.value.replace(/[^0-9]/g, '').slice(0, 3);
                      }}
                      error={cardCVCError}
                      helperText={cardCVCError}
                      // sx={{
                      //   width: '100%',
                      //     marginTop: '2rem',
                      // }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        mt: 2,
                        marginInline: 'auto',
                        bgcolor: '#478D8A',
                      }}
                    >
                      Continue
                    </Button>
                  </Box>
                </form>
              </Box>
            </StepContent>
          </Step> */}
        {/* <Step>
            <StepLabel StepIconComponent={props => <CustomStepIcon {...props} icon={<SystemSecurityUpdateGood />} />}>Finish</StepLabel>
            <StepContent>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5">Thank you for your payment!</Typography>
                <Typography variant="body1">You will receive an email with your receipt.</Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    marginInline: 'auto',
                    bgcolor: '#478D8A',
                  }}
                  onPointerDown={() => setActiveStep(0)}
                >
                  Go back
                </Button>
              </Box>
            </StepContent>
          </Step> */}
        {/* </Stepper> */}
        <Box mt={2}>
          <Link to="/privacy-policy">Privacy Policy</Link> | <Link to="/refund">Refund Policy</Link> 
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            // width: '90vw',
            margin: '5vh auto',
          }}
        >
          <a
            href="http://www.mastercard.com/rs/consumer/credit-cards.html"
            target="_blank"
            rel="noreferrer"
            //   style={{
            //       width: '50vw',
            //   // objectFit: 'contain',
            //       display: 'block',
            // }
            // }
          >
            <img
              src={visaSecure}
              alt="visa secure"
              style={{
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </a>
          <a href="https://rs.visa.com/pay-with-visa/security-and-assistance/protected-everywhere.html " target="_blank" rel="noreferrer">
            <img
              src={masterId}
              alt="master id"
              style={{
                width: '50%',
                objectFit: 'contain',
              }}
            />
          </a>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90vw',
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
            width: '90vw',
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
    </UserContainer>
  );
};

export default Payments;
