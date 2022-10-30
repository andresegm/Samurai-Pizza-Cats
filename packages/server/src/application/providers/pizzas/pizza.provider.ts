import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { CreatePizzaInput, Pizza } from './pizza.provider.types';
import validateStringInputs from '../../../lib/string-validator';

class PizzaProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getPizzas(): Promise<Pizza[]> {
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.map(toPizzaObject);
  }

  public async createPizza(input: CreatePizzaInput): Promise<Pizza> {
    if (input.name) validateStringInputs(input.name);
    if (input.description) validateStringInputs(input.description);
    if (input.imgSrc) validateStringInputs(input.imgSrc);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId() },
      { $set: { ...input, updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() } },
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
