import { Fade, Grow } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import React, { useState, useLayoutEffect } from 'react';

const AdminItems = ({ page, index, pages, showOnTheTop, setShowOnTheTop }) => {
  const navigate = useNavigate();

  const [fade, setFade] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setFade(true);
    }, 300 * (index + 1));
  }, []);

  useLayoutEffect(() => {
    if (showOnTheTop !== index) {
      setFade(false);
    }
  }, [showOnTheTop]);

  const handlePointerDown = () => {
    setShowOnTheTop(index);
      setTimeout(() => {
        navigate(`/adminpanel/${page}`);
      }, 1200);
  };

  return (
    <Grow in={fade}>
      <Box
        key={index}
        sx={{
          position: 'absolute',
          width: showOnTheTop === index ? '90%' : '105px',
          height: showOnTheTop === index ? '75px' : '105px',
          borderRadius: showOnTheTop === index ? '1rem' : '48% 52% 48% 52% / 48% 48% 52% 52% ',
          backgroundImage: 'linear-gradient(115deg, rgba(245, 247, 250, 0.9) 0%, rgba(195, 207, 226,  0.9) 74%)',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 1s ease-in-out !important',
          cursor: 'pointer',
          whiteSpace: 'pre-line',
          padding: 0, // set padding to 0
          translate: '-50% -50%',
          textTransform: 'capitalize',
          textAlign: 'center',
          fontSize: showOnTheTop === index ? '1.5rem' : '1rem',
          // showOnTheTop === index ? ...setOnTop() :
          // ...getPosition(index, pages.length),
          ...(showOnTheTop === index ? setOnTop() : getPosition(index, pages.length)),
        }}
        // onPointerDown={() => navigate(`/adminpanel/${page}`)}
        onPointerDown={handlePointerDown}
      >
        {page.replace('_', '\n')}
      </Box>
    </Grow>
  );
};
const getPosition = (index, total) => {
  const centerX = 50;
  const centerY = 50;
  const radius = 34;
  const angle = (index / total) * 2 * Math.PI;
  const x = centerX + radius * Math.sin(angle);
  const y = centerY + radius * Math.cos(angle);

  return {
    left: `${x}%`,
    top: `${y}%`,
  };
};

const setOnTop = () => {
  const x = 50;
  const y = 2;
  return {
    left: `${x}%`,
    top: `${y}%`,
    translate: `-${x}% 0%`,
  };
};

export default AdminItems;
