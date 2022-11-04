import { pizzaProvider } from '../providers/index';
import { Root } from '../schema/types/types';
import { CreatePizzaInput, UpdatePizzaInput, DeletePizzaInput, Pizza as SchemaPizza } from '../schema/types/schema';
import { ObjectId } from 'mongodb';
export type Pizza = Omit<SchemaPizza, 'toppings' | 'priceCents'> & { toppingIds: ObjectId[] };

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

    updatePizza: async (_: Root, args: { input: UpdatePizzaInput }): Promise<Pizza> => {
      return pizzaProvider.updatePizza(args.input);
    },

    deletePizza: async (_: Root, args: { input: DeletePizzaInput }): Promise<string> => {
      return pizzaProvider.deletePizza(args.input.id);
    },
  },
};
export { pizzaResolver };
