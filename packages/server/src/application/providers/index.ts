import { setupDb } from '../database';

import { ToppingProvider } from './toppings/topping.provider';
import { PizzaProvider } from './pizzas/pizza.provider';
import { CursorProvider } from './cursor/cursor.provider';

const db = setupDb();

const cursorProvider = new CursorProvider(db.collection('pizzas'));
const toppingProvider = new ToppingProvider(db.collection('toppings'));
const pizzaProvider = new PizzaProvider(db.collection('pizzas'), toppingProvider, cursorProvider);

export { toppingProvider, pizzaProvider, cursorProvider };
