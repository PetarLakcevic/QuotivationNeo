import React, { useState, useRef } from 'react';
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
    const regex = /^[0-9]{16}$/;
    if (cardNumberRef.current.value === '') {
      setCardNumberError('Card number is required');
      return false;
    } else if (!regex.test(cardNumberRef.current.value)) {
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
        <Stepper activeStep={activeStep} orientation="vertical" sx={{ width: '100%' }}>
          <Step>
            <StepLabel StepIconComponent={props => <CustomStepIcon {...props} icon={<LocalOffer />} />}>Choose plan</StepLabel>
            <StepContent>
              <Box
                sx={{
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5">Choose right plan for you</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      p: 2,
                      bgcolor: '#fff',
                      margin: '0 auto',
                      //   boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.25)',
                      //   borderRadius: '10px',
                      //   width: 'min(100vw, 300px)',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        p: 2,
                        bgcolor: planType === 'yearly' ? '#fff' : '#eee',
                        boxShadow: planType === 'yearly' ? '0px 0px 10px 0px rgba(0,0,0,0.25)' : 'none',
                        height: '100%',
                        aspectRatio: '1/1',
                        transition: 'all 0.3s ease',
                      }}
                      onPointerDown={() => setPlanType('yearly')}
                    >
                      <Typography variant="h6">Yearly</Typography>
                      <Typography variant="h5">1.59€</Typography>
                      {/* <Typography
                        variant="body1"
                        sx={{
                          textDecoration: 'line-through',
                          color: '#999',
                        }}
                      >
                        36€
                      </Typography> */}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        p: 2,
                        bgcolor: planType === 'monthly' ? '#fff' : '#eee',
                        boxShadow: planType === 'monthly' ? '0px 0px 10px 0px rgba(0,0,0,0.25)' : 'none',
                        height: '100%',
                        aspectRatio: '1/1',
                        transition: 'all 0.3s ease',
                      }}
                      onPointerDown={() => setPlanType('monthly')}
                    >
                      <Typography variant="h6">Monthly</Typography>

                      <Typography variant="h5">3€</Typography>
                    </Box>
                  </Box>{' '}
                </Box>{' '}
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    marginInline: 'auto',
                    bgcolor: '#478D8A',
                  }}
                  onPointerDown={() => setActiveStep(1)}
                >
                  Continue
                </Button>
              </Box>
            </StepContent>
          </Step>
          <Step>
            <StepLabel StepIconComponent={props => <CustomStepIcon {...props} icon={<CreditCard />} />}>Payment details</StepLabel>
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
                    {/* <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}> */}
                    <TextField
                      id="cardNumber"
                      label="Card number"
                      variant="outlined"
                      color="primary"
                      inputRef={cardNumberRef}
                      onBlur={checkCardNumber}
                      onInput={() => {
                        setCardNumberError('');
                        // allow only numbers 16 digits long
                        cardNumberRef.current.value = cardNumberRef.current.value.replace(/[^0-9]/g, '').slice(0, 16);
                      }}
                      error={cardNumberError}
                      helperText={cardNumberError}
                      sx={{
                        width: '100%',
                        // marginTop: '2rem',
                      }}
                    />
                    {/* </Box> */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
                      <FormControl>
                        <InputLabel>Mesec</InputLabel>
                        <Select
                          value={selectedMonth}
                          onChange={handleMonthChange}
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
                      <FormControl>
                        <InputLabel>Godina</InputLabel>
                        <Select
                          value={selectedYear}
                          onChange={handleYearChange}
                          fullWidth
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
                      <TextField
                        id="cardCVC"
                        label="Card CVC"
                        variant="outlined"
                        color="primary"
                        inputRef={cardCVCRef}
                        onBlur={checkCardCVC}
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
                    </Box>
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
          </Step>
          <Step>
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
          </Step>
        </Stepper>
      </Box>
    </UserContainer>
  );
};

export default Payments;