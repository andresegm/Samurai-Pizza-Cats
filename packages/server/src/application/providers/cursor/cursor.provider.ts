import { Collection } from 'mongodb';
import { PizzaDocument, toPizzaObject } from '../../../entities/pizza';
import { Result } from './cursor.provider.types';

class CursorProvider {
  constructor(private collection: Collection<PizzaDocument>) {}

  public async getCursorIndex(cursor: string | null): Promise<number> {
    if (cursor === null) return -1;
    const pizzas = await this.collection.find().sort({ name: 1 }).toArray();
    return pizzas.findIndex((element) => cursor === element._id.toHexString());
  }

  public async getCursorResult(cursor: string | null, limit: number): Promise<Result> {
    const pizzas = (await this.collection.find().sort({ name: 1 }).toArray()).map(toPizzaObject);
    const pizzaIndex = (await this.getCursorIndex(cursor)) + 1;
    let totalCount = pizzas.length;
    let hasNextPage = pizzaIndex + limit < totalCount ? true : false;

    if (limit < 1) {
      return {
        results: [],
        cursor: cursor,
        hasNextPage: hasNextPage,
        totalCount: totalCount,
      };
    }

    let results = hasNextPage ? pizzas.slice(pizzaIndex, pizzaIndex + limit) : pizzas.slice(pizzaIndex, totalCount + 1);
    cursor = hasNextPage ? pizzas[pizzaIndex + limit - 1].id : null;

    return {
      results,
      cursor,
      hasNextPage,
      totalCount,
    };
  }
}

export { CursorProvider };
