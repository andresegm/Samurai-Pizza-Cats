import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas {
    pizzas {
      name
      description
      toppings {
        name
        priceCents
        id
      }
      id
      imgSrc
    }
  }
`;

export { GET_PIZZAS };
