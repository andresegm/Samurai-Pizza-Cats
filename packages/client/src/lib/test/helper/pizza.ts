import { ObjectId } from 'bson';

import { Pizza } from '../../../types/schema';
import { createTestTopping } from './topping';

export const createTestPizza = (data: Partial<Pizza> = {}): Pizza & { __typename: string } => ({
  __typename: 'Pizza',
  description: 'Pizza description',
  id: new ObjectId().toHexString(),
  imgSrc:
    'https://images.unsplash.com/photo-1548369937-47519962c11a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  name: 'A Pizza',
  priceCents: 450,
  toppingIds: ['564f0184537878b57efcb703', 'a10d50e732a0b1d4f2c5e506'],
  toppings: [createTestTopping()],
  ...data,
});
