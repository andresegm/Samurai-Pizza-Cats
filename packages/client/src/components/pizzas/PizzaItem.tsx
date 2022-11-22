import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import toDollars from '../../lib/format-dollars';
import { AddCircle } from '@material-ui/icons';
import { CardMedia, Grid } from '@material-ui/core';

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen }) => {
  const pizzaToppings = (pizza: Pizza): string => {
    const toppingsList = pizza.toppings.map((topping) => topping.name);
    return toppingsList.join(', ');
  };
  if (pizza) {
    return (
      <Grid item xs={12} md={6} lg={4}>
        <CardItem data-testid={`pizza-cardItem-${pizza?.id}`} onClick={(): void => handleOpen(pizza)}>
          <h2 data-testid={`pizza-name-${pizza?.id}`}>{pizza?.name}</h2>
          <CardMedia component="img" alt="pizza" height="250" image={pizza?.imgSrc} />
          <p data-testid={`pizza-description-${pizza?.id}`}>{pizza?.description}</p>
          <br />
          <p data-testid={`pizza-toppings-${pizza?.id}`}> {pizza?.toppings ? pizzaToppings(pizza) : ''}</p>
          <br />
          <br />
          <p data-testid={`pizza-price-${pizza?.id}`}>{pizza ? toDollars(pizza.priceCents) : ''} </p>
        </CardItem>
      </Grid>
    );
  } else {
    return (
      <CardItem onClick={(): void => handleOpen(pizza)}>
        <h2>Create Pizza</h2>
        <img
          width="350"
          src="https://images.squarespace-cdn.com/content/v1/5a6a74ffe45a7cb3647a68e7/1614991332750-BRVXQ4FOY5AZNZZO6CLS/Catana+Wave.JPG?format=750w"
        ></img>
        <AddCircle />
      </CardItem>
    );
  }
};

export default PizzaItem;
