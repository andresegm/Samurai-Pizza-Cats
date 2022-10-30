import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    toppingIds: [String!]!
    imgSrc: String!
    priceCents: Int!
  }

  type Query {
    pizzas: [Pizza!]!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }
`;

export { typeDefs };
