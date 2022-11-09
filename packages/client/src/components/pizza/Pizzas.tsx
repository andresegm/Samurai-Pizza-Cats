import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';

import CardItemSkeleton from '../common//CardItemSkeleton';
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
    console.log(pizza?.name); //not selecting the pizza correctly
  }

  const { loading, error, data } = useQuery(GET_PIZZAS);

  if (error) {
    console.error(error);
    return <div>Error!</div>;
  }

  if (loading) {
    return <CardItemSkeleton data-testid="pizza-list-loading" />;
  }

  const PizzaList = data?.pizzas.map((pizza: Pizza) => (
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} handleOpen={selectPizza} />
  ));

  return (
    <Container maxWidth="md">
      <PageHeader pageHeader={'Pizzas'} />
      <Grid>
        <PizzaItem key="add-pizza" handleOpen={selectPizza} />
        {PizzaList}
      </Grid>
      <PizzaModal selectedPizza={selectedPizza} setSelectedPizza={setSelectedPizza} open={open} setOpen={setOpen} />
    </Container>
  );
};

export default Pizzas;
