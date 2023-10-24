import React, { useEffect, useState } from 'react';
import UserContainer from '../../components/UserContainer';
import UserNavbar from '../../components/UserNavbar';
import UserContent from '../../components/UserContent';
import { Box, Select, Typography } from '@mui/material';

const Terms = ({ account }) => {
  const [language, setLanguage] = useState('en');
  // const [planText, setPlanText] = useState('');

  const premiumText = '';
  const trialText = '';
  const trialExpiredText = '';

  // useEffect(() => {
  //   const expiryDate = new Date(account?.paymentTokenExpiry).toLocaleDateString();
  //   const registrationDate = new Date(account?.registrationDate);
  //   const trialEndDate = new Date(registrationDate);
  //   trialEndDate.setDate(trialEndDate.getDate() + 7);
  //   const trialEndDateString = trialEndDate.toLocaleDateString();

  //   const nonRenewalNotice =
  //     ' Your subscription will not be automatically renewed. You will be notified one week before your renewal options expire.';
  //   const cancellationNotice = '  You may cancel your subscription within 7 days of purchase.';
  //   const cardInfoNotice = ' We do not store your card information.';
  //   setPlanText(`Your trial period has expired. Consider upgrading to premium.${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`);
  //   if (account?.hasPremium) {
  //     setPlanText(`You have a premium subscription active until the ${expiryDate}. ${cancellationNotice} ${nonRenewalNotice}  ${cardInfoNotice}`);
  //   } else if (!account?.hasPremium && account?.hasTrial) {
  //     setPlanText(
  //       `You don't have a premium account. Your trial period will end on the ${trialEndDateString}. Consider upgrading to premium. ${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`
  //     );
  //   } else if (!account?.hasPremium && !account?.hasTrial) {
  //     setPlanText(`Your trial period has expired. Consider upgrading to premium.${cancellationNotice} ${nonRenewalNotice} ${cardInfoNotice}`);
  //   }
  // }, [account]);
  const dataEng = [
    {
      title: 'PRODUCT DESCRIPTION',
      additional: [
        {
          title: '1. Explore Plan (Free)',
          content: [
            {
              title: '1.1. Introduction',
              text: 'The Explore Plan is a complimentary offering designed to introduce users to the world of Quotivation. Perfect for individuals looking to periodically rejuvenate their spirit.',
            },
            {
              title: '1.2. Offering',
              text: 'During the first week of subscription, users will receive 2 daily quotes to uplift their spirit. Post the introductory week, users will be presented with a special quote every 3 days, a gentle reminder of the immense power within.',
            },
          ],
        },
        {
          title: '2. Premium Plan (Paid)',
          content: [
            {
              title: '2.1. Introduction',
              text: 'For those seeking a consistent and regular source of inspiration, the Premium Plan has been meticulously crafted. It’s not just about the frequency but about ensuring that every day comes with its own set of powerful words.',
            },
            {
              title: '2.2. Offering',
              text: 'An annual subscription grants users 2 handpicked inspirational quotes daily, ensuring a continuous flow of positivity. Users gain exclusive access to their personal quote history, ensuring cherished words are never lost.',
            },
            {
              title: '2.3. Pricing',
              text: 'The total cost for an annual subscription to the Premium Plan is 2,000.00 RSD.',
            },
          ],
        },
      ],
    },
    {
      title: 'CURRENCY CONVERSION STATEMENT',
      text: 'All payments will be made in the local currency of the Republic of Serbia – dinar (RSD). For an informative display of prices in other currencies, a rate of 117.2 RSD = 1 EUR is used. The amount your card will be charged might be expressed in your local currency through a conversion rate used by card companies, which is unknown to us at the time of the transaction. As a result of this conversion, there might be a slight difference from the original price listed on our website. Thank you for your understanding.',
    },
    {
      title: 'PRODUCT DELIVERY',
      text: 'The premium account is accessible immediately upon payment. Starting today, you will receive two quotes every day.',
    },
    {
      title: 'REFUND POLICY',
      text: 'Refunds must be requested within 7 days of purchase by contacting quotivation.info@gmail.com with a valid reason. Refunds are granted under any circumstances if claimed within the first 7 days of purchase.',
    },
    {
      title: 'USER PRIVACY PROTECTION',
      text: 'On behalf of Quotivation.io, we commit to protecting the privacy of all our customers. We only collect essential, basic customer/user data and information necessary for business and user communication in line with good business practices to provide quality service. We offer customers the choice, including the decision to unsubscribe from marketing campaign mailing lists. All customer/user data is strictly confidential and only accessible to employees who need this information to perform their duties. All Quotivation.io employees are responsible for adhering to privacy protection principles.',
    },
    {
      title: 'CONFIDENTIAL TRANSACTION DATA PROTECTION',
      text: 'When entering payment card details, confidential information is transmitted over a public network in a protected (encrypted) form using the SSL protocol and the PKI system, as the most advanced cryptographic technology currently available. The payment card processor, ChipCard a.d. Beograd, guarantees data security during the purchase, so the entire payment process is done on the ChipCard pages. Our system never has access to your card details at any point.',
    },
    {
      title: 'REFUND PROCEDURE',
      text: 'In the event of returning goods and refunding a customer who previously paid using a payment card, either partially or in full, regardless of the reason for the return, Quotivation.io is obliged to make the refund exclusively through VISA, EC/MC, and Maestro payment methods.',
    },
    {
      title: 'VAT INFORMATION',
      text: 'Please note that Wermax Consulting doo is not in the VAT system.',
    },
  ];

  const dataSrb = [
    {
      title: 'OPIS PROIZVODA',
      additional: [
        {
          title: '1. Istraživački paket (Besplatno)',
          content: [
            {
              title: '1.1. Uvod',
              text: 'Istraživački paket je besplatna ponuda napravljena kako bi korisnike upoznala sa svetom Quotivation-a. Savršen za pojedince koji žele povremeno da osveže svoj duh.',
            },
            {
              title: '1.2. Ponuda',
              text: 'Tokom prve nedelje pretplate, korisnici će svakodnevno dobijati 2 inspirativna citata koji će ih podići. Nakon uvodne nedelje, korisnicima će svaka 3 dana biti predstavljen poseban citat, blag podsetnik na ogromnu snagu koja leži u njima.',
            },
          ],
        },
        {
          title: '2. Premium paket (Plaćeno)',
          content: [
            {
              title: '2.1. Uvod',
              text: 'Za one koji traže konstantan i redovan izvor inspiracije, Premium paket je pažljivo osmišljen. Ne radi se samo o frekvenciji, već o tome da svaki dan donosi svoj set moćnih reči.',
            },
            {
              title: '2.2. Ponuda',
              text: 'Godišnja pretplata pruža korisnicima 2 pažljivo odabrana inspirativna citata dnevno, obezbeđujući neprekidan tok pozitivnosti. Korisnici dobijaju ekskluzivan pristup svojoj ličnoj istoriji citata, čime se osigurava da dragocene reči nikada ne budu izgubljene.',
            },
            {
              title: '2.3. Cena',
              text: 'Ukupna cena za godišnju pretplatu na Premium paket iznosi 2,000.00 RSD.',
            },
          ],
        },
      ],
    },

    {
      title: 'IZJAVA O KONVERZIJI',
      text: 'Sva plaćanja će biti izvršena u lokalnoj valuti Republike Srbije – dinar (RSD). Za informativni prikaz cena u drugim valutama koristi se kurs (117.2 RSD = 1 EUR). Iznos koji će biti zadužen na vašoj platnoj kartici može biti izražen u vašoj lokalnoj valuti kroz konverziju prema kursu koji koriste kartičarske organizacije, a koji nam u trenutku transakcije ne može biti poznat. Kao rezultat ove konverzije može postojati neznatna razlika od originalne cene navedene na našem sajtu. Hvala vam na razumevanju.',
    },
    {
      title: 'DOSTAVA PROIZVODA',
      text: 'Premium nalog je dostupan odmah nakon plaćanja.',
    },
    {
      title: 'POLITIKA REKLAMACIJA',
      text: 'Refundacija mora biti zatražena u roku od 7 dana od dana kupovine tako što ćete kontaktirati quotivation.info@gmail.com sa razlogom. Refundacija je dozvoljena u svim okolnostima ako se zahteva unutar prvih 7 dana od kupovine.',
    },
    {
      title: 'ZAŠTITA PRIVATNOSTI KORISNIKA',
      text: ' U ime Quotivation.io obavezujemo se da ćemo čuvati privatnost svih naših kupaca. Prikupljamo samo neophodne, osnovne podatke o kupcima/korisnicima i podatke potrebne za poslovanje i informisanje korisnika u skladu sa dobrim poslovnim običajima i u cilju pružanja kvalitetne usluge. Dajemo kupcima mogućnost izbora, uključujući odluku o brisanju sa mailing lista koje se koriste za marketinške kampanje. Svi podaci o korisnicima/kupcima se strogo čuvaju i dostupni su samo zaposlenima kojima su ti podaci potrebni za obavljanje posla.',
    },
    {
      title: 'ZAŠTITA POVERLJIVIH PODATAKA O TRANSAKCIJI',
      text: 'Prilikom unošenja podataka o platnoj kartici, poverljive informacije se prenose putem javne mreže u zaštićenoj (kriptovanoj) formi upotrebom SSL protokola i PKI sistema, kao trenutno najnaprednije kriptografske tehnologije. Sigurnost podataka prilikom kupovine garantuje procesor platnih kartica ChipCard a.d Beograd, tako da se kompletan proces naplate obavlja na stranicama ChipCard-a. Niti jednog trenutka podaci o platnoj kartici nisu dostupni našem sistemu.',
    },
    {
      title: 'POVRAĆAJ SREDSTAVA',
      text: 'U slučaju vraćanja robe i povraćaja sredstava kupcu koji je prethodno platio nekom od platnih kartica, delimično ili u celosti, i bez obzira na razlog vraćanja, Quotivation.io je u obavezi da povraćaj sredstava vrši isključivo preko VISA, EC/MC, i Maestro metoda plaćanja.',
    },
    {
      title: 'INFORMACIJE O PDV-U',
      text: 'Napomena: Wermax Consulting doo nije u sistemu PDV-a.',
    },
  ];

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

  const contactsSrb = [
    {
      title: 'Pravno ime',
      text: 'Wermax Consulting doo',
    },
    {
      title: 'Adresa',
      text: 'Hiladnarska 21, Beograd, Srbija',
    },
    {
      title: 'Matični broj',
      text: '21258385',
    },
    {
      title: 'Poreski broj',
      text: '109871829',
    },
    {
      title: 'Web stranica',
      text: 'https://quotivation.io/',
    },
    {
      title: 'Telefon',
      text: '+38163 331 339',
    },
    {
      title: 'Delatnost',
      text: 'Other health protection',
    },
    {
      title: 'Šifra delatnosti',
      text: '8690',
    },
    {
      title: 'E-mai',
      text: 'quotivation.app@gmail.com',
    },
  ];

  const [data, setData] = useState(dataEng);
  const [contacts, setContacts] = useState(contactsEng);

  useEffect(() => {
    if (language === 'en') {
      setData(dataEng);
      setContacts(contactsEng);
    } else {
      setData(dataSrb);
      setContacts(contactsSrb);
    }
  }, [language]);
  return (
    <UserContainer>
      {account && <UserNavbar />}
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
          <Select native defaultValue="en" sx={{ width: '100%' }} onChange={e => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="sr">Srpski</option>
          </Select>
          <Typography variant="h4">{language === 'en' ? 'Terms and Conditions' : 'Uslovi korišćenja'}</Typography>
          {data.map((item, index) => (
            <>
              <Typography variant="h6">{item?.title}</Typography>
              <Typography variant="body1">{item?.text}</Typography>
              <Box>
                {item?.additional?.map((item, index) => (
                  <>
                    <Typography variant="h6" mb={3}>
                      {item?.title}
                    </Typography>
                    {item?.content?.map((item, index) => (
                      <>
                        <Typography variant="body1" mt={3}>
                          {item?.title}
                        </Typography>
                        <Typography variant="body1">{item?.text}</Typography>
                      </>
                    ))}
                  </>
                ))}
              </Box>
              <Typography variant="body1">{item?.desc}</Typography>
            </>
          ))}
          <Typography variant="h5">{language === 'en' ? 'Contact' : 'Kontakt'}</Typography>
          <Box>
            {contacts.map((item, index) => (
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

export default Terms;
