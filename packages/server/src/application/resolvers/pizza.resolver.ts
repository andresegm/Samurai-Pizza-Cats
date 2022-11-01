import { pizzaProvider } from '../providers/index';
import { Root } from '../schema/types/types';
import { CreatePizzaInput, Pizza as SchemaPizza } from '../schema/types/schema';
export type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & { toppingIds: string[] };

const pizzaResolver = {
  Query: {
    pizzas: async (): Promise<Pizza[]> => {
      return pizzaProvider.getPizzas();
    },
  },

  Mutation: {
    createPizza: async (_: Root, args: { input: CreatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.createPizza(args.input);
    },
  },
};
export { pizzaResolver };
