import React from 'react';
import { Field, Formik, FormikProps } from 'formik';
import { Backdrop, createStyles, Fade, IconButton, makeStyles, Modal, Paper, Theme } from '@material-ui/core';

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

const PizzaModal = ({ selectedPizza, open, setOpen }: PizzaModalProps): JSX.Element => {
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
          <br />
          <h3>Details</h3>
          <Formik
            initialValues={{
              name: selectedPizza?.name,
              description: selectedPizza?.description,
              imgSrc: selectedPizza?.imgSrc,
              toppingIds: selectedPizza?.toppingIds,
            }}
            enableReinitialize
            onSubmit={(values): void => {
              if (selectedPizza?.id) {
                const inputPizza = { id: selectedPizza.id, ...values };
                onUpdatePizza(inputPizza);
                setOpen(false);
              } else {
                onCreatePizza(values);
                setOpen(false);
              }
            }}
          >
            {(props: FormikProps<any>): JSX.Element => (
              <form onSubmit={props.handleSubmit} className={classes.root} noValidate autoComplete="off">
                <p>
                  <label>Name</label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Name"
                    onChange={props.handleChange}
                    value={props.values.name}
                  />
                </p>
                <p>
                  <label>Description</label>
                  <Field
                    id="description"
                    name="description"
                    placeholder="Description"
                    onChange={props.handleChange}
                    value={props.values.description}
                  />
                </p>
                <p>
                  <label>Image URL</label>
                  <Field
                    id="imgSrc"
                    name="imgSrc"
                    placeholder="Image URL"
                    onChange={props.handleChange}
                    value={props.values.imgSrc}
                  />
                </p>
                <p>
                  <label>Topping Ids</label>
                  <Field
                    id="toppingIds"
                    name="toppingIds"
                    placeholder="Topping Ids"
                    onChange={props.handleChange}
                    value={props.values.toppingIds}
                  />
                </p>
                <IconButton type="submit">Submit</IconButton>
                <IconButton
                  onClick={(): void => {
                    onDeletePizza(selectedPizza);
                    setOpen(false);
                  }}
                  type="button"
                >
                  Delete
                </IconButton>
              </form>
            )}
          </Formik>
        </Paper>
      </Fade>
    </Modal>
  );
};

export default PizzaModal;
