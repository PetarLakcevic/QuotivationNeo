import React, { useEffect, useState, useRef } from 'react';
import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import { getCurrentQuote, getHistory } from '../../axios/axios';
import hope from '../../assets/images/hope.jpg';
import rain from '../../assets/images/rain.jpg';
import sandColor from '../../assets/images/sandcolor.jpg';
import seapink from '../../assets/images/seapink.jpg';
import sky from '../../assets/images/sky.jpg';
import sunset from '../../assets/images/sunset.webp';
import golden from '../../assets/images/golden.jpeg';
import sandbrown from '../../assets/images/sandbrown.jpg';
import sandgray from '../../assets/images/sandgray.jpeg';
import reddoor from '../../assets/images/reddoor.webp';
import pencil from '../../assets/images/pencil.webp';
import road from '../../assets/images/road.jpeg';
import droneview from '../../assets/images/droneview.jpeg';
import logo from '../../assets/images/logo.png';
import { Box } from '@mui/system';
import { Dialog, IconButton, Slide, Typography } from '@mui/material';
import { Download, Email, Facebook, Share, Twitter, WhatsApp } from '@mui/icons-material';
import { toPng } from 'html-to-image';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, ViberIcon, ViberShareButton, WhatsappShareButton } from 'react-share';

import style from './Quote.module.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Quote = ({ account }) => {
  const token = localStorage.getItem('token');
  const imageArray = [rain, sandColor, seapink, sky, sunset, golden, sandbrown, sandgray, reddoor, pencil, road, droneview];
  const [quote, setQuote] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  const canvasRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);

  useEffect(() => {
    getCurrentQuote(token).then(res => {
      setQuote(res.data);
      console.log(res.data);
    });
  }, []);
  const downloadImage = async () => {
    const img = new Image();
    img.src = imageArray[account?.userAdditionalFields?.themePicture - 1];

    img.onload = async () => {
      const quoteImage = await toPng(quoteRef.current);
      const authorImage = await toPng(authorRef.current);

      const quoteImg = new Image();
      quoteImg.src = quoteImage;

      const authorImg = new Image();
      authorImg.src = authorImage;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(quoteImg, (canvas.width - quoteImg.width) / 2, (canvas.height - quoteImg.height) / 2);
      ctx.drawImage(authorImg, canvas.width - authorImg.width - 10, canvas.height - authorImg.height - 10);

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'quote.png';
      link.click();
    };
  };

  const shareImage = async () => {
    const img = new Image();
    img.src = imageArray[account?.userAdditionalFields?.themePicture - 1];

    img.onload = async () => {
      const quoteImage = await toPng(quoteRef.current);
      const authorImage = await toPng(authorRef.current);

      const quoteImg = new Image();
      quoteImg.src = quoteImage;

      const authorImg = new Image();
      authorImg.src = authorImage;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);
      ctx.drawImage(quoteImg, (canvas.width - quoteImg.width) / 2, (canvas.height - quoteImg.height) / 2);
      ctx.drawImage(authorImg, canvas.width - authorImg.width - 10, canvas.height - authorImg.height - 10);

      const link = canvas.toDataURL('image/png');
      const twitterUrl = `https://twitter.com/intent/tweet?text=${quote?.text}&url=${encodeURIComponent(quote?.url)}&hashtags=quotivation`;
      const twitterShareUrl = `https://twitter.com/share?url=${encodeURIComponent(link)}&hashtags=quotivation`;

      window.open(twitterShareUrl);
    };
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
        }}
      >
        <UserNavbar home={true} />{' '}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          backgroundImage: `url(${imageArray[account?.userAdditionalFields?.themePicture - 1]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: '100%',
            margin: '0 auto',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: 'white',
                textShadow: '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                textAlign: 'center',
                width: '100%',
                fontSize: '1.9rem',
              }}
              ref={quoteRef}
            >
              {quote?.text}  I'm a greater believer in luck, and I find the harder I work, the more I have of it.

            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                textShadow: '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.5), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.3)',
                textAlign: 'center',
                width: '100%',
                fontStyle: 'italic',
              }}
              ref={authorRef}
            >
              {quote?.author?.name}
              {/* Author */}
            </Typography>
          </Box>
          {/* <Box
            sx={{
              position: 'absolute',
              bottom: '0%',
              right: '0%',
              transform: 'translate(-20%, -50%)',
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textShadow: '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.5), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.3)',
                textAlign: 'center',
                width: '100%',
                wordBreak: 'break-all',
                fontStyle: 'italic',
              }}
              ref={authorRef}
            >
              {quote?.author?.name}
            </Typography>
          </Box> */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              position: 'absolute',
              bottom: '0%',
              left: '50%',
              transform: 'translate(-50%, -10%)',
              padding: '0 16px 0 10px',
            }}
          >
            <Box>
              <img
                src={logo}
                alt="logo"
                style={{
                  height: '42px',
                }}
                className={style.logoEngraved}
              />
            </Box>
            <Box>
              <IconButton
                sx={{
                  height: '40px', // Dodaj visinu IconButton-a
                  width: '40px', // Dodaj širinu IconButton-a
                  color: 'hsl(144, 25%, 57%)',
                  backgroundColor: 'white',
                  boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                }}
                aria-label="share"
                component="span"
                onPointerDown={() => setOpenDialog(true)}
              >
                <Share />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          TransitionComponent={Transition}
          maxWidth="sm"
          fullWidth
          sx={{
            position: 'fixed', // Promenite position na 'fixed'
            top: 'auto', // Dodajte ovo svojstvo kako bi dijalog bio na dnu ekrana
            bottom: 0,
            borderTopLeftRadius: '16px',
            borderTopRightRadius: '16px',
            '& .MuiDialog-paper': {
              margin: '0  !important',
              width: '100% !important',
              borderTopLeftRadius: '1rem',
              borderTopRightRadius: '1rem',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
              backgroundColor: 'white',
              padding: '2rem 1rem',
            }}
          >
            <IconButton
              sx={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
              }}
            >
              <Download onPointerDown={downloadImage} />
            </IconButton>

            <TwitterShareButton
              url={'https://quotivation.io/'}
              title={`"${quote?.text?.length > 200 ? quote?.text.slice(0, 200) + '...' : quote?.text}" by ${
                quote?.author?.name
              }. View more at`}
              style={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                aspectRatio: '1/1',
                color: 'grey',
                borderRadius: '50%',
                padding: '0.5rem',
              }}
            >
              <Twitter />
            </TwitterShareButton>

            {/* <FacebookShareButton
              url={'https://quotivation.io/'}
              quote={quote?.text}
              hashtag={'#quotivation'}
              style={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                aspectRatio: '1/1',
                color: 'grey',
                borderRadius: '50%',
                padding: '0.5rem',
              }}
            >
              <Facebook />
            </FacebookShareButton> */}

            <EmailShareButton
              url={'https://quotivation.io/'}
              subject={quote?.text}
              body={`"${quote?.text}" by ${quote?.author?.name}. View more at https://quotivation.io/`}
              style={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                aspectRatio: '1/1',
                color: 'grey',
                borderRadius: '50%',
                padding: '0.5rem',
              }}
            >
              <Email />
            </EmailShareButton>

            <WhatsappShareButton
              url={'https://quotivation.io/'}
              title={`"${quote?.text}" by ${quote?.author?.name}. View more at `}
              style={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                aspectRatio: '1/1',
                color: 'grey',
                borderRadius: '50%',
                padding: '0.5rem',
              }}
            >
              <WhatsApp />
            </WhatsappShareButton>
            {/* <IconButton
              sx={{
                boxShadow: '0 0 10px 1px rgba(0,0,0,0.5)',
                aspectRatio: '1/1',
              }}
            >
              <ViberShareButton url={'https://quotivation.io/'} title={quote?.text} image={'https://quotivation.io/images/quotivation.png'}>
                <ViberIcon />
              </ViberShareButton>
            </IconButton> */}
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default Quote;
