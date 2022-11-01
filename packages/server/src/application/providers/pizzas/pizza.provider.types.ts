import { ObjectId } from 'mongodb';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
  toppings: ObjectId[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: ObjectId[];
}
