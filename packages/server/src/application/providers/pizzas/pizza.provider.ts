import { Collection, ObjectId } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { CreatePizzaInput, UpdatePizzaInput, Pizza } from './pizza.provider.types';
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

  public async updatePizza(input: UpdatePizzaInput): Promise<Pizza> {
    const { id, name, description, toppingIds, imgSrc } = input;
    if (name) validateStringInputs(name);
    if (description) validateStringInputs(description);
    if (imgSrc) validateStringInputs(imgSrc);
    if (toppingIds) toppingProvider.validateToppings(toppingIds);

    const data = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(name && { name: name }),
          ...(description && { description: description }),
          ...(imgSrc && { imgSrc: imgSrc }),
          ...(toppingIds && { toppingIds: toppingIds.map((id) => new ObjectId(id)) }),
        },
      },
      { returnDocument: 'after' }
    );

    if (!data.value) {
      throw new Error(`Could not update the pizza`);
    }
    const pizza = data.value;

    return toPizzaObject(pizza);
  }

  public async deletePizza(id: string): Promise<string> {
    const pizzaId = new ObjectId(id);

    const pizzaData = await this.collection.findOneAndDelete({
      _id: pizzaId,
    });

    const pizza = pizzaData.value;

    if (!pizza) {
      throw new Error(`Could not delete the pizza`);
    }

    return id;
  }
}

export { PizzaProvider };
