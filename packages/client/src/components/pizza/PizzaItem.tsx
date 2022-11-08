import { Pizza } from '../../types';
import CardItem from '../common/CardItem';
import toDollars from '../../lib/format-dollars';

export interface PizzaItemProps {
  pizza: Pizza;
  onClick?: () => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, onClick }) => {
  const pizzaToppings = (pizza: Pizza): string => {
    const toppingsList = pizza.toppings.map((topping) => topping.name);
    return toppingsList.join(', ');
  };
  return (
    <CardItem onClick={onClick}>
      <h2>{pizza.name}</h2>
      <img src={pizza?.imgSrc} style={{ maxWidth: 300, maxHeight: 300 }}></img>
      <p>{pizza.description}</p>
      <p>toppings: {pizzaToppings(pizza)}</p>
      <p>pizza id: {pizza.id}</p>
      <p>price: {toDollars(pizza.priceCents)} </p>
    </CardItem>
  );
};

export default PizzaItem;
