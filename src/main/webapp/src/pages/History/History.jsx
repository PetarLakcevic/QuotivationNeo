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
import { getHistory } from '../../axios/axios';

const History = ({ account }) => {
  const imageArray = [hope, rain, sandColor, seapink, sky];
  const [history, setHistory] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openCarousel, setOpenCarousel] = useState(false);
  const [swipeStart, setSwipeStart] = useState({ x: 0, y: 0 });
  const [verticalOffset, setVerticalOffset] = useState(0);

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
    {
      id: 5,
      quote: 'test',
      author: 'test',
    },
  ]

  useEffect(() => {
     getHistory().then(response => {
       setHistory(response.data);
     });
    // setHistory(historyTest);
  }, []);


  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
    setTimeout(() => {
      setOpenCarousel(true);
    }, 200);
  };

  const handleSwipeMove = (event) => {
    if (swipeStart) {
      const clientY = event.clientY || event.touches[0].clientY;
      const deltaY = clientY - swipeStart.y;
      setVerticalOffset(deltaY);
    }
  };

  const handleSwipeStart = (event) => {
    const clientX = event.clientX || event.touches[0].clientX;
    const clientY = event.clientY || event.touches[0].clientY;
    setSwipeStart({ x: clientX, y: clientY });
    setVerticalOffset(0);
  };
  
  const handleSwipeEnd = (event) => {
    const clientX = event.clientX || event.changedTouches[0].clientX;
    const clientY = event.clientY || event.changedTouches[0].clientY;
  
    const deltaY = clientY - swipeStart.y;
    const deltaX = clientX - swipeStart.x;
    const isVerticalSwipe = Math.abs(deltaY) > Math.abs(deltaX) * 1.5; // Dodajte faktor 1.5
  
    if (isVerticalSwipe) {
      setVerticalOffset(0);
      console.log('vertical swipe');
      setTimeout(() => {
        setOpenCarousel(false);
      }, 200);
    }
  };
  




  return (
    <UserContainer>
      <UserNavbar />
      <UserContent> 
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridGap: '1rem',
        }}
        >
        {history.length > 0 && history.map((item, index) => (
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
              // height: '80%', // Promenite visinu ovde
              width: '100%',  

            }} 
            onPointerDown={() => handleImageClick(index)}
          >
            <img
              src={item.image || imageArray[account?.userAdditionalFields?.themePicture - 1]}
              alt={item.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
               <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
              <Typography variant="h6" sx={{ color: 'white',
                textShadow:
                  '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                textAlign: 'center',
                width: '100%',
                fontSize: '0.7rem',
                // wordBreak: 'break-all',
              }}>
                
              {item.text}
              </Typography>
    
              </Box>
          </Box>
        ))}
        </Box>
    
      </UserContent> 
      <Box sx={{
        position: 'absolute',
        zIndex: openCarousel ? 100 : -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: openCarousel ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease-in-out',
        
      }}>
      {openCarousel && history.length > 1 ?  (
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          swipeable
          style={{
            flex: 1,
          }}
            selectedItem={currentImageIndex}
            onSwipeStart={handleSwipeStart}
            onSwipeEnd={handleSwipeEnd}
            onSwipeMove={handleSwipeMove}
        >
          {history.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                // overflow: 'hidden',
                width: '100%',
                padding: '0 10px',
                transform: `translateY(${verticalOffset}px)`,
                transition: verticalOffset ? 'none' : 'all 0.1s ease-in-out',
              }}
            >
              <img
                src={item.image || imageArray[account?.userAdditionalFields?.themePicture - 1]}
                alt={item.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '10px',
                  
                }}
              />
                  <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
              <Typography variant="h6" sx={{  color: 'white',
                textShadow:
                  '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                textAlign: 'center',
                width: '100%', }}>
                {item.text}
                </Typography></Box>
                <Box
           sx={{
            position: 'absolute',
            bottom: '0%',
            right: '0%',
            transform: 'translate(-20%, -50%)',
          }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    textShadow:
                      '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {item.author.name}
                </Typography>
              </Box>
            </Box>
          ))}
          </Carousel>)
        :  (
          <Box
            key={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              padding: '0 10px',
              transform: `translateY(${verticalOffset}px)`,
              opacity: openCarousel ? 1 : 0,
              // transition: 'all 0.3s ease-in-out',
              transition: verticalOffset ? 'none' : 'all 0.1s ease-in-out',
            }}
            onTouchStart={handleSwipeStart}
            onTouchEnd={handleSwipeEnd}
            onTouchMove={handleSwipeMove}
          >
            <img
              src={
                // history[0].image ||
                imageArray[account?.userAdditionalFields?.themePicture - 1]
              }
              // alt={history[0].title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
               
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  textShadow:
                    '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                  textAlign: 'center',
                  width: '100%',
                }}
              >
                {history[0]?.text}
              </Typography>
              </Box>
              <Box
           sx={{
            position: 'absolute',
            bottom: '0%',
            right: '0%',
            transform: 'translate(-20%, -50%)',
          }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: 'white',
                    textShadow:
                      '0 0 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.9), 0 16px 24px rgba(0,0,0,0.4), 0 32px 48px rgba(0,0,0,0.7)',
                    textAlign: 'center',
                    width: '100%',
                  }}
                >
                  {history[0]?.author.name}
                </Typography>
              </Box>
          </Box>)
      }
      </Box>
    </UserContainer>
  );
};

export default History;