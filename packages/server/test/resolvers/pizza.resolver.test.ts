import { gql } from 'apollo-server-core';

import { pizzaResolver } from '../../src/application/resolvers/pizza.resolver';
import { pizzaProvider } from '../../src/application/providers';
import { typeDefs } from '../../src/application/schema/index';
import {
  MutationCreatePizzaArgs,
  MutationDeletePizzaArgs,
  MutationUpdatePizzaArgs,
} from '../../src/application/schema/types/schema';

import { createMockPizza } from '../helpers/pizza.helper';
import { TestClient } from '../helpers/client.helper';
import { ObjectId } from 'mongodb';

let client: TestClient;

jest.mock('../../src/application/database', () => ({
  setupDb: (): any => ({ collection: (): any => jest.fn() }),
}));

const mockPizza = createMockPizza();

beforeAll(async (): Promise<void> => {
  client = new TestClient(typeDefs, pizzaResolver);
});

beforeEach(async (): Promise<void> => {
  jest.restoreAllMocks();
});

describe('pizzaResolver', (): void => {
  describe('Query', () => {
    describe('pizzas', () => {
      const query = gql`
        query getPizzas {
          pizzas {
            id
            name
            description
            imgSrc
            toppingIds
          }
        }
      `;
      test('should get all pizzas', async () => {
        jest.spyOn(pizzaProvider, 'getPizzas').mockResolvedValue([mockPizza]);

        const result = await client.query({ query });

        expect(result.data).toEqual({
          pizzas: [
            {
              __typename: 'Pizza',
              id: mockPizza.id,
              name: mockPizza.name,
              description: mockPizza.description,
              imgSrc: mockPizza.imgSrc,
              toppingIds: mockPizza.toppingIds,
            },
          ],
        });

        expect(pizzaProvider.getPizzas).toHaveBeenCalledTimes(1);
      });
    });
  });
  describe('Mutation', () => {
    describe('createPizza', () => {
      const mutation = gql`
        mutation ($input: CreatePizzaInput!) {
          createPizza(input: $input) {
            name
            description
            imgSrc
            toppingIds
          }
        }
      `;

      const validPizza = createMockPizza({
        name: 'test pizza',
        description: 'testing',
        imgSrc: 'imageAddress',
        toppingIds: [new ObjectId()],
      });

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'createPizza').mockResolvedValue(validPizza);
      });

      test('should call create pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        await client.mutate({ mutation, variables });

        expect(pizzaProvider.createPizza).toHaveBeenCalledWith(variables.input);
      });
      test('should return created pizza when passed a valid input', async () => {
        const variables: MutationCreatePizzaArgs = {
          input: {
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        };

        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          createPizza: {
            __typename: 'Pizza',
            name: validPizza.name,
            description: validPizza.description,
            imgSrc: validPizza.imgSrc,
            toppingIds: validPizza.toppingIds,
          },
        });
      });
    });

    describe('deletePizza', () => {
      const mutation = gql`
        mutation ($input: DeletePizzaInput!) {
          deletePizza(input: $input)
        }
      `;

      const variables: MutationDeletePizzaArgs = { input: { id: mockPizza.id } };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'deletePizza').mockResolvedValue(mockPizza.id);
      });

      test('should call deletePizza with id', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.deletePizza).toHaveBeenCalledWith(variables.input.id);
      });

      test('should return deleted pizza id', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          deletePizza: mockPizza.id,
        });
      });
    });

    describe('updatePizza', () => {
      const mutation = gql`
        mutation ($input: UpdatePizzaInput!) {
          updatePizza(input: $input) {
            id
            name
            description
            toppingIds
            imgSrc
            priceCents
            toppings {
              __typename
              id
              name
              priceCents
            }
          }
        }
      `;
      const updatedPizza = createMockPizza({
        name: 'updated pizza',
        description: 'testing',
        imgSrc: 'imageAddress',
        toppingIds: [new ObjectId()],
      });

      const variables: MutationUpdatePizzaArgs = {
        input: {
          id: mockPizza.id,
          name: updatedPizza.name,
          description: updatedPizza.description,
          toppingIds: updatedPizza.toppingIds,
          imgSrc: updatedPizza.imgSrc,
        },
      };

      beforeEach(() => {
        jest.spyOn(pizzaProvider, 'updatePizza').mockResolvedValue(updatedPizza);
      });

      test('should call updatePizza with input', async () => {
        await client.mutate({ mutation, variables });

        expect(pizzaProvider.updatePizza).toHaveBeenCalledWith(variables.input);
      });

      test('should return updated pizza', async () => {
        const result = await client.mutate({ mutation, variables });

        expect(result.data).toEqual({
          updatePizza: {
            ...updatedPizza,
          },
        });
      });
    });
  });
});
