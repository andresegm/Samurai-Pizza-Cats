import { pizzaProvider } from '../providers/index';
import { Pizza } from '../schema/types/schema';

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};
export { pizzaResolver };
