import { Pizza } from '../schema/types/schema';
import { Root } from '../schema/types/types';
import { pizzaProvider } from '../providers/index';

const pizzaResolver = {
  Query: {
    pizzas: async () => {
      return pizzaProvider.getPizzas();
    },
  },
};
export { pizzaResolver };
