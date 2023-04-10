import { Dialog, Slide } from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const SlideLeft = ({ children, open, onClose }) => {
  return (
    <Dialog
        m={0}
        open={open}
        // onClose={() => setOpenMenu(false)}
          onClose={onClose}
        TransitionComponent={Transition}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100vw',
          height: '100vh',
          margin: '0 !important',

          backdropFilter: 'blur(3px)',
          '& .MuiDialog-paper': {
            margin: '0 !important',
            // width: '50vw',
            height: '100vh !important',
            maxHeight: '100vh !important',
          },
        }}
      >
      {children}
    </Dialog>
  );
};

export default SlideLeft;
