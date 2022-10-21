import { pizzaProvider } from '../providers/index';

const pizzaResolver = {
  Query: {
    pizzas: async () => {
      return pizzaProvider.getPizzas();
    },
  },
};
export { pizzaResolver };
