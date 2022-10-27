import { Pizza, Topping } from '../../types';
import CardItem from '../common/CardItem';

export interface PizzaItemProps {
  pizza: Pizza;
}

export interface ToppingItemProps {
  topping: Topping;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza }) => {
  return (
    <CardItem>
      <h2>{pizza.name}</h2>
      <img src={pizza?.imgSrc} style={{ maxWidth: 300 }}></img>
      <p>{pizza.description}</p>
    </CardItem>
  );
};

export default PizzaItem;
