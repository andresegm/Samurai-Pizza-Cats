import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza?: Pizza;
  handleOpen: (pizza?: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, handleOpen }) => {
  const pizzaToppings = (pizza: Pizza): string => {
    const toppingsList = pizza.toppings.map((topping) => topping.name);
    return toppingsList.join(', ');
  };
  return (
    <CardItem onClick={(): void => handleOpen(pizza)}>
      <h2>{pizza?.name}</h2>
      <img src={pizza?.imgSrc} style={{ maxWidth: 300, maxHeight: 300 }}></img>
      <p>{pizza?.description}</p>
      <p> {pizza?.toppings ? pizzaToppings(pizza) : ''}</p>
      <p>{pizza ? toDollars(pizza.priceCents) : ''} </p>
    </CardItem>
  );
};

export default PizzaItem;
