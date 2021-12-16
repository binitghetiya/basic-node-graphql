import { gql } from "apollo-server";

const typeDefs = gql`
  type Author {
    id: Int
    name: String
    email: String
  }

  type Query {
    "Get all authors from mysql DB table"
    getAuthors: [Author]
  }

  type Mutation {
    "Create author"
    createAuthor(name: String!, email: String!): Boolean
  }
`;

export default typeDefs;
