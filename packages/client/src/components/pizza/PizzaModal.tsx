import React from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import { AddCircle, Delete } from '@material-ui/icons';
import {
  Backdrop,
  createStyles,
  Fade,
  IconButton,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core';

import usePizzaMutations from '../../hooks/pizza/use-pizza-mutations';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  })
);

interface PizzaModalProps {
  selectedPizza?: any;
  setSelectedPizza: React.Dispatch<React.SetStateAction<any>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PizzaModal = ({ selectedPizza, setSelectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
  const classes = useStyles();

  const { onCreatePizza, onDeletePizza, onUpdatePizza } = usePizzaMutations();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={(): void => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Paper className={classes.paper}>
          <h2>{selectedPizza ? 'Edit' : 'Add'} Pizza</h2>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="name-input"
              label="Pizza Name"
              defaultValue={selectedPizza?.name}
              onChange={(event): void => setSelectedPizza({ ...selectedPizza, name: event.target.value })}
            />
            <TextField
              id="description-input"
              label="Pizza's Description "
              type="string"
              defaultValue={selectedPizza?.description}
              onChange={(event): void => setSelectedPizza({ ...selectedPizza, description: event.target.value })}
            />
            <TextField
              id="imgSrc-input"
              label="Pizza's Image Source "
              type="string"
              defaultValue={selectedPizza?.imgSrc}
              onChange={(event): void => setSelectedPizza({ ...selectedPizza, imgSrc: event.target.value })}
            />
            <IconButton
              edge="end"
              aria-label="update"
              type="button"
              onClick={(): void => {
                selectedPizza?.id ? onUpdatePizza(selectedPizza) : onCreatePizza(selectedPizza);
                setOpen(false);
              }}
            >
              <AddCircle />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="delete"
              type="button"
              onClick={(): void => {
                onDeletePizza(selectedPizza);
                setOpen(false);
              }}
            >
              <Delete />
            </IconButton>
          </form>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
