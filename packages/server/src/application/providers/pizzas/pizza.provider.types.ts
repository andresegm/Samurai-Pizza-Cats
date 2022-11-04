import { ObjectId } from 'mongodb';
import { Topping } from 'src/application/schema/types/schema';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: ObjectId[];
  imgSrc: string;
  toppings: Topping[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: ObjectId[];
}

export interface UpdatePizzaInput {
  id: string;
  name?: string | null;
  description?: string | null;
  toppingIds?: ObjectId[] | null;
  imgSrc?: string | null;
}
