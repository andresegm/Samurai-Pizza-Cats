import { gql } from '@apollo/client';

const GET_PIZZAS = gql`
  query Pizzas($input: QueryInput!) {
    pizzas(input: $input) {
      cursor
      hasNextPage
      totalCount
      results {
        description
        id
        imgSrc
        name
        priceCents
        toppingIds
        toppings {
          id
          name
          priceCents
        }
      }
    }
  }
`;

export { GET_PIZZAS };
