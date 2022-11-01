import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { CreatePizzaInput, Pizza } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';
import { toppingProvider } from '..';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    const { name, description, imgSrc, toppingIds } = input;
    validateStringInputs([name, description, imgSrc]);
    toppingProvider.validateToppings(toppingIds);

    const toppings = toppingIds.map((id) => new ObjectId(id));

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppings }),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
        },
      },
      { upsert: true, returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not create the ${input.name} pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }
}

export { PizzaProvider };
