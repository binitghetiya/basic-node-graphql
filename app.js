import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import databases from "./database.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: databases,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
