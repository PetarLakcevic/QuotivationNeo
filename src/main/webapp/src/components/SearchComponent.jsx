import { Settings } from '@mui/icons-material';
import { Button, Fab, Fade, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const SearchComponent = ({ chidlren, searchTerm, onChange }) => {
  return (
    <Fade in={true} timeout={500}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <FormControl
          sx={{
            width: 'min(60%, 30rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <InputLabel htmlFor="search">Search</InputLabel>
          <OutlinedInput
            id="search"
            value={searchTerm}
            onChange={onChange}
            label="Search"
            sx={{
              width: '100%',
              backgroundColor: 'rgba(250, 250, 255, 0.7)',
              borderRadius: '1rem',
              // boxShadow: '0px 2px 10px 1px rgba(0, 0, 0, 0.1)',
              // border: '1px solid rgba(0, 0, 0, 0.0)',
            }}
          />
        </FormControl>
              {/* <Fab variant="contained"
                  sx={{
                      backgroundImage: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
                      borderRadius: '50%',
                  }}
                  rounded="true">
                  <Settings
                  color="primary"
                  />
        </Fab> */}
      </Box>
    </Fade>
  );
};

export default SearchComponent;
