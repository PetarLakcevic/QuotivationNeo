import { Delete, Edit } from '@mui/icons-material';
import { Avatar, Box, Dialog, Fade, Grow, IconButton, Slide, Typography } from '@mui/material';
import React, { useState, useLayoutEffect } from 'react';
import DeleteQuote from './DeleteQuote';
import EditQuote from './EditQuote';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const QutesItem = ({ quote, index, setQuotes }) => {
  const [fade, setFade] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useLayoutEffect(() => {
    setTimeout(() => {
      setFade(true);
    }, 300 * (index + 1));
  }, []);
  return (
    <Grow in={fade}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0.5rem',
          borderBottom: '1px solid #000',
        }}
      >
        <Avatar
          sx={{
            backgroundColor: 'rgb(0, 0, 0, 0)',
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.4)',
            color: '#000',
            marginRight: '0.5rem',
          }}
        >
          {index + 1}.
        </Avatar>
        <Box>
          <Typography
            sx={{
              fontStyle: 'italic',
              fontSize: '1.2rem',
            }}
          >
            {quote.text}
          </Typography>
          <Typography>{quote.author ? `-${quote.author.name}` : 'No author'}</Typography>
          <Box
            sx={{
              fontSize: '0.8rem',
            }}
          >
            Categories:
            <Typography
              sx={{
                display: 'inline',
              }}
            >
              {quote.category ? ` ${quote.category}` : ' No category'}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            marginLeft: 'auto',
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <IconButton onPointerDown={() => setEditDialog(true)}>
            <Edit />
          </IconButton>
          <Dialog
            fullScreen
            open={editDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setEditDialog(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <EditQuote quote={quote} setEditDialog={setEditDialog} setQuotes={setQuotes} />
          </Dialog>

          <IconButton onPointerDown={() => setDeleteDialog(true)}>
            <Delete />
          </IconButton>
          <Dialog
            fullScreen
            open={deleteDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setDeleteDialog(false)}
            aria-describedby="alert-dialog-slide-description"
          >
            <DeleteQuote quote={quote} setDeleteDialog={setDeleteDialog} setQuotes={setQuotes} />
          </Dialog>
        </Box>
      </Box>
    </Grow>
  );
};

export default QutesItem;
