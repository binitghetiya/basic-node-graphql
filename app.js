import { ApolloServer, gql } from "apollo-server";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
