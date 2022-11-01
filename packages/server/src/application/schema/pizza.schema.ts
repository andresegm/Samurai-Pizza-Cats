import { gql } from 'apollo-server';

const typeDefs = gql`
  type Pizza {
    id: ObjectID!
    name: String!
    description: String!
    toppings: [Topping!]!
    toppingIds: [ObjectID!]!
    imgSrc: String!
    priceCents: Int!
  }

  type Query {
    pizzas: [Pizza!]!
  }

  type Mutation {
    createPizza(input: CreatePizzaInput!): Pizza!
    updatePizza(input: UpdatePizzaInput!): Pizza!
  }

  input CreatePizzaInput {
    name: String!
    description: String!
    imgSrc: String!
    toppingIds: [ObjectID!]!
  }

  input UpdatePizzaInput {
    id: ObjectID!
    name: String!
    description: String!
    toppingIds: [ObjectID!]!
    imgSrc: String!
  }
`;

export { typeDefs };
