import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas {
    pizzas {
      name
      description
      id
      imgSrc
      toppingIds
    }
  }
`;

export { GET_PIZZAS };
