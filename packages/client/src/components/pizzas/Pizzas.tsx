import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';

import CardItemSkeleton from '../common/CardItemSkeleton';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import PizzaItem from './PizzaItem';
import PizzaModal from './PizzaModal';

const Pizzas: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();

  function selectPizza(pizza?: Pizza): void {
    setSelectedPizza(pizza);
    setOpen(true);
  }

  const { loading, error, data } = useQuery(GET_PIZZAS); //I think it is expecting me to add variables here
  //e.g. useQuery(GET_PIZZAS, {variables: { cursor: "", limit: 5}});

  if (error) {
    console.log(JSON.stringify(error, null, 2));
    return <div>Error!</div>;
  }

  if (loading) {
    return <CardItemSkeleton data-testid="pizza-list-loading">Loading ...</CardItemSkeleton>;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} handleOpen={selectPizza} />
  ));

  return (
    <Container>
      <PageHeader pageHeader={'Pizzas'} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <PizzaItem key="add-pizza" handleOpen={selectPizza} />
        </Grid>
        {PizzaList}
      </Grid>
      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
