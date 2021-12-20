import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/schema/index.js";
import databases from "./database.js";
import depthLimit from "graphql-depth-limit";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: databases,
  validationRules: [depthLimit(5)],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
