import { gql } from "apollo-server";

const typeDefs = gql`
  type Author {
    id: Int
    name: String
    email: String
    books: [Book!]
  }

  type Book {
    id: Int
    authorId: Int
    name: String
    type: String
    author: Author!
  }

  type Query {
    "Get all authors from mysql DB table"
    getAuthors: [Author]

    "Get author from mysql DB table"
    author(id: Int): Author
  }

  type Mutation {
    "Create author"
    createAuthor(name: String!, email: String!): Boolean
  }
`;

export default typeDefs;
