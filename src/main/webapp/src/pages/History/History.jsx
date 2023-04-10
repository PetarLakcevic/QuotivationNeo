import { Box, ImageList, ImageListItem, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import UserContainer from '../../components/UserContainer';
import UserContent from '../../components/UserContent';
import UserNavbar from '../../components/UserNavbar';
import hope from '../../assets/images/hope.jpg';
import rain from '../../assets/images/rain.jpg';
import sandColor from '../../assets/images/sandcolor.jpg';
import seapink from '../../assets/images/seapink.jpg';
import sky from '../../assets/images/sky.jpg';

const History = ({ account }) => {
  const imageArray = [hope, rain, sandColor, seapink, sky];
  const [history, setHistory] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);

  const historyTest = [
    {
      id: 1,
      quote: 'test',
      author: 'test',
    },
    {
      id: 2,
      quote: 'test56464564',
      author: 'test',
    },
    {
      id: 3,
      quote: 'test',
      author: 'test',
    },
    {
      id: 4,
      quote: 'test',
      author: 'test',
    },
  ]

  useEffect(() => {
    // getHistory().then(response => {
    //   setHistory(response.data);
    // });
    setHistory(historyTest);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setOffsetX(e.touches[0].clientX - touchStartX);
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (delta > 100) {
      setCurrentImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (delta < -100) {
      setCurrentImageIndex((prevIndex) => Math.min(prevIndex + 1, history.length - 1));
    }
    setOffsetX(0);
  };

  const toggleZoom = () => setZoomed(!zoomed);


  return (
    <UserContainer>
      <UserNavbar />
      <UserContent>
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          swipeable
          style={{
            flex: 1,
          }}
        >
          {history.map((item, index) => (
       <Box
       key={index}
       sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         position: 'relative',
         overflow: 'hidden',
        //  borderRadius: '10px',
        //  boxShadow: '0 0 1px 0 rgba(0, 0, 0, 0.5)',
         height: '80%', // Promenite visinu ovde
         width: '100%',
       }}
     >
       <img
         src={item.image || imageArray[account?.userAdditionalFields?.themePicture - 1]}
         alt={item.title}
         style={{
           maxWidth: '100%',
           maxHeight: '100%',
           objectFit: 'contain',
         }}
       />
       <Typography variant="h6" sx={{ position: 'absolute', color: 'white' }}>
         {item.quote}
       </Typography>
     </Box>
          ))}
        </Carousel>
      </UserContent>
    </UserContainer>
  );
};

export default History;