import { Dialog, Slide } from '@mui/material';
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SlideUp = ({ children, open, onClose }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose} >
      {children}
    </Dialog>
  );
};

export default SlideUp;
