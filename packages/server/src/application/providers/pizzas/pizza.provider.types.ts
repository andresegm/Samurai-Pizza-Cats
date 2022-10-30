import { ObjectId } from 'mongodb';

export interface Pizza {
  id: string;
  name: string;
  description: string;
  toppingIds: string[];
  imgSrc: string;
  toppings: object[];
  priceCents: number;
}

export interface CreatePizzaInput {
  name: string;
  description: string;
  imgSrc: string;
  toppingIds: ObjectId[];
}
