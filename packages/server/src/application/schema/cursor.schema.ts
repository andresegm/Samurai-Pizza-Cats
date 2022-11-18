import { gql } from 'apollo-server';

const typeDefs = gql`
  type Result {
    results: [Pizza!]!
    totalCount: Int!
    hasNextPage: Boolean!
    cursor: ObjectID
  }
`;

export { typeDefs };
