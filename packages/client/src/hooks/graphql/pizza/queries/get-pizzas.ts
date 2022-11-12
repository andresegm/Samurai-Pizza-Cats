import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Query {
    pizzas {
      name
      description
      priceCents
      toppingIds
      toppings {
        name
        id
        priceCents
      }
      id
      imgSrc
    }
  }
`;

export { GET_PIZZAS };
