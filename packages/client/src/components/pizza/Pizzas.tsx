import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Grid } from '@material-ui/core';

import CardItemSkeleton from '../common//CardItemSkeleton';
import { Pizza } from '../../types';
import { GET_PIZZAS } from '../../hooks/graphql/pizza/queries/get-pizzas';
import PageHeader from '../common/PageHeader';
import PizzaItem from './PizzaItem';

const Pizzas: React.FC = () => {
  const [selectedPizza, setSelectedPizza] = React.useState<Partial<Pizza>>();
  function selectPizza(pizza?: Pizza): void {
    setSelectedPizza(pizza);
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
    <PizzaItem data-testid={`pizza-item-${pizza?.id}`} key={pizza.id} pizza={pizza} onClick={selectPizza} />
  ));

  return (
    <Grid>
      <Container maxWidth="md">
        <PageHeader pageHeader={'Pizzas'} />
        {PizzaList}
      </Container>
    </Grid>
  );
};

export default Pizzas;
