import React from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Typography } from '@mui/material';
import visaSecure from '../../assets/images/Logotipi/Visa Secure/visa-secure_blu_72dpi.png';
import masterId from '../../assets/images/Logoi/Master Secure crni.svg';
import maestro from '../../assets/images/Logotipi/Maestro Card/Maestro - White and Light Backgrounds/ms_vrt_pos.svg';
import master from '../../assets/images/Logoi/Mastercard black.svg';
import dina from '../../assets/images/Logoi/dinacard-new.svg';
import visa from '../../assets/images/Logoi/Visa New 2021.svg';
import chipcard from '../../assets/images/Logotipi/ChipCard LOGO 2021_rgb.png';


const Privacy = () => {
  const contactsEng = [
    {
      title: 'Legal Name',
      text: 'Wermax Consulting doo',
    },
    {
      title: 'Address',
      text: 'Hiladnarska 21, Beograd, Srbija',
    },
    {
      title: 'Company Registration Number',
      text: '21258385',
    },
    {
      title: 'Tax Number',
      text: '109871829',
    },
    {
      title: 'Website',
      text: 'https://quotivation.io/',
    },
    {
      title: 'Phone',
      text: '+38163 331 339',
    },
    {
      title: 'Activity',
      text: 'Other health protection',
    },
    {
      title: 'Activity Code',
      text: '8690',
    },
    {
      title: 'Email',
      text: 'quotivation.app@gmail.com',
    },
  ];
  return (
    <UserContainer>
     {/* {account} <UserNavbar /> */}
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
          }}
        >
          <Typography variant="h4">Privacy Policy for Quotivation App</Typography>
          <Typography variant="h5">Effective Date: July 6, 2023</Typography>

          <Typography variant="h6">Introduction</Typography>
          <Typography variant="body1">
            Welcome to the Quotivation App ("We", "Our", "Us"). We respect the privacy concerns of all users of our application. We believe
            it is important you understand how we treat the information we receive from you, to this effect, we stand by the following
            privacy principles.
          </Typography>
          <Typography variant="h6">Personal Information We Collect</Typography>
          <Typography variant="body1">
            The only Personal Information we collect is your email address when you sign up for our service. "Personal Information" refers
            to data that can be used to identify you directly or indirectly. In our case, this is limited to your email address. <br />
            <br />
            We do not collect any other Personal Information about you, and we do not collect or process any non-Personal Information, like
            IP addresses, cookies, or usage data.
          </Typography>
          <Typography variant="h6">How We Use Your Personal Information</Typography>
          <Typography variant="body1">
            We use your email address only for the purpose of sending you motivational quotes, updates about our service, and communication
            related to your account. We do not process your email address in any other way. We do not use your email address for marketing
            purposes unless you explicitly agree to receive marketing materials.
          </Typography>
          <Typography variant="h6">How We Share Your Personal Information</Typography>
          <Typography variant="body1">
            We do not share, sell, rent, or trade your Personal Information collected through the Quotivation App with third parties. Your
            privacy is crucial to us, and your email address will only be used for the purposes outlined in this Privacy Policy.
          </Typography>
          <Typography variant="h6">Data Security</Typography>
          <Typography variant="body1">
            We take the security of your Personal Information seriously and use appropriate technical and organizational measures to protect
            your Personal Information against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
            However, please note that no system is ever completely secure.
          </Typography>
          <Typography variant="h6">Changes to the Privacy Policy</Typography>
          <Typography variant="body1">
            We may update our Privacy Policy from time to time. The updated version will be indicated by an updated “Effective Date” and the
            updated version will be effective as soon as it is accessible.
          </Typography>
          <Typography variant="h6">Contact Information</Typography>
          <Typography variant="body1">
            If you have questions or comments about this policy, email us at{' '}
            <a
              href="mailto:quotivation.app@gmail.com"
              style={{
                textDecoration: 'none',
              }}
            >
              quotivation.app@gmail.com
            </a>
            <br /> <br />
            Thank you for choosing Quotivation. We value your trust and privacy.
          </Typography>
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
      <Typography variant="h5">{ 'Contact'}</Typography>
          <Box>
            {contactsEng.map((item, index) => (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 1,
                  width: '100%',
                  //   textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}:{' '}
                </Typography>
                <Typography variant="body1"> {item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        
      </UserContent>
    </UserContainer>
  );
};

export default Privacy;
