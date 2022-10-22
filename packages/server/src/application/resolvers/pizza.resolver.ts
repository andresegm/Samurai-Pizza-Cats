import { pizzaProvider } from '../providers/index';
import { Pizza as SchemaPizza } from '../schema/types/schema';
export type Pizza = Omit<SchemaPizza, 'toppings'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },
};
export { pizzaResolver };
